# amplify/functions/chatbot/index.py

def _to_gemini_contents(messages: list[dict]) -> list[dict]:
    """Map [{'role':'user'|'assistant','content':str}] -> Gemini 'contents'."""
    role_map = {"user": "user", "assistant": "model"}
    contents = []
    for m in messages:
        r = role_map.get(m.get("role", "user"), "user")
        contents.append({"role": r, "parts": [{"text": m.get("content", "")}]})
    return contents

def _get_gcp_credentials():
    """Retrieve GCP service account JSON from AWS Secrets Manager"""
    import boto3
    import os
    from botocore.exceptions import ClientError
    
    secret_name = os.environ.get("GCP_SECRET_NAME", "gemini-service-account")
    region_name = os.environ.get("AWS_REGION", "us-west-2")
    
    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )
    
    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        return get_secret_value_response['SecretString']
    except ClientError as e:
        print(f"Error retrieving secret: {e}")
        raise
    
def _ask_gemini(messages: list[dict], system_prompt: str, *, enable_search: bool=False) -> str:
    print("ask_gemini")
    from google import genai
    from google.genai import types
    import os
    import stat
    print("Finished importing")

    sa_json = _get_gcp_credentials()

    # Write to /tmp and point ADC at it
    sa_path = "/tmp/gcp-sa.json"
    with open(sa_path, "w") as f:
        f.write(sa_json)
    os.chmod(sa_path, stat.S_IRUSR | stat.S_IWUSR)  # 0o600
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = sa_path
    os.environ.setdefault("GCP_PROJECT", "balancingiqproject")
    os.environ.setdefault("GCP_LOCATION", "us-central1")

    #api_key = os.environ.get("GEMINI_API_KEY") or "AIzaSyBZDOhs0XL2LF11Q2Q9iKxmQOPjxm9L7uo"
    #client = genai.Client(api_key=api_key)

    # Vertex AI client (uses service-account/ADC, NOT API key)
    client = genai.Client(
        vertexai=True,
        project="balancingiqproject",#os.environ["GCP_PROJECT"],
        location="us-central1",#os.environ.get("GCP_LOCATION", "us-central1"),
    )

    model_id = os.environ.get("GEMINI_MODEL_ID", "gemini-2.5-flash")

    # Build config kwargs; only include tools if we actually enable search
    cfg_kwargs = dict(
        system_instruction=system_prompt,
        max_output_tokens=2048,
        temperature=float(os.environ.get("GEMINI_TEMP", "0.2")),
    )

    if enable_search:
        cfg_kwargs["tools"] = [types.Tool(google_search=types.GoogleSearch())]

    cfg = types.GenerateContentConfig(**cfg_kwargs)

    resp = client.models.generate_content(
        model=model_id,
        contents=_to_gemini_contents(messages),
        config=cfg,
    )
    print("resp", resp)

    # Optional: extract grounding citations
    cites = []
    try:
        gm = resp.candidates[0].grounding_metadata
        for ch in getattr(gm, "grounding_chunks", []) or []:
            web = getattr(ch, "web", None)
            if web and getattr(web, "uri", None):
                cites.append({"title": getattr(web, "title", ""), "uri": web.uri})
    except Exception:
        pass
        
    print("resp.text", resp.text)
    print("cites", cites)

    return {"message": (resp.text or "").strip(), "citations": cites}
    #return (resp.text or "").strip()

def _get_gpt_api_key():
    """Retrieve OpenAI API key from AWS Secrets Manager"""
    import boto3
    import os
    from botocore.exceptions import ClientError
    
    secret_name = "OPENAI_API_KEY_SECRET"  # Or make it configurable via env var
    region_name = os.environ.get("AWS_REGION", "us-west-2")
    
    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )
    
    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        return get_secret_value_response['SecretString']
    except ClientError as e:
        print(f"Error retrieving OpenAI API key secret: {e}")
        raise

def _ask_chatgpt(messages: list[dict], system_prompt: str) -> dict:
    """Call OpenAI's ChatGPT API with the given messages and system prompt."""
    print("ask_chatgpt")
    import os
    from openai import OpenAI
    print("Finished importing")
    
    # Get API key from environment variable
    api_key = _get_gpt_api_key()#os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable not set")
    
    client = OpenAI(api_key=api_key)
    
    # Prepare messages in OpenAI format
    openai_messages = [{"role": "system", "content": system_prompt}]
    
    # Add conversation history
    for msg in messages:
        openai_messages.append({
            "role": msg.get("role", "user"),
            "content": msg.get("content", "")
        })
    
    # Call OpenAI API
    model = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
    temperature = float(os.environ.get("OPENAI_TEMP", "0.2"))
    
    response = client.chat.completions.create(
        model=model,
        messages=openai_messages,
        temperature=temperature,
        max_tokens=2048
    )
    
    # Extract response text
    message_text = response.choices[0].message.content or ""
    
    # Return in the same format as _ask_gemini
    return {
        "message": message_text.strip(),
        "citations": []  # ChatGPT doesn't provide citations by default
    }

def ask_chatbot(messages: list[dict], system_prompt: str) -> str:
    #return _ask_gemini(messages=messages, system_prompt=system_prompt, enable_search=False)
    return _ask_chatgpt(messages=messages, system_prompt=system_prompt)

def handler(event, context):
    print("Received event")
    
    # Extract messages from the arguments
    arguments = event.get('arguments', {})
    messages = arguments.get('messages', [])
    override_system_prompt = arguments.get('systemPrompt', None)
    system_prompt = (override_system_prompt or SYSTEM_PROMPT)
    
    if messages:
        print("Messages received")

        bot_response = ask_chatbot(messages=messages, system_prompt=system_prompt)

        try:
            bot_response_msg = bot_response.get("message", "") if isinstance(bot_response, dict) else str(bot_response)
            print("bot_response_mesg", bot_response_msg)
        except Exception as e:
            print("Error finding actions:", e)

        # Always return the unified shape
        if isinstance(bot_response, dict):
            bot_response["message"] = bot_response_msg
            return bot_response
        else:
            return {"message": bot_response_msg, "citations": []}
    
    return {
        "message": "No messages found in request"
    }

SYSTEM_PROMPT = """
You are a helpful assistant that can answer questions and help with tasks.
"""
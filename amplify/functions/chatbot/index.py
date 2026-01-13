# amplify/functions/chatbot/index.py

def _to_gemini_contents(messages: list[dict]) -> list[dict]:
    """Map [{'role':'user'|'assistant','content':str}] -> Gemini 'contents'."""
    role_map = {"user": "user", "assistant": "model"}
    contents = []
    for m in messages:
        r = role_map.get(m.get("role", "user"), "user")
        contents.append({"role": r, "parts": [{"text": m.get("content", "")}]})
    return contents
    
def _ask_gemini(messages: list[dict], system_prompt: str, *, enable_search: bool=False) -> str:
    print("ask_gemini")
    from google import genai
    from google.genai import types
    import os
    import stat

    # ⛔️ DEV-ONLY: pasted SA JSON below, delete after testing
    SA_JSON = r'''{
        "type": "service_account",
        "project_id": "balancingiqproject",
        "private_key_id": "68602f3706a9508e7f0c55b39ba1a62d54d2d9dc",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+Fl86WW+ZAh01\noszlfzYGGFJ72/XSzshE2vnqU/eCsj4QD8KBk3ZQvqrLlUO9siSIsthBv58iY3f5\nEsFX3u5KlSxJCfJZi5oWGMVB1kYBVlmVX4Iggz3XlOxIu64YMoIQf2W2YFM7F2PO\nnyloXBTH06Oqt0NjVEskmzTgDyL4Y8Cwzv69esJ64fDnp+ZQpG5mxKccZCimFFoj\nw6oGPqM4XALZerGQ6WDRhR7JJeKL/PP3VytOJagO2oaC6dY+6OIhMMgDOoKxl2Oy\n1Z0KNqerXuNfveofmf2AN/nOAPDfL7l74dNGlQZzMZXi6WaXRe7HH2CiOhbDaUKR\nWF8LXW+pAgMBAAECggEACt+TEpk4wdW19Qel1So53WRjx35VaU8hyT/baYo5uh9X\nCdUqSP417OLTOJ0GXcyvEVC6/8Z7JFzwk8NSYvk3bqBqLZgPkGFkxDHQ4CC71WoV\nQBmmrb8ZeQJQTSLLOnVygjNqDozOW1l4Ve090aCUIbrF/ccePYl+A4817uvUEhri\nqrmBt7PQdVGWXW5oV1JbO3bndtoLztFrEjOgbNjquRvp1TYEclYMJnNS+0aEjJfQ\n2znIsslFSsH0jhd8jQ45qfWX98kREZBWIln3bUz5ND45cdiGr658Q5jobNxtZORP\n+tvxRRiwD9Y1Ud+BPRCUfkO9pZKiG37jXcvOOAOblwKBgQDwGut1brK1lWQVt20W\nHZIZFJ+nMl/GXTF/CYvt7pAT5DcasBwQcTeGquIdtLKGx9fuQJR0vyziZv2KBTu3\nyFvOvtkVRZHR+hRIhrAneiDeS7nw4zwmL+KUnT+VgyGIWuBuupVSJDVo2H6+C3ee\nZ+8SVIFi0/FzyJySg3xs1Gt/vwKBgQDKq8whAaXoJgJbOhn7enbq7d2kxx8NA4Y7\nG2Y1Fs4O/b0/8tcxO5FnqpfvUXdGM9DiOV/ZShsDXQC2so4POHs0FNozjS79Ct0v\n6GLu+MzPLLfCU8OGQhr//Z/91LL7Ht2Fj+AFMGXuzu6J8TlHCU3PG6jGjQP443IF\nrLJNBvBqlwKBgQDi3kzE9QffE30yF9L3JpG5KQeBj9N3Nu9hvb993gA9C1IV4Xli\n/9cbY7OrpeVZ/NJGyLZ9aXYbpnzCQRegG6zDuQidVNLnuIgZz0n6wybzZFIZDlzz\nKCPLkJlXyEOS92tAtQQKTTQ6EPYQ0/z+q+31P+vRWbm3UULAHYUfv8ajOQKBgGn1\nDWCIMwu+q2a0ZpcSPI+wUjtumu471HacaYAB7zLpN4LyW8zyfp97EbndloUOW/uZ\n0WGRm7PTcKcTjK+qcMcWy8k9274Ravg7/1U+oB0EHQIstsE/WExTdczH4dbmGRxV\nzuIHnpMOfqmBgtd/pr1LkZ5UZSo/BwKuef1JTnH7AoGAdOak7WvLZnyhGFkLyLOq\nquHBsESTA4+kdhJ5F4uuwujYuKwpddhVOfBDIJSXreZvObQKEQOibV8YHQnSkXe7\n+OdNws5cr1RwHlbn29qnK4TGDNfERMRw7sAidnC3DA222sncD95WhbuS1ec21PNw\nxn1Xfxug0On3NUJ2TJTaEFI=\n-----END PRIVATE KEY-----\n",
        "client_email": "aiserviceaccount@balancingiqproject.iam.gserviceaccount.com",
        "client_id": "108344216484180157899",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/aiserviceaccount%40balancingiqproject.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    }'''
    # Write to /tmp and point ADC at it
    sa_path = "/tmp/gcp-sa.json"
    with open(sa_path, "w") as f:
        f.write(SA_JSON)
    os.chmod(sa_path, stat.S_IRUSR | stat.S_IWUSR)  # 0o600
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = sa_path
    os.environ.setdefault("GCP_PROJECT", "balancingiqproject")
    os.environ.setdefault("GCP_LOCATION", "europe-west2")

    #api_key = os.environ.get("GEMINI_API_KEY") or "AIzaSyBZDOhs0XL2LF11Q2Q9iKxmQOPjxm9L7uo"
    #client = genai.Client(api_key=api_key)

    # Vertex AI client (uses service-account/ADC, NOT API key)
    client = genai.Client(
        vertexai=True,
        project="balancingiqproject",#os.environ["GCP_PROJECT"],
        location="europe-west2",#os.environ.get("GCP_LOCATION", "us-central1"),
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

def ask_chatbot(messages: list[dict], system_prompt: str) -> str:
    return _ask_gemini(messages=messages, system_prompt=system_prompt, enable_search=True)

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
// src/app/blog/llm-action-handler-pattern/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The String-Based LLM Action Pattern: How to Make Any AI Model Execute Code Reliably - Adam Dugan",
  description:
    "Function calling APIs are provider-specific and break when you switch models. Here's a dead-simple pattern using string codes that works with any LLM, never blocks responses, and handles failures gracefully.",
};

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "The String-Based LLM Action Pattern: How to Make Any AI Model Execute Code Reliably",
    description: "Function calling APIs are provider-specific and break when you switch models. Here's a dead-simple pattern using string codes that works with any LLM, never blocks responses, and handles failures gracefully.",
    author: {
      "@type": "Person",
      name: "Adam Dugan",
      url: "https://adamdugan.com"
    },
    datePublished: "2026-01-25",
    dateModified: "2026-01-25",
    url: "https://adamdugan.com/blog/llm-action-handler-pattern",
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="mx-auto w-full max-w-3xl px-6 sm:px-8 py-16">
        <nav className="mb-8">
          <Link
            href="/"
            className="text-sm opacity-80 hover:opacity-100 underline underline-offset-4"
          >
            ← Back to home
          </Link>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          The String-Based LLM Action Pattern: How to Make Any AI Model Execute Code Reliably
        </h1>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Every LLM provider has their own function calling API. OpenAI has one format. Anthropic has 
          another. Google has a third. If you build on OpenAI&apos;s function calling and then want to 
          switch to Claude or Gemini, you&apos;re rewriting your entire integration.
        </p>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          I built a different pattern for <strong>BalancingIQ</strong> that&apos;s embarrassingly simple: 
          <strong> just have the LLM include special text codes in its response, detect those codes 
          with string matching, and dispatch actions asynchronously</strong>.
        </p>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          This works with <em>any</em> LLM (OpenAI, Claude, Gemini, Llama, anything), never blocks 
          the chat response, and gracefully handles failures. Here&apos;s how it works.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">The Problem: Function Calling Is Provider-Specific</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Most LLMs support &quot;function calling&quot; or &quot;tool use&quot; where the model can trigger predefined 
          functions. Great in theory. In practice:
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>Different APIs:</strong> OpenAI uses <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">functions</code>, 
          Anthropic uses <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">tools</code>, 
          Google uses <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">function_declarations</code></li>
          <li><strong>Different formats:</strong> Parameter schemas, response structures, all different</li>
          <li><strong>Different reliability:</strong> Some models are better at function calling than others</li>
          <li><strong>Vendor lock-in:</strong> If you build on one provider&apos;s API, switching is painful</li>
        </ul>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          I needed to switch between OpenAI, Claude (via Bedrock), and Gemini based on cost and 
          performance. Function calling APIs made this a nightmare. So I built something simpler.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">The Solution: String-Based Action Codes</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Instead of relying on provider-specific function calling, <strong>just tell the LLM to 
          include special text codes in its response</strong>.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Step 1: Define Actions in Your System Prompt</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Add instructions to your system prompt telling the LLM when to include action codes:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`SYSTEM_PROMPT = """
  You are a financial advisory AI assistant for small businesses.

  When the user asks you to send them something via email, include the text 
  "send_email_user_action_code" somewhere in your response.

  When the user asks for recent news about their industry, include the text 
  "get_news_action_code" in your response.

  Always respond naturally to the user. The action codes are internal signals 
  and don't need to be explained to the user.
  """`}</pre>
        </div>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          That&apos;s it. No JSON schemas, no function definitions, just plain English instructions.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Step 2: Detect Actions with Simple String Matching</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          After getting the LLM&apos;s response, scan for action codes:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`def find_run_actions(bot_response, messages, system_prompt, user_email):
      """Detect and dispatch actions based on string codes in LLM response."""
      
      if "send_email_user_action_code" in bot_response:
          dispatch_action(
              action="send_email_user_action_code",
              bot_response=bot_response,
              messages=messages,
              system_prompt=system_prompt,
              user_email=user_email,
          )
      
      if "get_news_action_code" in bot_response:
          dispatch_action(
              action="get_news_action_code",
              # ... params
          )`}</pre>
        </div>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Dead simple. No parsing, no validation, just substring matching. This works with 
          <em> any</em> LLM because it&apos;s just text.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Step 3: Dispatch Actions Synchronously or Asynchronously (Fire-and-Forget)</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          The key insight: <strong>don&apos;t block the chat response waiting for actions to complete that don&apos;t need to be synchronous</strong>. 
          Dispatch them synchronously or asynchronously and move on.
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`import boto3
  import json

  lambda_client = boto3.client('lambda')
  ACTION_DISPATCHER_FUNCTION = 'action-dispatcher-lambda'

  def dispatch_action(action, *, bot_response, messages, system_prompt, user_email):
      """Fire-and-forget invoke; never block or crash caller."""
      try:
          payload = {
              "arguments": {
                  "action": action,
                  "bot_response": bot_response,
                  "messages": messages,
                  "system_prompt": system_prompt,
                  "user_email": user_email,
              }
          }
          
          lambda_client.invoke(
              FunctionName=ACTION_DISPATCHER_FUNCTION,
              InvocationType="Event",  # async, fire-and-forget
              Payload=json.dumps(payload).encode("utf-8"),
          )
          print(f"Dispatched action: {action}")
      except Exception as e:
          # Log and move on; core chat response should not fail
          print(f"Dispatch failed for {action}: {e}")`}</pre>
        </div>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">InvocationType=&quot;Event&quot;</code> means 
          the Lambda invocation returns immediately. The action runs in the background while your chat 
          response goes back to the user.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Step 4: Strip Action Codes Before Returning to User</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          The action codes are internal signals. Remove them before showing the response to users:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`def handler(event, context):
      # Get LLM response
      bot_response = ask_chatbot(messages=messages, system_prompt=system_prompt)
      
      # Detect and dispatch actions
      find_run_actions(
          bot_response=bot_response,
          messages=messages,
          system_prompt=system_prompt,
          user_email=user_email
      )
      
      # Clean up response before returning to user
      clean_response = bot_response.replace("send_email_user_action_code", "")
      clean_response = clean_response.replace("get_news_action_code", "")
      
      return {
          "message": clean_response.strip()
      }`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Step 5: Execute Actions in a Separate Lambda</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          The action dispatcher Lambda handles the actual execution:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`def handler(event, context):
      """Action dispatcher Lambda - handles background actions."""
      arguments = event.get('arguments', {})
      action = arguments.get('action', '')
      bot_response = arguments.get('bot_response', '')
      messages = arguments.get('messages', [])
      system_prompt = arguments.get('system_prompt', '')
      user_email = arguments.get('user_email', '')
      
      if action == 'send_email_user_action_code':
          send_email_action(
              bot_response=bot_response,
              messages=messages,
              system_prompt=system_prompt,
              recipient=user_email
          )
      
      elif action == 'get_news_action_code':
          fetch_news_action(messages=messages, user_email=user_email)
      
      return {"message": "Actions dispatched successfully"}`}</pre>
        </div>

        <h2 className="mt-10 text-2xl font-semibold">Real Example: Email Action</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          In <strong>BalancingIQ</strong>, when users ask for financial analysis via email, the system:
        </p>

        <ol className="mt-4 list-decimal list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li>LLM includes <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">send_email_user_action_code</code> in response</li>
          <li>Code is detected, action dispatched to background Lambda</li>
          <li>User gets immediate chat response (code stripped out)</li>
          <li>Background Lambda makes second LLM call to format email</li>
          <li>Email sent via Microsoft Graph API</li>
        </ol>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Here&apos;s the email action handler:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`def send_email_action(bot_response, messages, system_prompt, recipient):
      """Generate and send formatted email based on conversation."""
      
      # Make a second LLM call with specialized prompt for email formatting
      email_prompt = """
      You are preparing a professional email based on the prior conversation.
      Return ONLY a JSON object with this structure:
      {
        "subject": "5-9 word subject line",
        "body": "Professional email body with 1-sentence summary, value, and next steps",
        "vega_spec": null or Vega-Lite chart spec if visualization was requested
      }
      
      Keep JSON under 5KB. Use double quotes. No markdown.
      """
      
      # Get structured email data from LLM
      email_response = ask_chatbot(messages=messages, system_prompt=email_prompt)
      
      # Parse JSON response
      email_data = json.loads(email_response)
      subject = email_data["subject"]
      body = email_data["body"]
      vega_spec = email_data.get("vega_spec")
      
      # Validate and send
      if subject and body:
          send_email_via_graph_api(
              recipient=recipient,
              subject=subject,
              body=body,
              chart=vega_spec
          )
          print(f"Email sent to {recipient}")`}</pre>
        </div>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          The action handler can make additional LLM calls, query databases, call external APIs, 
          whatever it needs to do, all without blocking the original chat response.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Why This Pattern Works So Well</h2>

        <h3 className="mt-8 text-xl font-semibold">1. LLM-Agnostic: Works With Any Model</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          I can switch between OpenAI, Claude, and Gemini by changing one line:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`def ask_chatbot(messages, system_prompt):
      """Unified LLM interface - swap providers easily."""
      
      # Currently using Gemini
      return ask_gemini(messages, system_prompt)
      
      # Uncomment to switch to Claude
      # return ask_bedrock(messages, system_prompt)
      
      # Uncomment to switch to OpenAI
      # return ask_openai(messages, system_prompt)`}</pre>
        </div>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          The action detection doesn&apos;t care which LLM generated the response. It&apos;s just looking for 
          substrings. This means:
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li>No vendor lock-in</li>
          <li>Easy A/B testing between models</li>
          <li>Route different queries to different models</li>
          <li>Graceful degradation if one provider has an outage</li>
        </ul>

        <h3 className="mt-8 text-xl font-semibold">2. Non-Blocking: Fast Response Times</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Actions run in the background. The user gets their chat response immediately, even if the 
          action takes 30 seconds to complete.
        </p>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          <strong>Example:</strong> Sending an email requires:
        </p>
        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li>Second LLM call (~1-2 seconds)</li>
          <li>JSON parsing and validation (~50ms)</li>
          <li>Microsoft Graph API call (~500ms)</li>
          <li><strong>Total: ~2.5 seconds</strong></li>
        </ul>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          With fire-and-forget dispatch, the user&apos;s chat response comes back in &lt;500ms. The email 
          arrives 2-3 seconds later, which feels instant.
        </p>

        <h3 className="mt-8 text-xl font-semibold">3. Fault-Tolerant: Actions Can Fail Safely</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          If an action fails (bad JSON, API timeout, whatever), the chat experience isn&apos;t broken:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`def dispatch_action(action, **kwargs):
      try:
          lambda_client.invoke(
              FunctionName=ACTION_DISPATCHER_FUNCTION,
              InvocationType="Event",
              Payload=json.dumps({"action": action, **kwargs})
          )
      except Exception as e:
          # Log the error but don't crash
          print(f"Action dispatch failed: {e}")
          # Could also send to error tracking service
          # sentry.capture_exception(e)`}</pre>
        </div>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          The user still gets their chat response. The action failure is logged, but doesn&apos;t break 
          the conversation. You can monitor failures and fix them without users even noticing.
        </p>

        <h3 className="mt-8 text-xl font-semibold">4. Easy to Debug and Test</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          No complex function calling protocols to debug. Just:
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li>Check the LLM response: does it contain the action code?</li>
          <li>Check dispatch logs: was the action dispatched?</li>
          <li>Check action handler logs: did the action execute?</li>
        </ul>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          You can test actions independently by invoking the action dispatcher Lambda directly with 
          mock payloads.
        </p>

        <h3 className="mt-8 text-xl font-semibold">5. Extensible: Add Actions in Minutes</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Adding a new action takes three steps:
        </p>

        <ol className="mt-4 list-decimal list-inside space-y-3 text-black/70 dark:text-white/70 ml-4">
          <li>
            <strong>Update system prompt:</strong> &quot;When the user asks for X, include &apos;new_action_code&apos; in your response.&quot;
          </li>
          <li>
            <strong>Add detection:</strong> <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">if &quot;new_action_code&quot; in bot_response: dispatch_action(&quot;new_action_code&quot;, ...)</code>
          </li>
          <li>
            <strong>Implement handler:</strong> Add the action logic to the dispatcher Lambda
          </li>
        </ol>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          No schema definitions, no API contracts, just code.
        </p>

        <h3 className="mt-8 text-xl font-semibold">6. Multiple Actions Just Work</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Your system can naturally trigger multiple actions in a single response without any 
          special handling:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
          <p className="text-sm text-black/70 dark:text-white/70 mb-3">
            <strong>LLM Response:</strong>
          </p>
          <p className="text-sm text-black/70 dark:text-white/70 italic">
          &quot;I&apos;ll send you that cash flow analysis via email <strong>send_email_user_action_code</strong> 
            {" "}and also pull recent news about your industry <strong>get_news_action_code</strong> so you 
            have full context.&quot;
          </p>
        </div>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          The action detector finds both codes and dispatches both actions simultaneously. No special 
          &quot;parallel function calling&quot; mode needed, no complex response parsing, just multiple substring 
          checks.
        </p>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          <strong>Comparison to official APIs:</strong>
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>OpenAI:</strong> Requires enabling parallel function calling, parsing array of tool_calls</li>
          <li><strong>Claude:</strong> Can return multiple tool blocks, requires handling each with structured iteration</li>
          <li><strong>Gemini:</strong> Similar structured parsing needed for parallel function declarations</li>
          <li><strong>Your string codes:</strong> Same simple code handles 1 action or 10 actions identically</li>
        </ul>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          In production, about 15% of BalancingIQ conversations trigger multiple actions (typically 
          &quot;send email&quot; + &quot;schedule followup&quot; or &quot;fetch data&quot; + &quot;generate report&quot;). The system handles 
          these as naturally as single actions, with no additional code complexity.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Comparison: String Codes vs Function Calling APIs</h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-black/20 dark:border-white/20">
                <th className="text-left py-3 px-2">Aspect</th>
                <th className="text-left py-3 px-2">String Codes</th>
                <th className="text-left py-3 px-2">Function Calling</th>
              </tr>
            </thead>
            <tbody className="text-black/70 dark:text-white/70">
              <tr className="border-b border-black/5 dark:border-white/5">
                <td className="py-3 px-2"><strong>LLM Support</strong></td>
                <td className="py-3 px-2">Works with any LLM</td>
                <td className="py-3 px-2">Provider-specific</td>
              </tr>
              <tr className="border-b border-black/5 dark:border-white/5">
                <td className="py-3 px-2"><strong>Setup Time</strong></td>
                <td className="py-3 px-2">Minutes</td>
                <td className="py-3 px-2">Hours (schemas, validation)</td>
              </tr>
              <tr className="border-b border-black/5 dark:border-white/5">
                <td className="py-3 px-2"><strong>Reliability</strong></td>
                <td className="py-3 px-2">Very high (simple substring match)</td>
                <td className="py-3 px-2">Variable (model-dependent)</td>
              </tr>
              <tr className="border-b border-black/5 dark:border-white/5">
                <td className="py-3 px-2"><strong>Blocking</strong></td>
                <td className="py-3 px-2">Non-blocking (async dispatch)</td>
                <td className="py-3 px-2">Often blocking (depends on impl)</td>
              </tr>
              <tr className="border-b border-black/5 dark:border-white/5">
                <td className="py-3 px-2"><strong>Debugging</strong></td>
                <td className="py-3 px-2">Easy (plain text logs)</td>
                <td className="py-3 px-2">Complex (JSON validation)</td>
              </tr>
              <tr className="border-b border-black/5 dark:border-white/5">
                <td className="py-3 px-2"><strong>Vendor Lock-in</strong></td>
                <td className="py-3 px-2">None</td>
                <td className="py-3 px-2">High</td>
              </tr>
              <tr>
                <td className="py-3 px-2"><strong>Parameters</strong></td>
                <td className="py-3 px-2">Optional: Simple or Complex</td>
                <td className="py-3 px-2">Complex (typed schemas)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-2xl font-semibold">When to Use This Pattern</h2>

        <h3 className="mt-8 text-xl font-semibold">Great For:</h3>
        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>Multi-provider systems:</strong> You want to switch between LLMs easily</li>
          <li><strong>Async actions:</strong> Actions can happen in the background (email, notifications, logging)</li>
          <li><strong>Simple triggers:</strong> &quot;Send email,&quot; &quot;fetch news,&quot; &quot;schedule task&quot;</li>
          <li><strong>Rapid prototyping:</strong> Add actions in minutes, not hours</li>
          <li><strong>Cost optimization:</strong> Route to cheapest model that can handle string codes</li>
        </ul>

        {/*<h3 className="mt-8 text-xl font-semibold">Not Ideal For:</h3>
        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>Complex parameter extraction:</strong> If you need typed, validated parameters 
          (use structured output or function calling)</li>
          <li><strong>Synchronous actions:</strong> If the chat response depends on the action result 
          (though you can poll or use websockets)</li>
          <li><strong>Highly formal systems:</strong> If you need strict API contracts and schemas</li>
        </ul>*/}

        {/*<h2 className="mt-10 text-2xl font-semibold">Real-World Production Stats</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          From <strong>BalancingIQ</strong> after 6 months in production:
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>Action detection accuracy:</strong> 99.7% (3 missed actions out of ~1,000 conversations)</li>
          <li><strong>False positives:</strong> 0 (action codes never appear naturally in responses)</li>
          <li><strong>Average dispatch time:</strong> 12ms (Lambda invocation)</li>
          <li><strong>Action failures:</strong> 2.1% (mostly API timeouts, not detection issues)</li>
          <li><strong>User-visible errors:</strong> 0 (all failures contained to background actions)</li>
        </ul>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          The system is rock-solid. I&apos;ve switched between Gemini, Claude, and OpenAI multiple times 
          without touching the action handler code.
        </p>*/}

        <h2 className="mt-10 text-2xl font-semibold">Implementation Guide</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Here&apos;s how to implement this in your system:
        </p>

        <h3 className="mt-8 text-xl font-semibold">1. Define Your Actions</h3>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`ACTIONS = {
      "send_email_user_action_code": {
          "description": "Send formatted email to user",
          "handler": send_email_action,
      },
      "get_news_action_code": {
          "description": "Fetch recent industry news",
          "handler": fetch_news_action,
      },
      "schedule_followup_action_code": {
          "description": "Schedule follow-up task",
          "handler": schedule_followup_action,
      },
  }`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">2. Update System Prompt</h3>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`action_instructions = "\\n".join([
      f"- Include '{code}' when: {info['description']}"
      for code, info in ACTIONS.items()
  ])

  system_prompt = f"""
  You are a helpful AI assistant.

  Action Codes (internal use):
  {action_instructions}

  Always respond naturally to the user. Action codes are background signals.
  """`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">3. Create Action Detector</h3>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`def find_run_actions(bot_response, context):
      """Scan response for action codes and dispatch."""
      for action_code, action_info in ACTIONS.items():
          if action_code in bot_response:
              dispatch_action(
                  action=action_code,
                  context=context,
              )`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">4. Implement Async Dispatch</h3>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`def dispatch_action(action, context):
      """Fire-and-forget Lambda invocation."""
      try:
          lambda_client.invoke(
              FunctionName=os.environ['ACTION_DISPATCHER_LAMBDA'],
              InvocationType="Event",  # async
              Payload=json.dumps({
                  "action": action,
                  "context": context,
              }).encode("utf-8"),
          )
          print(f"Dispatched: {action}")
      except Exception as e:
          print(f"Dispatch failed: {action}, error: {e}")
          # Don't raise - keep chat working`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">5. Create Dispatcher Lambda</h3>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`def handler(event, context):
      """Action dispatcher - routes to appropriate handler."""
      action = event.get('action')
      context = event.get('context')
      
      if action in ACTIONS:
          handler_func = ACTIONS[action]['handler']
          handler_func(context)
      else:
          print(f"Unknown action: {action}")
      
      return {"status": "complete"}`}</pre>
        </div>

        <h2 className="mt-10 text-2xl font-semibold">Advanced: Multi-Step Actions</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          You can chain multiple LLM calls for complex actions:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <div className="text-xs text-black/40 dark:text-white/40 mb-2">Python</div>
          <pre className="text-black/80 dark:text-white/80">{`def send_email_action(context):
      """Multi-step action: analyze → format → send."""
      
      # Step 1: Analyze conversation for key points
      analysis_prompt = "Summarize the key points discussed."
      summary = ask_chatbot(context['messages'], analysis_prompt)
      
      # Step 2: Format as professional email
      email_prompt = f"Turn this into a professional email: {summary}"
      email_data = ask_chatbot(context['messages'], email_prompt)
      
      # Step 3: Parse and validate
      parsed = json.loads(email_data)
      
      # Step 4: Send via API
      send_email_via_api(
          recipient=context['user_email'],
          subject=parsed['subject'],
          body=parsed['body']
      )`}</pre>
        </div>

        {/*<h2 className="mt-10 text-2xl font-semibold">Key Takeaways</h2>
        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70">
          <li>
            <strong>String-based action codes work with any LLM.</strong> No vendor lock-in, no 
            provider-specific APIs to learn.
          </li>
          <li>
            <strong>Fire-and-forget dispatch keeps responses fast.</strong> Actions run in the 
            background while users get immediate feedback.
          </li>
          <li>
            <strong>Failures are isolated.</strong> If an action fails, the chat experience isn&apos;t 
            broken. Log, alert, fix later.
          </li>
          <li>
            <strong>Setup is trivial.</strong> Add action codes to system prompt, detect with substring 
            matching, dispatch async. That&apos;s it.
          </li>
          <li>
            <strong>Extensibility is built-in.</strong> New actions take minutes to add, not hours 
            of schema design.
          </li>
          <li>
            <strong>99.7% accuracy in production.</strong> Simple patterns work. Don&apos;t overcomplicate.
          </li>
          <li>
            Use function calling APIs when you need typed parameters and synchronous responses. Use 
            string codes when you want simplicity, speed, and LLM-agnosticism.
          </li>
        </ul>*/}

        <div className="mt-12 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
          <p className="text-sm text-black/70 dark:text-white/70">
            <strong>Building LLM-powered actions?</strong> I&apos;d love to hear about your implementation 
            challenges, multi-provider systems, or action reliability issues. Reach out at{" "}
            <a href="mailto:adamdugan6@gmail.com" className="underline hover:opacity-80">
              adamdugan6@gmail.com
            </a>{" "}
            or connect with me on{" "}
            <a 
              href="https://www.linkedin.com/in/adam-dugan-918722217/" 
              target="_blank" 
              rel="noreferrer noopener"
              className="underline hover:opacity-80"
            >
              LinkedIn
            </a>.
          </p>
        </div>
      </main>
    </>
  );
}
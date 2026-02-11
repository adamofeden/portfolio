// src/app/blog/voice-ai-production/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building Voice AI That Doesn't Suck: Real-Time Conversational Interfaces in Production - Adam Dugan",
  description:
    "Everyone wants to build 'the next Jarvis,' but most voice AI feels clunky and frustrating. Here's what I learned building production voice systems with Twilio, OpenAI, and Azure Speech.",
};

export default function Page() {
  return (
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
        Building Voice AI That Doesn&apos;t Suck: Real-Time Conversational Interfaces in Production
      </h1>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Everyone wants to build &quot;the next Jarvis.&quot; Call a number, talk naturally, and get intelligent 
        responses. It sounds simple, until you try to build it.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I&apos;ve built voice AI systems for multiple projects: an AI administrative assistant that takes 
        phone calls, schedules appointments, and responds to inquiries; voice interfaces for 
        <em> SOA Assist Pro</em> to help agents navigate Medicare forms; and experimental interfaces 
        for customer support automation.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Here&apos;s what I learned the hard way: <strong>Most voice AI feels clunky because latency, 
        conversation design, and interruption handling are harder problems than prompt engineering.</strong>
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Why Most Voice AI Feels Terrible</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Think about the last time you called an automated customer service line. You probably experienced:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>Long pauses where you&apos;re not sure if the system heard you</li>
        <li>The bot talking over you when you try to interrupt</li>
        <li>Misunderstanding what you said, even when you spoke clearly</li>
        <li>Robotic, unnatural pacing and tone</li>
        <li>Getting stuck in loops where you can&apos;t reach a human</li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        These aren&apos;t AI problems, they&apos;re <strong>engineering problems</strong>. The underlying LLM 
        is perfectly capable of understanding and responding. But the infrastructure between &quot;user 
        speaks&quot; and &quot;bot responds&quot; is where everything falls apart.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">The Stack That Actually Works</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        After trying multiple approaches, here&apos;s the stack I&apos;ve converged on for production voice AI:
      </p>

      <h3 className="mt-8 text-xl font-semibold">Twilio for Telephony</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Twilio</strong> handles the phone infrastructure: receiving calls, managing sessions, 
        and streaming audio. It&apos;s rock-solid, well-documented, and handles edge cases (dropped calls, 
        poor connections) better than anything I&apos;ve tried to build myself.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Key features:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>WebSocket streaming:</strong> Real-time bidirectional audio with low latency</li>
        <li><strong>TwiML:</strong> Simple XML-based call control (greetings, transfers, recordings)</li>
        <li><strong>Call recording:</strong> Built-in, compliant, useful for debugging and training</li>
        <li><strong>Global infrastructure:</strong> Low-latency phone numbers in 100+ countries</li>
      </ul>

      <h3 className="mt-8 text-xl font-semibold">Azure Speech for TTS/STT</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        For <strong>Text-to-Speech (TTS)</strong> and <strong>Speech-to-Text (STT)</strong>, I use 
        <strong> Azure Speech Services</strong>. I&apos;ve tried OpenAI&apos;s Whisper, Google Cloud Speech, 
        and AWS Transcribe. Azure wins on the combination of:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Latency:</strong> Sub-500ms for both STT and TTS in most regions</li>
        <li><strong>Natural voices:</strong> Neural TTS voices sound genuinely human, not robotic</li>
        <li><strong>Customization:</strong> SSML support for pacing, emphasis, pauses</li>
        <li><strong>Streaming:</strong> Both STT and TTS support streaming, critical for real-time feel</li>
        <li><strong>Cost:</strong> More affordable than OpenAI&apos;s TTS for production volume</li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Note: OpenAI&apos;s Whisper is excellent for accuracy, but it&apos;s not real-time. For voice calls, 
        you need streaming STT, and Azure handles this better.
      </p>

      <h3 className="mt-8 text-xl font-semibold">OpenAI (or Claude) for Conversational Intelligence</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        For the <strong>conversational logic</strong> (understanding intent, generating responses, 
        maintaining context), I use <strong>OpenAI&apos;s GPT-4</strong> or <strong>Anthropic&apos;s Claude</strong>, 
        depending on the use case.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Key considerations:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Streaming responses:</strong> GPT-4 Turbo with streaming gives you token-by-token 
        output, which you can start converting to speech before the full response is done. This 
        dramatically reduces perceived latency.</li>
        <li><strong>Short prompts:</strong> Voice conversations need concise responses. A 300-word 
        response that reads well on paper takes 90 seconds to speak, way too long.</li>
        <li><strong>Function calling:</strong> For actions like &quot;schedule an appointment&quot; or &quot;look up 
        an order,&quot; use function calling to trigger backend APIs instead of making the LLM do everything.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">The Architecture: How It All Connects</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Here&apos;s the flow for a typical voice AI call:
      </p>

      <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
        <ol className="list-decimal list-inside space-y-3 text-sm text-black/70 dark:text-white/70">
          <li><strong>User calls the Twilio number</strong></li>
          <li>Twilio receives the call and opens a WebSocket connection to your server</li>
          <li>Your server streams audio chunks to Azure Speech STT</li>
          <li>Azure returns transcribed text in real-time (partial results, then final)</li>
          <li>When the user stops speaking (detected by silence), send the transcription to OpenAI</li>
          <li>OpenAI streams back a response, token by token</li>
          <li>As tokens arrive, batch them and send to Azure TTS for conversion to speech</li>
          <li>Stream the generated audio back to Twilio</li>
          <li>Twilio plays the audio to the user over the phone</li>
          <li>Repeat steps 3-9 for the next turn in the conversation</li>
        </ol>
      </div>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Simple in theory. Complex in practice.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">The Hard Parts: Latency, Interruptions, and Conversation Design</h2>

      <h3 className="mt-8 text-xl font-semibold">1. Latency Is Everything</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        In a phone conversation, anything over <strong>2 seconds of silence</strong> feels broken. 
        Users start repeating themselves or hang up.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Your latency budget:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>STT:</strong> 200-500ms to get a final transcription</li>
        <li><strong>LLM inference:</strong> 500-1500ms for GPT-4 to start streaming (first token)</li>
        <li><strong>TTS:</strong> 200-400ms to convert the first sentence to audio</li>
        <li><strong>Network overhead:</strong> 100-300ms across hops</li>
      </ul>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Total: 1-2.7 seconds</strong> in the best case. You&apos;re already at the edge of acceptable.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>How to optimize:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Stream everything:</strong> Use streaming STT, streaming LLM responses, and 
        streaming TTS. Don&apos;t wait for complete outputs.</li>
        <li><strong>Start speaking early:</strong> As soon as you have the first sentence from the 
        LLM, convert it to speech and start playing. The user hears a response while the rest is 
        still generating.</li>
        <li><strong>Pre-cache common responses:</strong> For frequent queries (&quot;What are your hours?&quot;), 
        pre-generate and cache the audio. Serve it instantly.</li>
        <li><strong>Use faster models when possible:</strong> GPT-4o-mini has 3-5x lower latency than 
        GPT-4 for first token. Use it for simple queries.</li>
        <li><strong>Run servers close to users:</strong> Deploy in the same region as your Twilio 
        numbers and Azure Speech endpoints. Every 100ms matters.</li>
      </ul>

      <h3 className="mt-8 text-xl font-semibold">2. Handling Interruptions</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        In human conversation, we interrupt each other all the time. &quot;Can I schedule an appoint-&quot; 
        &quot;Sure, what day works for you?&quot;
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Most voice AI doesn&apos;t handle this. The bot keeps talking even when you start speaking. It&apos;s 
        infuriating.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>The solution:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Barge-in detection:</strong> Monitor incoming audio while the bot is speaking. 
        If speech is detected above a threshold, immediately stop the TTS playback.</li>
        <li><strong>Clear the buffers:</strong> Cancel any pending TTS and LLM streaming. Don&apos;t let 
        old content leak into the new turn.</li>
        <li><strong>Acknowledge the interruption:</strong> Optional, but human-like: &quot;Oh, sorry-go ahead.&quot;</li>
        <li><strong>Context preservation:</strong> Keep the conversation history so the bot knows what 
        it was about to say, in case it&apos;s relevant.</li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        This is technically tricky. You need real-time audio level monitoring, WebSocket control 
        messages, and careful state management to avoid race conditions.
      </p>

      <h3 className="mt-8 text-xl font-semibold">3. Conversation Design (Not Just Prompt Engineering)</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Designing for voice is fundamentally different than designing for chat. Here&apos;s what I learned:
      </p>

      <h4 className="mt-6 text-lg font-semibold">Keep Responses Short</h4>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        A paragraph that reads quickly takes forever to speak. Aim for <strong>1-2 sentences per turn</strong>. 
        If you need to convey more, break it into back-and-forth.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Bad: &quot;Thanks for calling! I can help you schedule an appointment, check your order status, 
        update your account information, or answer general questions about our products and services. 
        What would you like to do today?&quot;
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Good: &quot;Hi! How can I help you today?&quot;
      </p>

      <h4 className="mt-6 text-lg font-semibold">Clarify Ambiguity Early</h4>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        STT isn&apos;t perfect, especially with background noise, accents, or domain-specific terms. If 
        you&apos;re not sure what the user said, <strong>ask for confirmation</strong>.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Example: &quot;Did you say Tuesday at 2pm, or Thursday at 2pm?&quot;
      </p>

      <h4 className="mt-6 text-lg font-semibold">Provide Escape Hatches</h4>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Always give users a way out. &quot;If you&apos;d like to speak to a human, just say &apos;agent&apos; or press 0.&quot;
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Nothing destroys trust faster than trapping someone in a bot loop with no way to escalate.
      </p>

      <h4 className="mt-6 text-lg font-semibold">Use Filler Words Strategically</h4>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Humans say &quot;um,&quot; &quot;let me see,&quot; &quot;just a moment&quot; to fill silence while thinking. Bots should too. 
        If you need to query a database or call an API, have the bot say &quot;Let me check that for you&quot; 
        while the request is in flight. It makes latency feel intentional, not broken.
      </p>

      <h4 className="mt-6 text-lg font-semibold">Test With Real Phone Calls</h4>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Don&apos;t just test in a quiet room with a clear microphone. Call from your car, from a coffee shop, 
        with background noise. Real-world audio quality is <em>much</em> worse than you expect.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Handling Background Noise and Accents</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Phone calls happen in noisy environments: cars, offices, streets. And callers have accents, 
        speak quickly, or mumble.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Strategies that help:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>
          <strong>Noise suppression:</strong> Azure Speech has built-in noise reduction. It&apos;s not 
          perfect, but it helps with background chatter, traffic, etc.
        </li>
        <li>
          <strong>Confidence scores:</strong> Azure STT returns confidence scores per word. If 
          confidence is low (&lt;0.6), ask the user to repeat.
        </li>
        <li>
          <strong>Contextual hints:</strong> If you know the domain (e.g., scheduling appointments), 
          provide a phrase list to Azure STT to boost recognition of specific terms like &quot;Tuesday,&quot; 
          &quot;2pm,&quot; doctor names, etc.
        </li>
        <li>
          <strong>Fallback to spelling:</strong> For critical info (names, email addresses), ask users 
          to spell it out. &quot;Can you spell your last name for me?&quot;
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Cost Considerations: Voice AI Is Expensive</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Let&apos;s talk money. Voice AI isn&apos;t cheap, especially at scale.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Typical costs for a 5-minute call:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Twilio:</strong> $0.013/min for inbound calls in the US → $0.065</li>
        <li><strong>Azure STT:</strong> $1/hour for standard recognition → $0.083</li>
        <li><strong>Azure TTS:</strong> $16/1M characters (≈1000 words per minute) → $0.08</li>
        <li><strong>OpenAI GPT-4:</strong> ~10K tokens for a 5-min conversation → $0.30</li>
        <li><strong>Total: ~$0.53 per 5-minute call</strong></li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        That&apos;s $6.36 per hour of conversation, or $636 for 100 hours. If you&apos;re running a customer 
        support line with hundreds of calls per day, it adds up fast.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>How to control costs:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Use cheaper models:</strong> GPT-4o-mini is 10x cheaper for many use cases.</li>
        <li><strong>Cache responses:</strong> For FAQs, pre-generate and cache audio.</li>
        <li><strong>Tier by complexity:</strong> Route simple queries to cheaper models, complex ones 
        to GPT-4.</li>
        <li><strong>Set time limits:</strong> Cap calls at 10 minutes, then offer to transfer to a human.</li>
        <li><strong>Monitor usage per customer:</strong> Flag and investigate outliers (someone making 
        50 calls/day probably isn&apos;t legitimate use).</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Real-World Example: AI Administrative Assistant</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        In one of my projects, I built an AI assistant that answers calls for a small business. It 
        handles appointment scheduling, basic questions, and routes urgent calls to humans.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>What worked:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>Streaming everything: latency stayed under 1.5 seconds for most turns</li>
        <li>Pre-cached greetings and FAQs: instant responses for common questions</li>
        <li>Clear escalation path: &quot;If you need immediate help, I&apos;ll transfer you now&quot;</li>
        <li>Conversational function calling: &quot;Let me check the calendar&quot; → query Google Calendar API</li>
        <li>Call recording + transcript logging: useful for debugging and training</li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>What was hard:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>Handling interruptions reliably (took multiple iterations to get barge-in working smoothly)</li>
        <li>Accents and background noise (confidence score thresholds required tuning)</li>
        <li>Keeping conversations on track (users ramble, change topics, or get confused)</li>
        <li>Edge cases: multiple speakers on one line, speakerphone echo, poor cell connections</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">When to Use Voice AI (and When Not To)</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Voice AI isn&apos;t always the right solution. Here&apos;s when it makes sense:
      </p>

      <h3 className="mt-6 text-lg font-semibold">Good Use Cases:</h3>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>High-volume, low-complexity queries:</strong> &quot;What are your hours?&quot; &quot;Where&apos;s my order?&quot;</li>
        <li><strong>After-hours support:</strong> Handle calls when humans aren&apos;t available</li>
        <li><strong>Appointment scheduling:</strong> Voice is more natural than form-filling</li>
        <li><strong>Triage and routing:</strong> Figure out what the caller needs, then route appropriately</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold">Bad Use Cases:</h3>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Complex, sensitive issues:</strong> Healthcare diagnosis, legal advice, financial 
        planning, these need humans</li>
        <li><strong>High-emotion situations:</strong> Angry customers, emergencies, these escalate immediately</li>
        <li><strong>Tasks requiring visual elements:</strong> &quot;Fill out this form&quot; works better on web/app</li>
        <li><strong>Long-form content:</strong> Don&apos;t read a 10-minute policy over the phone</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Key Takeaways</h2>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70">
        <li>
          <strong>Latency is everything:</strong> Keep total response time under 2 seconds by streaming 
          STT, LLM, and TTS.
        </li>
        <li>
          The stack that works: <strong>Twilio + Azure Speech + OpenAI</strong>, with careful 
          orchestration between them.
        </li>
        <li>
          <strong>Interruption handling is critical:</strong> Implement barge-in detection so users 
          can cut off the bot naturally.
        </li>
        <li>
          <strong>Conversation design ≠ prompt engineering:</strong> Keep responses short, clarify 
          ambiguity, provide escape hatches.
        </li>
        <li>
          <strong>Voice AI is expensive:</strong> ~$0.50+ per 5-minute call. Cache aggressively, 
          use cheaper models when possible.
        </li>
        <li>
          <strong>Test with real phone calls:</strong> Background noise, accents, and poor connections 
          break systems that work perfectly in dev.
        </li>
        <li>
          Not every problem needs voice AI. Use it for high-volume, low-complexity tasks where 
          it genuinely improves UX.
        </li>
      </ul>

      <div className="mt-12 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
        <p className="text-sm text-black/70 dark:text-white/70">
          <strong>Building voice AI for your product?</strong> I&apos;d love to hear about your challenges 
          with latency, conversation design, or production deployment. Reach out at{" "}
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
      <p className="mt-8 text-sm text-black/60 dark:text-white/60 italic text-center">
        I (Adam Dugan) used LLMs while writing this article.
      </p>
    </main>
  );
}
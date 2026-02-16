// src/components/Chatbot.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { SYSTEM_PROMPT } from "@/utils/systemPrompt";

import { Amplify } from 'aws-amplify';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import outputs from '../../amplify_outputs.json';

import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

Amplify.configure(outputs);
const client = generateClient<Schema>();

//const client = generateClient<Schema>();

interface Message {
  role: "user" | "assistant";
  content: string;
  citations?: Array<{ title: string; uri: string }>;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use a ref to store the client
  //const clientRef = useRef<any>(null);
  const clientRef = useRef<ReturnType<typeof generateClient<Schema>> | null>(null);

  /*useEffect(() => {
    const { Amplify } = require('aws-amplify');
    const outputs = require('../../amplify_outputs.json');
    Amplify.configure(outputs);
    
    const { generateClient } = require('aws-amplify/data');
    clientRef.current = generateClient();
    console.log('Client initialized:', clientRef.current); // Add this
  }, []);*/
  useEffect(() => {
    clientRef.current = client;
    console.log('Client initialized:', clientRef.current);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare messages for GraphQL - only send role and content
      const messagesForAPI = updatedMessages.map(({ role, content }) => ({
        role,
        content,
      }));

      console.log('Sending message to chatbot...', messagesForAPI);

      // Call the GraphQL query
      //const response = await clientRef.current.queries.askChatbot({
      const response = await client.queries.askChatbotGo({
        messages: messagesForAPI,//JSON.stringify(messagesForAPI),
        systemPrompt: SYSTEM_PROMPT,
      });

      console.log('Response received:', response);

      if (response.data) {
        const assistantMessage: Message = {
          role: "assistant",
          content: response.data.message || "Sorry, I couldn't generate a response.",
          citations: response.data.citations ? JSON.parse(response.data.citations as string) : [],
        };
        setMessages([...updatedMessages, assistantMessage]);
      }
    } catch (error) {
      console.error("Error calling chatbot:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Warm Lambda to stop long waiting for cold starts
  const warmLambda = async () => {
    try {
      await client.queries.askChatbotGo({
        messages: [{ role: "user", content: "Hi" }],//JSON.stringify([{ role: "user", content: "Hi" }]), // Minimal message
        systemPrompt: "Reply with one word only.",
        //messages: JSON.stringify([]), // Empty messages
        //initializeSession: true,
      });
      console.log('Lambda warmed successfully');
    } catch (error) {
      console.error('Error warming Lambda:', error);
    }
  };
  useEffect(() => {
    console.log('Warming Lambda...');
    // Warm immediately when component mounts
    warmLambda();
    
    // Then warm every 4-5 minutes (Lambda container stays warm ~10-15 min)
    const warmingInterval = setInterval(() => {
      warmLambda();
    }, 2 * 60 * 1000); // 4 minutes
    //}, 5 * 1000); // 5 seconds
    
    return () => clearInterval(warmingInterval);
  }, []);

  const SUGGESTED_QUESTIONS = [
    "How can I contact Adam?",
    "What projects has Adam worked on?",
    "What are Adam's technical skills?",
    "Tell me about Adam's experience",
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          //className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400 text-white shadow-lg hover:scale-110 transition-transform"
          className="fixed bottom-6 right-6 z-50 flex h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400 px-5 text-white shadow-lg hover:scale-110 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="font-medium">CHAT WITH ADAM&apos;S AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] max-w-[calc(100vw-3rem)] flex-col rounded-2xl border border-black/10 dark:border-white/20 bg-white dark:bg-neutral-900 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/20 p-4">
            <h3 className="font-semibold">Adam&apos;s AI</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-sm text-black/60 dark:text-white/60 mt-0">
                <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="font-medium">
                  Ask me anything!
                </p>
                <div className="space-y-2 mt-4">
                  {SUGGESTED_QUESTIONS.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(question)}
                      className="text-center px-4 py-3 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-emerald-400/10 hover:from-indigo-500/20 hover:to-emerald-400/20 border border-indigo-500/20 text-sm transition-all hover:scale-[1.02] hover:shadow-md"
                    >
                      <span className="bg-gradient-to-br from-indigo-500 to-emerald-400 bg-clip-text text-transparent font-medium">
                        {question}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-indigo-500 to-emerald-400 text-white"
                      : "bg-black/5 dark:bg-white/10"
                  }`}
                >
                  {/*<p className="text-sm whitespace-pre-wrap">{msg.content}</p>*/}
                  <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2 text-xs opacity-70">
                      Sources:
                      {msg.citations.map((cite, idx) => (
                        <a
                          key={idx}
                          href={cite.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:underline"
                        >
                          {cite.title || cite.uri}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-black/5 dark:bg-white/10 rounded-2xl px-4 py-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-black/10 dark:border-white/20 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-black/10 dark:border-white/20 bg-white/70 dark:bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-400 text-white hover:opacity-90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
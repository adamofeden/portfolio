"use client";

import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

export default function DemoPage() {
  const [name, setName] = useState("World");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCallLambda = async () => {
    console.log("=== Starting Lambda Call ===");
    console.log("Input name:", name);
    console.log("Timestamp:", new Date().toISOString());
    
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log("Calling client.queries.askGoFunction...");
      
      const startTime = performance.now();
      const result = await client.queries.askGoFunction({ 
        name: name 
      });
      const endTime = performance.now();
      
      console.log("Raw result object:", result);
      console.log("Result data:", result.data);
      console.log("Result errors:", result.errors);
      console.log("Execution time:", `${(endTime - startTime).toFixed(2)}ms`);

      if (result.data) {
        console.log("Success! Response message:", result.data.message);
        setResponse(result.data.message);
      } else {
        console.error("No data in response");
        setError("No data returned from Lambda");
      }

      if (result.errors && result.errors.length > 0) {
        console.error("Errors present:", result.errors);
        setError(JSON.stringify(result.errors, null, 2));
      }

    } catch (err) {
      console.error("=== Error caught ===");
      console.error("Error object:", err);
      console.error("Error type:", typeof err);
      console.error("Error constructor:", err?.constructor?.name);
      
      if (err instanceof Error) {
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
        setError(err.message);
      } else {
        console.error("Unknown error type:", JSON.stringify(err));
        setError(String(err));
      }
    } finally {
      setLoading(false);
      console.log("=== Lambda Call Complete ===");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
            Go Lambda Demo
          </h1>
          
          <div className="space-y-6">
            {/* Input Section */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Enter your name:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg 
                          bg-white dark:bg-slate-700 text-slate-800 dark:text-white
                          focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                          transition-all duration-200"
                placeholder="World"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleCallLambda}
              disabled={loading || !name}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 
                        disabled:bg-slate-400 disabled:cursor-not-allowed
                        text-white font-semibold rounded-lg shadow-md
                        transition-all duration-200 transform hover:scale-[1.02]
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? "Calling Lambda..." : "Call Go Lambda Function"}
            </button>

            {/* Response Section */}
            {response && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                  Response:
                </h3>
                <p className="text-green-700 dark:text-green-200 font-mono">
                  {response}
                </p>
              </div>
            )}

            {/* Error Section */}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">
                  Error:
                </h3>
                <pre className="text-red-700 dark:text-red-200 text-sm overflow-x-auto">
                  {error}
                </pre>
              </div>
            )}

            {/* Console Info */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                💡 <strong>Tip:</strong> Open your browser's Developer Console (F12) 
                to see detailed logging of the Lambda call lifecycle.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details Card */}
        <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
            Technical Details
          </h2>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p><strong>Function:</strong> askGoFunction</p>
            <p><strong>Runtime:</strong> Go (PROVIDED_AL2023)</p>
            <p><strong>Handler:</strong> bootstrap</p>
            <p><strong>Input:</strong> {`{ name: string }`}</p>
            <p><strong>Output:</strong> {`{ message: string }`}</p>
            <p><strong>Authorization:</strong> Guest access enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
}
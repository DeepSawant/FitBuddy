"use client";
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hi! I’m FitBuddy Assistant. Ask me fitness or nutrition questions." },
  ]);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    // Simple rule-based demo
    let reply = "I can help with workouts, macros, hydration, and recovery. Try: ‘What is a good HIIT for 20 min?’";
    if (/protein|how much.*protein/i.test(userMsg.content)) {
      reply = "General guidance: 1.6–2.2 g/kg of body weight per day, depending on goals.";
    } else if (/bmi|calorie|deficit|surplus/i.test(userMsg.content)) {
      reply = "Calorie needs depend on BMR and activity. Consider a 400 kcal deficit for fat loss or 300 kcal surplus for muscle gain.";
    }
    setMessages((m) => [...m, { role: "assistant", content: reply }]);
  };

  return (
    <div className="card p-4 h-[500px] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                m.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 border border-[var(--border)] rounded-md px-3 py-2 bg-transparent"
          placeholder="Ask about fitness or nutrition..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
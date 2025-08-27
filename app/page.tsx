"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a smart assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage1() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await resp.json();
      const reply = data?.choices?.[0]?.message?.content || "❌ 无输出";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ 请求失败" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage2() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/langchain", {
      method: "POST",
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...newMessages,
        ],
      }),
    });
    const data = await res.json();
    setMessages([
      ...newMessages,
      { role: "assistant", content: String(data.output ?? "") },
    ]);
    setLoading(false);
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <a className="flex items-center gap-2 hover:underline hover:underline-offset-4">
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        IKNOW: an AI tools can do everything for you.
      </a>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">Get started by editing.</li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <textarea
            className="flex-1 border rounded-lg p-2 w-[500px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Input message and press Enter"
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          />
          <button
            onClick={sendMessage1}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            disabled={loading}
          >
            openAI
          </button>
          <button
            onClick={sendMessage2}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            disabled={loading}
          >
            LangChain
          </button>
        </div>

        <div className="border rounded-lg p-4 h-[50vh] overflow-auto space-y-2 bg-gray-50 w-[500px]">
          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === "user" ? "text-right" : "text-left"}
            >
              <div
                className={`inline-block px-3 py-2 rounded-xl max-w-[80%] ${
                  m.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-400">Replying...</div>}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          By Yongjun Wang (wangyj641@gmail.com)
        </a>
      </footer>
    </div>
  );
}

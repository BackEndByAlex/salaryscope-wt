import { useState, useRef, useEffect } from "react"
import { useChat } from "./useChat.js"

const SUGGESTIONS = [
  "What's the avg salary for a senior data engineer?",
  "Best paying countries for ML engineers?",
  "Remote vs in-person salary difference?",
]

export default function ChatPanel({ onClose }) {
  const { messages, streaming, sendMessage, clear } = useChat()
  const [input, setInput] = useState("")
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || streaming) return
    setInput("")
    sendMessage(text)
  }

  function handleSuggestion(text) {
    if (streaming) return
    sendMessage(text)
  }

  return (
    <div
      className="flex flex-col"
      style={{
        width: 360,
        height: 520,
        background: "#1a1d23",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "#111318",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-base"
            style={{ color: "#2563eb" }}
          >
            smart_toy
          </span>
          <span className="text-sm font-bold text-white">SalaryScope AI</span>
          <span
            className="text-[0.6rem] px-1.5 py-0.5 rounded-sm font-black"
            style={{ background: "rgba(37,99,235,0.2)", color: "#60a5fa" }}
          >
            BETA
          </span>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={clear}
              className="text-[0.65rem] transition-colors"
              style={{ color: "rgba(173,170,170,0.5)" }}
              onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(173,170,170,0.5)")
              }
            >
              Clear
            </button>
          )}
          <button onClick={onClose} style={{ color: "rgba(173,170,170,0.5)" }}>
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
        style={{ scrollbarWidth: "thin" }}
      >
        {messages.length === 0 ? (
          <div className="space-y-4 pt-2">
            <p
              className="text-xs text-center"
              style={{ color: "rgba(173,170,170,0.5)" }}
            >
              Ask anything about salary data across 137k records.
            </p>
            <div className="space-y-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="w-full text-left text-xs px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(200,200,200,0.8)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(37,99,235,0.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.04)")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="text-xs px-3 py-2 max-w-[85%]"
                style={{
                  borderRadius:
                    m.role === "user"
                      ? "12px 12px 2px 12px"
                      : "12px 12px 12px 2px",
                  background:
                    m.role === "user" ? "#2563eb" : "rgba(255,255,255,0.06)",
                  color:
                    m.role === "user" ? "#ffffff" : "rgba(220,220,220,0.9)",
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
                {m.role === "assistant" &&
                  streaming &&
                  i === messages.length - 1 && (
                    <span
                      className="inline-block ml-1 w-1.5 h-3 align-middle"
                      style={{
                        background: "#2563eb",
                        animation: "blink 1s step-end infinite",
                      }}
                    />
                  )}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-3 shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about salaries…"
          disabled={streaming}
          className="flex-1 text-xs px-3 py-2 outline-none"
          style={{
            background: "#111318",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "rgba(220,220,220,0.9)",
            opacity: streaming ? 0.5 : 1,
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || streaming}
          className="shrink-0 p-2 rounded-lg transition-opacity"
          style={{
            background: "#2563eb",
            opacity: !input.trim() || streaming ? 0.4 : 1,
          }}
        >
          <span className="material-symbols-outlined text-sm text-white">
            send
          </span>
        </button>
      </form>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}

import { useState } from "react"
import ChatPanel from "./ChatPanel.jsx"

export default function ChatBubble() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && <ChatPanel onClose={() => setOpen(false)} />}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-transform active:scale-95"
        style={{
          background: open ? "#1e3a8a" : "#2563eb",
          boxShadow: "0 4px 20px rgba(37,99,235,0.5)",
        }}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
      >
        <span className="material-symbols-outlined text-white text-xl">
          {open ? "close" : "smart_toy"}
        </span>
      </button>
    </div>
  )
}

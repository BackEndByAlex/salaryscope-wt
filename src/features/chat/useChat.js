import { useState, useRef, useCallback } from "react"

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000"

export function useChat() {
  const [messages, setMessages] = useState([])
  const [streaming, setStreaming] = useState(false)
  const abortRef = useRef(null)

  const sendMessage = useCallback(
    async (content) => {
      const userMessage = { role: "user", content }
      const nextMessages = [...messages, userMessage]
      setMessages(nextMessages)
      setStreaming(true)

      // Placeholder for the assistant reply — will be filled token by token
      setMessages((prev) => [...prev, { role: "assistant", content: "" }])

      try {
        abortRef.current = new AbortController()

        const response = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ messages: nextMessages }),
          signal: abortRef.current.signal,
        })

        if (!response.ok) throw new Error("Chat request failed")

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split("\n")
          buffer = lines.pop() ?? ""

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue
            const payload = line.slice(6).trim()
            if (payload === "[DONE]" || payload === "[ERROR]") break

            try {
              const { token } = JSON.parse(payload)
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: updated[updated.length - 1].content + token,
                }
                return updated
              })
            } catch {
              // malformed chunk — skip
            }
          }
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              role: "assistant",
              content: "Something went wrong. Please try again.",
            }
            return updated
          })
        }
      } finally {
        setStreaming(false)
      }
    },
    [messages],
  )

  function clear() {
    abortRef.current?.abort()
    setMessages([])
    setStreaming(false)
  }

  return { messages, streaming, sendMessage, clear }
}

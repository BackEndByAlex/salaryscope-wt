---
sidebar_position: 6
sidebar_label: Chat
---

# chat/

The AI chat assistant. A floating button in the bottom-right corner of every page opens a chat panel that streams answers from the Groq LLM, grounded in salary data from Elasticsearch.

---

## ChatBubble.jsx

The entry point. Rendered globally inside `App.jsx` so it appears on every page regardless of the active route.

Holds a single boolean `open` state. When `open` is true, renders `ChatPanel` above the button. The button toggles between a `smart_toy` icon (closed) and a `close` icon (open).

---

## ChatPanel.jsx

The chat UI — a fixed-size panel (360×520px) that floats above the page.

Three sections:

**Header** — title, BETA badge, a Clear button (clears the message history), and a close button.

**Messages** — scrollable list of user and assistant bubbles. When no messages have been sent yet, shows three suggestion prompts to help users get started. While the assistant is streaming a response, a blinking cursor appears at the end of the last bubble.

**Input** — text field and send button. Disabled while a response is streaming to prevent overlapping requests.

Delegates all data logic to `useChat`. The component only handles display and scroll behaviour.

---

## useChat.js

All state and network logic for the chat.

- `messages` — the full conversation history as `[{ role: "user"|"assistant", content }]`
- `streaming` — boolean, true while the SSE stream is open
- `sendMessage(content)` — appends the user message, adds an empty assistant placeholder, then opens a `fetch` stream to `POST /api/chat` with the full message history. Reads the SSE stream token by token, appending each token to the last message in state. Handles `[DONE]` and `[ERROR]` sentinel values and swallows `AbortError` silently.
- `clear()` — aborts any active stream and resets messages to an empty array

The fetch uses `credentials: "include"` so the session cookie is sent. The API endpoint (`VITE_API_URL/api/chat`) searches Elasticsearch for the most relevant records and sends them as context to the Groq LLM before streaming the reply.

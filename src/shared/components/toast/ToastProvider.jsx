import { createContext, useCallback, useContext, useState } from "react"
import ToastContainer from "./ToastContainer.jsx"

const ToastContext = createContext(null)

let nextId = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const [notifications, setNotifications] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const add = useCallback(
    (message, type) => {
      const id = nextId++
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => dismiss(id), 3500)

      // Also persist to session notification list, newest first
      setNotifications((prev) => [
        { id, message, type, read: false, timestamp: Date.now() },
        ...prev,
      ])
    },
    [dismiss],
  )

  const success = useCallback((message) => add(message, "success"), [add])
  const error = useCallback((message) => add(message, "error"), [add])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const dismissNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  return (
    <ToastContext.Provider
      value={{
        success,
        error,
        notifications,
        unreadCount,
        markAllRead,
        dismissNotification,
        clearAllNotifications,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>")
  }
  return ctx
}

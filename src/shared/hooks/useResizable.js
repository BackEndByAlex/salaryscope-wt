import { useState, useCallback } from "react"

/**
 * Drag-to-resize hook.
 *
 * direction: "right"  → dragging right grows the element (left sidebar)
 * direction: "left"   → dragging left grows the element (right sidebar)
 */
export function useResizable({ defaultWidth, min = 140, max = 600, direction = "right" }) {
  const [width, setWidth] = useState(defaultWidth)

  const handlePointerDown = useCallback(
    (e) => {
      e.preventDefault()
      const startX = e.clientX
      const startW = width

      const onMove = (ev) => {
        const delta =
          direction === "right" ? ev.clientX - startX : startX - ev.clientX
        setWidth(Math.min(max, Math.max(min, startW + delta)))
      }

      const onUp = () => {
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("pointerup", onUp)
      }

      window.addEventListener("pointermove", onMove)
      window.addEventListener("pointerup", onUp)
    },
    [width, direction, min, max],
  )

  return { width, handlePointerDown }
}

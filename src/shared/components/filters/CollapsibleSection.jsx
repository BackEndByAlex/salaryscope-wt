import { useId, useState } from "react"

export default function CollapsibleSection({ label, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  const regionId = useId()

  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={regionId}
        className="w-full flex items-center justify-between px-3 py-3 group"
        style={{ borderLeft: "3px solid #00bcd4" }}
      >
        <span
          className="text-[0.6rem] uppercase tracking-widest font-bold"
          style={{ color: "rgba(173,170,170,0.6)" }}
        >
          {label}
        </span>
        <span
          className="material-symbols-outlined text-sm transition-transform duration-200"
          style={{
            color: "rgba(173,170,170,0.4)",
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
          }}
        >
          expand_more
        </span>
      </button>

      <div
        id={regionId}
        style={{
          maxHeight: open ? "500px" : "0px",
          overflow: "hidden",
          transition: "max-height 200ms ease",
        }}
      >
        <div className="pb-2">{children}</div>
      </div>
    </div>
  )
}

import { useRef } from "react"
import { formatSalaryAmount } from "../../utils/salary.js"

export default function SalaryRangeSlider({ dataMin, dataMax, lo, hi, onChange }) {
  const trackRef = useRef(null)

  const span = dataMax - dataMin || 1
  const loPct = ((lo - dataMin) / span) * 100
  const hiPct = ((hi - dataMin) / span) * 100

  function valFromClientX(clientX) {
    const rect = trackRef.current.getBoundingClientRect()
    const pct = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    )
    const raw = dataMin + (pct / 100) * span
    return Math.round(raw / 1000) * 1000
  }

  function makeThumbHandler(thumb) {
    return (e) => {
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)
      const capturedLo = lo
      const capturedHi = hi

      function onMove(ev) {
        const val = Math.min(
          dataMax,
          Math.max(dataMin, valFromClientX(ev.clientX)),
        )
        if (thumb === "lo") onChange([Math.min(val, capturedHi), capturedHi])
        else onChange([capturedLo, Math.max(val, capturedLo)])
      }

      e.currentTarget.addEventListener("pointermove", onMove)
      e.currentTarget.addEventListener(
        "pointerup",
        () => {
          e.currentTarget.removeEventListener("pointermove", onMove)
        },
        { once: true },
      )
    }
  }

  return (
    <div className="px-3 pb-3">
      <div className="flex justify-between mb-2.5">
        <span
          className="text-[0.6rem] tabular-nums font-bold"
          style={{ color: "#2563eb" }}
        >
          {formatSalaryAmount(lo)}
        </span>
        <span
          className="text-[0.6rem] uppercase tracking-widest"
          style={{ color: "rgba(173,170,170,0.4)" }}
        >
          salary range
        </span>
        <span
          className="text-[0.6rem] tabular-nums font-bold"
          style={{ color: "#2563eb" }}
        >
          {formatSalaryAmount(hi)}
        </span>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative mx-1.5"
        style={{
          height: "4px",
          borderRadius: "2px",
          background: "rgba(255,255,255,0.08)",
        }}
      >
        {/* Active fill */}
        <div
          className="absolute inset-y-0 rounded-full pointer-events-none"
          style={{
            left: `${loPct}%`,
            right: `${100 - hiPct}%`,
            background: "#2563eb",
          }}
        />

        {/* Low thumb */}
        <div
          onPointerDown={makeThumbHandler("lo")}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full"
          style={{
            left: `${loPct}%`,
            width: 12,
            height: 12,
            background: "#ffffff",
            border: "2px solid #2563eb",
            cursor: "grab",
            zIndex: loPct > 90 ? 4 : 3,
            touchAction: "none",
          }}
        />

        {/* High thumb */}
        <div
          onPointerDown={makeThumbHandler("hi")}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full"
          style={{
            left: `${hiPct}%`,
            width: 12,
            height: 12,
            background: "#ffffff",
            border: "2px solid #2563eb",
            cursor: "grab",
            zIndex: loPct > 90 ? 3 : 4,
            touchAction: "none",
          }}
        />
      </div>
    </div>
  )
}

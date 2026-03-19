export default function Logo({
  size = 32,
  glow = true,
  variant = "mark",
  className = "",
}) {
  const filterId = "salaryscope-glow"

  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SalaryScope logo"
      style={
        glow
          ? { filter: `drop-shadow(0 0 6px rgba(129,236,255,0.55))` }
          : undefined
      }
    >
      {/* ── Corner bracket — top-left ── */}
      <path
        d="M4 11 L4 4 L11 4"
        stroke="#81ecff"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      {/* ── Corner bracket — top-right ── */}
      <path
        d="M29 4 L36 4 L36 11"
        stroke="#81ecff"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      {/* ── Corner bracket — bottom-left ── */}
      <path
        d="M4 29 L4 36 L11 36"
        stroke="#81ecff"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      {/* ── Corner bracket — bottom-right ── */}
      <path
        d="M29 36 L36 36 L36 29"
        stroke="#81ecff"
        strokeWidth="1.5"
        strokeLinecap="square"
      />

      {/* ── Data bars (ascending left→right) ── */}
      {/* Bar 1 — shortest */}
      <rect x="11" y="22" width="4" height="9" fill="#81ecff" opacity="0.45" />
      {/* Bar 2 — medium */}
      <rect x="18" y="16" width="4" height="15" fill="#81ecff" opacity="0.70" />
      {/* Bar 3 — tallest */}
      <rect x="25" y="10" width="4" height="21" fill="#81ecff" />

      {/* ── Horizontal scan line ── */}
      <line
        x1="8"
        y1="21"
        x2="32"
        y2="21"
        stroke="#81ecff"
        strokeWidth="0.75"
        strokeOpacity="0.35"
        strokeDasharray="2 2"
      />

      {/* ── Center tick marks (left & right sides) ── */}
      <line
        x1="4"
        y1="20"
        x2="7"
        y2="20"
        stroke="#81ecff"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <line
        x1="33"
        y1="20"
        x2="36"
        y2="20"
        stroke="#81ecff"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
    </svg>
  )

  if (variant === "wordmark") {
    return (
      <span
        className={`inline-flex items-center gap-2.5 ${className}`}
        aria-label="SalaryScope"
      >
        {mark}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: size * 0.625,
            letterSpacing: "-0.04em",
            color: "#81ecff",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          SalaryScope
        </span>
      </span>
    )
  }

  return <span className={`inline-flex ${className}`}>{mark}</span>
}

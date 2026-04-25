export default function OptionsSkeleton({ rows = 3 }) {
  return (
    <div className="px-3 py-1 space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded-sm animate-pulse"
          style={{
            width: `${55 + (i % 3) * 15}%`,
            background: "rgba(255,255,255,0.06)",
          }}
        />
      ))}
    </div>
  )
}

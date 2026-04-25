export function formatSalaryRecord(record) {
  if (record.salaryInUsd != null) {
    const usd = record.salaryInUsd
    if (usd >= 1000) return `$${Math.round(usd / 1000)}k`
    return `$${usd}`
  }
  if (record.salary != null) {
    const amt = record.salary
    const cur = record.salaryCurrency ?? ""
    if (amt >= 1000) return `${Math.round(amt / 1000)}k ${cur}`.trim()
    return `${amt} ${cur}`.trim()
  }
  return "—"
}

export function formatSalaryAmount(amount) {
  if (amount == null) return "—"
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1000) return `$${Math.round(amount / 1000)}k`
  return `$${amount}`
}

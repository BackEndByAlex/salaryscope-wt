/**
 * UserRecords — displays the authenticated user's submitted salary records.
 * Currently shows an empty state; will be populated from the API.
 */
export default function UserRecords() {
  const records = []

  return (
    <div className="bg-surface-container p-6">
      <p className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant mb-6">
        Salary Records
      </p>

      {records.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <span
            className="material-symbols-outlined text-on-surface-variant/30"
            style={{ fontSize: "3rem" }}
          >
            database
          </span>
          <div className="text-center space-y-1">
            <p className="text-sm text-on-surface-variant font-medium">
              No records yet.
            </p>
            <p className="text-[0.6875rem] text-on-surface-variant/50 tracking-wide">
              Salary data you submit will appear here.
            </p>
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {records.map((record) => (
            <li
              key={record.id}
              className="flex items-center justify-between px-4 py-3 bg-surface-container-high border border-outline-variant/15"
            >
              <div>
                <p className="text-sm font-medium text-on-surface">
                  {record.title}
                </p>
                <p className="text-[0.6875rem] text-on-surface-variant uppercase tracking-widest mt-0.5">
                  {record.date}
                </p>
              </div>
              <span className="text-primary font-black text-sm">
                {record.salary}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

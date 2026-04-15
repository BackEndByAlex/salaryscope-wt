import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client/react"
import { ME_WITH_RECORDS_QUERY } from "../../graphql/queries/auth.js"
import { DELETE_SALARY_RECORD } from "../../graphql/mutation/salaryRecords.js"
import EditRecordModal from "../dashboard/EditRecordModal.jsx"

function formatSalary(record) {
  const amount = record.salaryInUsd ?? record.salary
  if (amount == null) return "—"
  const currency = record.salaryInUsd != null ? "USD" : (record.salaryCurrency ?? "")
  const formatted = amount >= 1000 ? `${Math.round(amount / 1000)}k` : String(amount)
  return currency ? `${formatted} ${currency}` : formatted
}

export default function UserRecords() {
  const { data, loading } = useQuery(ME_WITH_RECORDS_QUERY, {
    fetchPolicy: "network-only",
  })
  const [deleteRecord] = useMutation(DELETE_SALARY_RECORD, {
    refetchQueries: [{ query: ME_WITH_RECORDS_QUERY }],
  })

  const [editingRecord, setEditingRecord] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const records = data?.me?.salaryRecords ?? []

  async function handleDelete(id) {
    await deleteRecord({ variables: { id } })
    setConfirmDeleteId(null)
  }

  return (
    <div className="bg-surface-container p-6">
      <p className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant mb-6">
        Salary Records
      </p>

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="text-on-surface-variant/50 text-sm">Loading…</span>
        </div>
      ) : records.length === 0 ? (
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
        <ul className="space-y-2">
          {records.map((record) => (
            <li
              key={record.id}
              className="flex items-center justify-between px-4 py-3 bg-surface-container-high border border-outline-variant/15"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-on-surface truncate">
                  {record.job?.title ?? "Unknown Role"}
                </p>
                <p className="text-[0.6875rem] text-on-surface-variant uppercase tracking-widest mt-0.5">
                  {[record.city?.name, record.employeeCountry?.name]
                    .filter(Boolean)
                    .join(", ") || "—"}
                  {record.workYear ? ` · ${record.workYear}` : ""}
                  {record.experienceLevel ? ` · ${record.experienceLevel}` : ""}
                  {record.workSetting ? ` · ${record.workSetting}` : ""}
                </p>
              </div>

              <div className="flex items-center gap-3 ml-4 shrink-0">
                <span className="text-primary font-black text-sm">
                  {formatSalary(record)}
                </span>

                {confirmDeleteId === record.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="text-[0.6875rem] uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingRecord(record)}
                      className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(record.id)}
                      className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {editingRecord && (
        <EditRecordModal
          record={editingRecord}
          onClose={() => setEditingRecord(null)}
          onUpdated={() => setEditingRecord(null)}
        />
      )}
    </div>
  )
}

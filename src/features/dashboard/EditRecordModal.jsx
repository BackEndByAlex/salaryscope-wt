import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { UPDATE_SALARY_RECORD } from "../../graphql/mutation/salaryRecords.js"
import { ME_WITH_RECORDS_QUERY } from "../../graphql/queries/auth.js"
import { useToast } from "../../shared/components/toast/ToastProvider.jsx"
import ModalShell from "../../shared/components/form/ModalShell.jsx"
import ReadOnlyField from "../../shared/components/form/ReadOnlyField.jsx"
import SalaryRecordFields from "../../shared/components/form/SalaryRecordFields.jsx"

export default function EditRecordModal({ record, onClose, onUpdated }) {
  const toast = useToast()

  const [form, setForm] = useState({
    salary: String(record.salary ?? ""),
    currency: record.salaryCurrency ?? "USD",
    experienceLevel: record.experienceLevel ?? "MI",
    employmentType: record.employmentType ?? "FT",
    workSetting: record.workSetting ?? "Remote",
    companySize: record.companySize ?? "M",
    workYear: String(record.workYear ?? new Date().getFullYear()),
  })

  const [update, { loading }] = useMutation(UPDATE_SALARY_RECORD, {
    refetchQueries: [{ query: ME_WITH_RECORDS_QUERY }],
    onCompleted: () => {
      toast.success("Record updated")
      onUpdated()
    },
    onError: (err) => toast.error(err.message),
  })

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await update({
      variables: {
        id: record.id,
        input: {
          salary: parseFloat(form.salary),
          salaryCurrency: form.currency,
          workYear: parseInt(form.workYear),
          experienceLevel: form.experienceLevel,
          employmentType: form.employmentType,
          workSetting: form.workSetting,
          companySize: form.companySize,
        },
      },
    })
  }

  return (
    <ModalShell title="Edit Salary Record" onClose={onClose}>
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <ReadOnlyField
            label="Country"
            value={record.employeeCountry?.name ?? "—"}
          />
          <ReadOnlyField label="City" value={record.city?.name ?? "—"} />
        </div>

        <ReadOnlyField label="Job Title" value={record.job?.title ?? "—"} />

        <SalaryRecordFields form={form} set={set} />

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-sm border border-outline-variant/30 text-on-surface-variant text-sm hover:bg-surface-container-highest transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 rounded-sm bg-primary text-on-primary text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </ModalShell>
  )
}

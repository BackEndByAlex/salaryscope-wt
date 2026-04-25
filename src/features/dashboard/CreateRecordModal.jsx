import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { CREATE_SALARY_RECORD } from "../../graphql/mutation/salaryRecords.js"
import { ME_WITH_RECORDS_QUERY } from "../../graphql/queries/auth.js"
import { useToast } from "../../shared/components/toast/ToastProvider.jsx"
import ModalShell from "../../shared/components/form/ModalShell.jsx"
import FormField from "../../shared/components/form/FormField.jsx"
import SelectField from "../../shared/components/form/SelectField.jsx"
import ReadOnlyField from "../../shared/components/form/ReadOnlyField.jsx"
import {
  EXPERIENCE_OPTIONS,
  EMPLOYMENT_OPTIONS,
  WORK_SETTING_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  CURRENCY_OPTIONS,
} from "../../shared/components/form/formOptions.js"

const CURRENT_YEAR = new Date().getFullYear()

export default function CreateRecordModal({
  countryName,
  countryId,
  initialCity = "",
  onClose,
  onCreated,
}) {
  const toast = useToast()

  const [form, setForm] = useState({
    city: initialCity,
    jobTitle: "",
    salary: "",
    currency: "USD",
    experienceLevel: "MI",
    employmentType: "FT",
    workSetting: "Remote",
    companySize: "M",
    workYear: String(CURRENT_YEAR),
  })

  const [create, { loading }] = useMutation(CREATE_SALARY_RECORD, {
    refetchQueries: [{ query: ME_WITH_RECORDS_QUERY }],
    onCompleted: () => {
      toast.success("Salary record added")
      onCreated()
    },
    onError: (err) => toast.error(err.message),
  })

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await create({
      variables: {
        input: {
          salary: parseFloat(form.salary),
          source: "user_submitted",
          salaryCurrency: form.currency,
          workYear: parseInt(form.workYear),
          experienceLevel: form.experienceLevel,
          employmentType: form.employmentType,
          workSetting: form.workSetting,
          companySize: form.companySize,
          jobTitle: form.jobTitle,
          cityName: form.city || undefined,
          employeeCountryId: countryId || undefined,
        },
      },
    })
  }

  return (
    <ModalShell title="Add Salary Record" onClose={onClose}>
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
        <ReadOnlyField label="Country" value={countryName} />

        <FormField
          label="City (optional)"
          placeholder="e.g. Kalmar"
          value={form.city}
          onChange={(e) => set("city", e.target.value)}
        />
        <FormField
          label="Job Title"
          placeholder="e.g. Data Engineer"
          value={form.jobTitle}
          onChange={(e) => set("jobTitle", e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            label="Salary"
            type="number"
            placeholder="e.g. 85000"
            value={form.salary}
            onChange={(e) => set("salary", e.target.value)}
            required
          />
          <SelectField
            label="Currency"
            value={form.currency}
            onChange={(e) => set("currency", e.target.value)}
          >
            {CURRENCY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SelectField
            label="Experience Level"
            value={form.experienceLevel}
            onChange={(e) => set("experienceLevel", e.target.value)}
          >
            {EXPERIENCE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="Employment Type"
            value={form.employmentType}
            onChange={(e) => set("employmentType", e.target.value)}
          >
            {EMPLOYMENT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </SelectField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SelectField
            label="Work Setting"
            value={form.workSetting}
            onChange={(e) => set("workSetting", e.target.value)}
          >
            {WORK_SETTING_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="Company Size"
            value={form.companySize}
            onChange={(e) => set("companySize", e.target.value)}
          >
            {COMPANY_SIZE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </SelectField>
        </div>

        <FormField
          label="Work Year"
          type="number"
          value={form.workYear}
          onChange={(e) => set("workYear", e.target.value)}
          required
        />

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
            {loading ? "Saving…" : "Add Record"}
          </button>
        </div>
      </form>
    </ModalShell>
  )
}

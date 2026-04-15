import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { CREATE_SALARY_RECORD } from "../../graphql/mutation/salaryRecords.js"
import { ME_WITH_RECORDS_QUERY } from "../../graphql/queries/auth.js"

const CURRENT_YEAR = new Date().getFullYear()

const EXPERIENCE_OPTIONS = [
  { value: "EN", label: "Entry-level" },
  { value: "MI", label: "Mid-level" },
  { value: "SE", label: "Senior" },
  { value: "EX", label: "Executive" },
]

const EMPLOYMENT_OPTIONS = [
  { value: "FT", label: "Full-time" },
  { value: "PT", label: "Part-time" },
  { value: "CT", label: "Contract" },
  { value: "FL", label: "Freelance" },
]

const WORK_SETTING_OPTIONS = ["Remote", "Hybrid", "In-person"]
const COMPANY_SIZE_OPTIONS = [
  { value: "S", label: "Small" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Large" },
]
const CURRENCY_OPTIONS = ["USD", "EUR", "GBP", "SEK"]

export default function CreateRecordModal({
  countryName,
  countryId,
  initialCity = "",
  onClose,
  onCreated,
}) {
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

  const [create, { loading, error }] = useMutation(CREATE_SALARY_RECORD, {
    refetchQueries: [{ query: ME_WITH_RECORDS_QUERY }],
    onCompleted: () => onCreated(),
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-container border border-outline-variant/20 rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20">
          <h2 className="text-base font-semibold text-on-surface">
            Add Salary Record
          </h2>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
              Country
            </label>
            <div className="bg-surface-container-lowest border border-outline-variant/20 py-3.5 px-4 rounded-sm text-sm text-on-surface-variant">
              {countryName}
            </div>
          </div>

          <Field
            label="City (optional)"
            placeholder="e.g. Kalmar"
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
          />
          <Field
            label="Job Title"
            placeholder="e.g. Data Engineer"
            value={form.jobTitle}
            onChange={(e) => set("jobTitle", e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Field
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

          <Field
            label="Work Year"
            type="number"
            value={form.workYear}
            onChange={(e) => set("workYear", e.target.value)}
            required
          />

          {error && <p className="text-red-400 text-sm">{error.message}</p>}

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
      </div>
    </div>
  )
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/30 py-3.5 px-4 rounded-sm text-sm w-full outline-none transition-all"
      />
    </div>
  )
}

function SelectField({ label, value, onChange, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:ring-1 focus:ring-primary text-on-surface py-3.5 px-4 rounded-sm text-sm w-full outline-none transition-all"
      >
        {children}
      </select>
    </div>
  )
}

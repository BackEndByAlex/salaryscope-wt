import FormField from "./FormField.jsx"
import SelectField from "./SelectField.jsx"
import {
  EXPERIENCE_OPTIONS,
  EMPLOYMENT_OPTIONS,
  WORK_SETTING_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  CURRENCY_OPTIONS,
} from "./formOptions.js"

export default function SalaryRecordFields({ form, set }) {
  return (
    <>
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
    </>
  )
}

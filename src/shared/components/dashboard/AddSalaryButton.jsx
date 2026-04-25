export default function AddSalaryButton({ isAddMode, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`absolute bottom-6 left-3 md:left-auto md:right-20 z-10 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all shadow-lg ${
        isAddMode
          ? "bg-primary text-on-primary"
          : "bg-surface-container border border-outline-variant/30 text-on-surface hover:bg-surface-container-high"
      }`}
    >
      <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>
        {isAddMode ? "close" : "add"}
      </span>
      {isAddMode ? "Cancel" : "Add Salary"}
    </button>
  )
}

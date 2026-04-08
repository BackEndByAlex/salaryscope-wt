import StatBar from "../ui/StatBar.jsx"
import SidebarSection from "./SidebarSection.jsx"

export default function SidebarStats({ data, loading }) {
  const total = data?.total?.totalCount ?? 0

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-10">
        <span className="material-symbols-outlined animate-spin text-on-surface-variant/40 text-3xl">
          progress_activity
        </span>
      </div>
    )
  }

  return (
    <>
      <div className="px-5 py-4 border-b border-outline-variant/15">
        <div className="text-3xl font-black tracking-tighter text-on-surface">
          {total.toLocaleString()}
        </div>
        <div className="text-xs text-on-surface-variant mt-0.5">
          salary records
        </div>
      </div>

      <SidebarSection label="Experience Level">
        <StatBar
          label="Senior (SE)"
          value={data?.senior?.totalCount}
          total={total}
          color="#81ecff"
        />
        <StatBar
          label="Mid-level (MI)"
          value={data?.mid?.totalCount}
          total={total}
          color="#81ecffaa"
        />
        <StatBar
          label="Entry (EN)"
          value={data?.entry?.totalCount}
          total={total}
          color="#81ecff66"
        />
        <StatBar
          label="Executive (EX)"
          value={data?.executive?.totalCount}
          total={total}
          color="#81ecff33"
        />
      </SidebarSection>

      <SidebarSection label="Work Setting">
        <StatBar
          label="Remote"
          value={data?.remote?.totalCount}
          total={total}
          color="#c3f400"
        />
        <StatBar
          label="Hybrid"
          value={data?.hybrid?.totalCount}
          total={total}
          color="#c3f40088"
        />
        <StatBar
          label="In-person"
          value={data?.inPerson?.totalCount}
          total={total}
          color="#c3f40044"
        />
      </SidebarSection>
    </>
  )
}

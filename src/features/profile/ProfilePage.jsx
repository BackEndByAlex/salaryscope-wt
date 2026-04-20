import { useQuery } from "@apollo/client/react"
import LandingNav from "../../shared/components/navigation/LandingNav.jsx"
import AppFooter from "../../shared/components/layout/AppFooter.jsx"
import ProfileSidebar from "../../shared/components/profile/ProfileSidebar.jsx"
import IdentityNodeCard from "../../shared/components/profile/IdentityNodeCard.jsx"
import ConnectedProtocolsCard from "../../shared/components/profile/ConnectedProtocolsCard.jsx"
import UserRecords from "./UserRecords.jsx"
import DeleteAccountCard from "../../shared/components/profile/DeleteAccountCard.jsx"
import { ME_WITH_RECORDS_QUERY } from "../../graphql/queries/auth.js"

const FOOTER_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Docs", href: "#" },
]

export default function ProfilePage() {
  const { data, loading } = useQuery(ME_WITH_RECORDS_QUERY, { fetchPolicy: "network-only" })
  const user = data?.me ?? null
  const recordCount = data?.me?.salaryRecords?.length ?? 0

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <LandingNav />

      <main className="flex-1 flex gap-6 px-6 pt-28 pb-12 max-w-6xl mx-auto w-full">
        <ProfileSidebar user={user} loading={loading} recordCount={recordCount} />

        <div className="flex-1 space-y-6 min-w-0">
          <IdentityNodeCard user={user} loading={loading} />
          <ConnectedProtocolsCard user={user} loading={loading} />
          <UserRecords />
          <DeleteAccountCard />
        </div>
      </main>

      <AppFooter links={FOOTER_LINKS} />
    </div>
  )
}

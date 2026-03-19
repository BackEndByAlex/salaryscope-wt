import LandingNav from "../../shared/components/navigation/LandingNav.jsx"
import AppFooter from "../../shared/components/layout/AppFooter.jsx"
import ProfileSidebar from "../../shared/components/profile/ProfileSidebar.jsx"
import IdentityNodeCard from "../../shared/components/profile/IdentityNodeCard.jsx"
import ConnectedProtocolsCard from "../../shared/components/profile/ConnectedProtocolsCard.jsx"
import UserRecords from "./UserRecords.jsx"

const FOOTER_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Docs", href: "#" },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <LandingNav />

      <main className="flex-1 flex gap-6 px-6 pt-28 pb-12 max-w-6xl mx-auto w-full">
        <ProfileSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <IdentityNodeCard />
          <ConnectedProtocolsCard />
          <UserRecords />
        </div>
      </main>

      <AppFooter links={FOOTER_LINKS} />
    </div>
  )
}

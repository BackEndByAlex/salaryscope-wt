import LandingNav from "../../shared/components/navigation/LandingNav.jsx"
import HeroContent from "../../shared/components/sections/HeroContent.jsx"
import StatsSection from "../../shared/components/sections/StatsSection.jsx"
import FeaturesSection from "../../shared/components/sections/FeaturesSection.jsx"
import CtaSection from "../../shared/components/sections/CtaSection.jsx"
import AppFooter from "../../shared/components/layout/AppFooter.jsx"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans">
      <LandingNav />
      <main className="pt-16">
        <HeroContent />
        <StatsSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <AppFooter
        py="py-8"
        links={[
          { label: "Gitlab Source", href: "#" },
          { label: "WT Docs", href: "/wt-docs" },
          { label: "API Docs", href: `${import.meta.env.VITE_API_URL}/api-docs` },
          { label: "Apollo", href: import.meta.env.VITE_GRAPHQL_URL },
        ]}
      />
    </div>
  )
}

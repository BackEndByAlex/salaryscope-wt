---
sidebar_position: 5
sidebar_label: Landing Page
---

# landing/

The public home page. Minimal logic — mostly composition and navigation entry points.

---

## LandingPage.jsx

Composes the page from section components. No data fetching at this level — each section component handles its own if needed.

```
LandingPage
  ├── LandingNav          (shared/components/navigation)
  ├── HeroSection         (features/landing)
  ├── StatsSection        (shared/components/sections)
  ├── FeaturesSection     (shared/components/sections)
  └── CtaSection          (shared/components/sections)
```

---

## HeroSection.jsx

The above-the-fold view. Contains the headline, subtitle, and the two primary CTAs:

- **Explore the Data** → `/dashboard`
- **View Analytics** → `/analytics`

Also renders the animated globe or visual element that anchors the hero visually.

---

## Shared section components

The remaining sections live in `shared/components/sections/` because other parts of the app may reuse them:

**`StatsSection`** — three or four key numbers about the dataset (record count, countries covered, etc.).

**`FeaturesSection`** — feature highlights describing what the app lets you do.

**`CtaSection`** — bottom call-to-action prompting sign-up or navigation to the dashboard.

**`HeroContent`** — the text block and button group inside the hero area (used by `HeroSection`).

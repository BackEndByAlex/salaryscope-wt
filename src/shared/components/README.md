# components/

Reusable UI components used across two or more features.

---

## Sub-folders with their own READMEs

**[`auth/`](./auth/README.md)** — form layout primitives for the login and register pages: `AuthLayout`, `AuthHeader`, `AuthFormField`, and `OAuthButtons`.

**[`charts/`](./charts/README.md)** — data visualization components for the analytics page: bar charts, stat grids, and the experience/work-setting breakdown panels.

**[`sidebar/`](./sidebar/README.md)** — the dashboard right-panel components: `SalaryList`, `SalaryRow`, `SidebarStats`, and `SidebarSection`.

---

## Single-file folders

These are small enough that a README would be longer than the file itself:

```
icons/
  GoogleIcon.jsx     SVG icon for the Google OAuth button
  GitHubIcon.jsx     SVG icon for the GitHub OAuth button

layout/
  AppFooter.jsx      Shared footer used on the profile page

map/
  GlobeMap.jsx       MapLibre GL canvas — renders the globe, places dot layers,
                     wires click events to the handlers from useGlobeData

navigation/
  LandingNav.jsx     Top navigation bar — logo, links, user menu
  UserMenu.jsx       Dropdown for logged-in users — profile link and logout

profile/
  ProfileSidebar.jsx        Avatar, name, and email summary panel
  IdentityNodeCard.jsx      Email, account ID, created date
  ConnectedProtocolsCard.jsx  Shows which OAuth providers are linked (Google / GitHub)

sections/
  HeroContent.jsx     Text and CTA buttons inside the hero area
  StatsSection.jsx    Key numbers about the dataset
  FeaturesSection.jsx Feature highlights
  CtaSection.jsx      Bottom call-to-action

ui/
  StatBar.jsx         Single horizontal stat bar — label + filled bar + count

Logo.jsx              The SalaryScope wordmark
```

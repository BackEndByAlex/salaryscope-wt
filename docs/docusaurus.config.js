import { themes as prismThemes } from "prism-react-renderer"

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "SalaryScope Dashboard",
  tagline: "Frontend Documentation",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://cu0080.camp.lnu.se",
  baseUrl: "/wt-docs/",

  onBrokenLinks: "warn",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "SalaryScope Dashboard",
        items: [
          {
            type: "docSidebar",
            sidebarId: "apiSidebar",
            position: "left",
            label: "Documentation",
          },
          {
            href: "https://cu0080.camp.lnu.se/graphql",
            label: "GraphQL API",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Overview",
                to: "/",
              },
            ],
          },
          {
            title: "API",
            items: [
              {
                label: "GraphQL Playground",
                href: "https://cu0080.camp.lnu.se/graphql",
              },
            ],
          },
        ],
        copyright: "SalaryScope Dashboard Documentation",
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
}

export default config

---
sidebar_position: 1
sidebar_label: Overview
slug: /
---

# Assignment WT - Web for Data Science

## Project Name

SalaryScope Dashboard

## Objective

Create a functional, visually engaging, and _interactive_ data visualization web application that consumes the API you built in the previous assignment. The application must authenticate users via OAuth and be publicly accessible.

SalaryScope Dashboard is a React SPA that visualizes ~137,000 global salary records on an interactive 3D globe. Users can explore salary data by country and city, filter by experience level, work setting, employment type, and more. Authenticated users can submit their own salary records.

## Deployed Application

> URL: ...

## Requirements

Requirements are tracked as GitHub Issues in the repository.

### Functional Requirements

| Requirement                                                                        | Status               |
| ---------------------------------------------------------------------------------- | -------------------- |
| API Integration — the app consumes your WT1 API                                    | :white_large_square: |
| OAuth Authentication — users log in via OAuth 2.0                                  | :white_large_square: |
| Interactive data visualization with aggregation/adaptation for 10 000+ data points | :white_large_square: |
| Efficient loading — pagination, lazy loading, loading indicators                   | :white_large_square: |

### Non-Functional Requirements

| Requirement                                   | Status               |
| --------------------------------------------- | -------------------- |
| Clear and well-structured code                | :white_large_square: |
| Code reuse                                    | :white_large_square: |
| Dependency management and scripts             | :white_large_square: |
| Source code documentation                     | :white_large_square: |
| Coding standard                               | :white_large_square: |
| Examiner can follow the creation process      | :white_large_square: |
| Publicly accessible over the internet         | :white_large_square: |
| Keys and tokens handled correctly             | :white_large_square: |
| Complete assignment report with correct links | :white_large_square: |

### VG — AI/ML Feature (optional)

For a VG grade, integrate **one** AI/ML feature into the application.

| Option                                                        | Status               |
| ------------------------------------------------------------- | -------------------- |
| Semantic Search — natural language queries matched by meaning | :white_large_square: |
| Content-Based Recommendations — "items similar to this one"   | :white_large_square: |
| Clustering & Grouping — auto-group similar items visually     | :white_large_square: |

## Architecture

![App Architecture](/img/diagrams/01-app-architecture.svg)

## Core Technologies Used

| Layer              | Choice                           |
| ------------------ | -------------------------------- |
| **Framework**      | React 19 + Vite                  |
| **GraphQL Client** | Apollo Client                    |
| **Routing**        | React Router v7                  |
| **Map / Globe**    | MapLibre GL JS + deck.gl         |
| **Charts**         | Recharts                         |
| **Styling**        | Tailwind CSS v4 + shadcn/ui      |
| **Auth**           | OAuth 2.0 PKCE (GitHub + Google) |

## How to Use

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173` in your browser.

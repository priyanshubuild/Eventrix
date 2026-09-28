# Eventrix

> A responsive event-management web application for college clubs.

Eventrix was designed for the **CodeChef ABESEC Chapter Recruitment 2026–27** development task.

**Live site:** [eventrix.priyanshugupta.com](https://eventrix.priyanshugupta.com/) It gives students an elegant way to discover and register for campus events, while giving organisers a separate, focused workspace to manage events and view registrations.

## Live routes

| Route | Purpose |
| --- | --- |
| `/` | Student home page with club introduction, featured event and upcoming-event preview |
| `/events` | Dedicated event directory with full search, category filtering and registration |
| `/admin` | Standalone organiser workspace for event and registration management |

## Features

### Student experience

- Club introduction and campus activity overview
- Highlighted featured event and curated upcoming-events preview
- Dedicated event directory with name search and category filters
- Responsive event cards with date, time, venue, description and registration action
- Registration form collecting name, email, college/year and phone number
- Clear confirmation feedback after registration

### Admin workspace

- Separate `/admin` route—not embedded in the public site
- Create, edit and delete events
- View all registered students
- Search registrations and filter them by event
- Responsive dashboard layout for desktop and mobile

## Important demo note

This project intentionally uses browser `localStorage` for events and registrations. It is a polished recruitment-task demo, so the admin workspace is directly accessible at `/admin` and does **not** claim to provide secure production authentication. Data stays in the current browser until its storage is cleared.

For a real college deployment, the next step would be an authentication provider plus a protected database/API.

## Tech stack

- React 19
- Vite 8
- Custom responsive CSS
- Browser `localStorage` for demo persistence

## Project structure

```text
Eventrix/
├── src/
│   ├── main.jsx       # Routes, UI components and client-side data flows
│   └── styles.css     # Responsive design system and component styling
├── index.html         # Vite entry document
├── package.json       # Application scripts and dependencies
├── vercel.json        # Rewrite rule for direct route visits
└── README.md          # Project documentation
```

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Deploy on Vercel

1. Import the GitHub repository into Vercel.
2. Vercel automatically recognises Vite. If asked, use `npm run build` and `dist`.
3. Deploy. The included `vercel.json` ensures `/events` and `/admin` load correctly on direct visits.
4. Add your custom domain in **Project Settings → Domains**, then enter the CNAME value Vercel gives you in GoDaddy DNS.

## Submission

- GitHub repository: [priyanshubuild/Eventrix](https://github.com/priyanshubuild/Eventrix)
- Live deployment: [eventrix.priyanshugupta.com](https://eventrix.priyanshugupta.com/)

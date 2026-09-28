# Eventrix

> A refined, responsive event-management experience for college clubs.

Eventrix was created for the CodeChef ABESEC Chapter recruitment task. It gives students a clear way to discover club events and register, while offering a polished client-side admin workspace to manage the event calendar and view registrations.

## Highlights

- Discover upcoming club events through a focused student experience
- Search events by title and filter by category
- Register with name, email, college/year and phone number
- Explore a clearly labelled demo admin workspace—no credentials required
- Add, edit and delete events from the admin dashboard
- Search student registrations
- Enjoy a responsive layout designed for desktop and mobile

## Demo admin workspace

The admin area is intentionally a **client-side demo**, not real authentication. Select **Admin demo** in the navigation, then choose **Open demo dashboard**. This lets a reviewer evaluate the requested admin features immediately without an invented username or password.

Event and registration changes are stored in the browser with `localStorage`, so they persist on that device until browser storage is cleared. The demo is not intended to protect sensitive data or serve multiple users.

## Tech stack

- React 19
- Vite 8
- Plain CSS with a responsive, custom design system
- Browser `localStorage` for demo persistence

## Project structure

```text
Eventrix/
├── src/
│   ├── main.jsx       # Application UI, state, event and registration flows
│   └── styles.css     # Responsive visual system and component styles
├── index.html         # Vite HTML entry point
├── package.json       # Scripts and project dependencies
├── vercel.json        # Vercel routing configuration
└── README.md          # Project documentation
```

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create an optimized production build:

```bash
npm run build
```

## Deploy to Vercel

1. Import this GitHub repository into Vercel.
2. Vercel detects Vite automatically. Use `npm run build` and `dist` if values are requested.
3. Deploy the project.
4. To use a custom domain, add it under **Project Settings → Domains**, then add Vercel’s displayed CNAME record to your DNS provider.

## Production note

For a real college deployment, replace the demo workspace and browser storage with an authentication provider and a protected database/API. This keeps student registration data secure and enables shared administration.

## License

Created for the CodeChef ABESEC recruitment task.

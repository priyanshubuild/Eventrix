# Eventrix

Eventrix is a responsive college club event-management app for the CodeChef ABESEC recruitment task.

## What it includes

- Student-facing home page, featured event and searchable/filterable event calendar
- Student registration flow
- Client-side admin sign-in and dashboard
- Admin event creation, editing and deletion
- Searchable registration list
- Browser persistence through `localStorage`

## Local development

```bash
npm install
npm run dev
```

Open the address shown in the terminal.

## Demo admin access

- Email: `admin@eventrix.club`
- Password: `eventrix2026`

This is deliberately client-side demo authentication; it does not claim to be a secure production authentication system. For an actual campus deployment, replace it with a real identity provider and protected API.

## Deploy on Vercel

Import the GitHub repository into Vercel. It automatically detects Vite; use `npm run build` as the build command and `dist` as the output directory.

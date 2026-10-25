# EthioHire

A job discovery and application platform for Ethiopian graduates and early-career seekers. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Auth, jobs, and applications are fully simulated with mock data persisted in the browser (`localStorage`).

## Features

### Job seekers

- Browse and filter job listings
- View job details, requirements, and deadlines
- Sign up / sign in (mock auth)
- Apply with a cover letter
- Track applications from the dashboard

### Administrators

- Dedicated admin dashboard
- Create, edit, and delete job listings
- Review applications and update status

## Test accounts

| Role   | Email                | Password  |
| ------ | -------------------- | --------- |
| Seeker | seeker@ethiohire.com | seeker123 |
| Admin  | admin@ethiohire.com  | admin123  |

You can also register new seeker or admin accounts from **Sign Up**.

## Routes

| Page            | Route                     |
| --------------- | ------------------------- |
| Home            | `/`                       |
| Job listings    | `/jobs`                   |
| Job details     | `/jobs/[id]`              |
| Sign up         | `/sign-up`                |
| Sign in         | `/sign-in`                |
| User dashboard  | `/dashboard`              |
| My applications | `/dashboard/applications` |
| Admin dashboard | `/admin`                  |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Zustand (client state + localStorage persistence)
- Lucide React (icons)
- date-fns

## Notes

- There is **no real database or authentication server**. Everything runs in the client and survives page reloads via `localStorage`.
- Clearing site data resets the demo to the seeded jobs and users.

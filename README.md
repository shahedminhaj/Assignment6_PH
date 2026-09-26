# FitLog

## Description

FitLog is a dark, no-nonsense gym companion built with Next.js. It lets users browse a workout library, view detailed workout pages, and manage a daily plan (up to five lifts) along with a save-for-later list. All state is persisted in localStorage, providing a seamless experience across page reloads.

## Technologies Used

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- DaisyUI
- React Context API
- localStorage
- Next.js Font Optimization (Oswald, Inter)
- FitLog API

## Key Features

1. Workout Library - Browse 12 workouts in a responsive 3-column grid with category tags, equipment, and live stats.
2. Detailed Workout Pages - Each workout has a dedicated page with a hero image, spec table, and step-by-step instructions.
3. Today's Plan (Max 5 Lifts) - Add up to five workouts to a daily plan; exercise count, minutes, and calories update live.
4. Save for Later - Bookmark workouts for future sessions, separated in their own tab on the My Plan page.
5. Mark as Done, Sort, and Remove - Mark workouts complete, sort by duration, calories, or rating, and remove with a single click.
6. Persistent State - Plan, saved, and done lists survive page reloads through localStorage.
7. Fully Responsive - Mobile hamburger menu and adaptive grids across mobile, tablet, and desktop.
8. Toast Notifications - Feedback on every action including add, save, mark done, and remove.
## 30-Day React Interview Prep Roadmap (JobTrackr)

This project is built as a 30-day progression. Each day focuses on 1–2 React concepts, implemented on top of a Job Application Tracker app (**JobTrackr**).

---

### Day 1 – Components, Props & Basic State

- Set up project (Vite + React + TypeScript).
- Create layout: `Header`, `Sidebar`, `JobDashboard`.
- Implement `JobCard` that displays company, role, status, appliedOn, description using props.
- Render a hardcoded list of jobs.

---

### Day 2 – Lifting State & Filtering

- Store job list and selected status in `JobDashboard`.
- Add status filter (`all`, `applied`, `interviewing`, `offer`, `rejected`).
- Filter jobs by status and display filtered list.
- Extract filtering UI into a `JobFilters` component (status dropdown + search bar).

---

### Day 3 – Controlled Forms (Add Job)

- Build an “Add Job” form with controlled inputs.
- Fields: company, role, status, appliedOn, description.
- Simple validation (required fields).
- On submit, add a new job to the list.

---

### Day 4 – Edit Flow & Derived State

- Add “Edit Job” support: reuse the same form for add/edit.
- Decide where source of truth lives (single jobs state in parent).
- Support updating an existing job.
- Avoid duplicated or conflicting state for job data.

---

### Day 5 – `useEffect` & Data Fetching

- Replace hardcoded jobs with a simulated async fetch (e.g. `setTimeout`).
- Use `useEffect` to load jobs on mount.
- Handle loading and error states.
- Add a small “last synced Xs ago” indicator using `useEffect` + cleanup.

---

### Day 6 – Custom Hooks

- Extract job-related logic into a `useJobs` custom hook:
  - Handles loading, error, jobs, add/edit/delete.
- Extract common UI toggles into a small `useToggle` hook.
- Keep `JobDashboard` mostly presentational.

---

### Day 7 – Context API (Avoid Prop Drilling)

- Create `JobsContext` + `JobsProvider` using `useJobs` internally.
- Expose a `useJobsContext` hook.
- Refactor components to read jobs and actions from context instead of props.
- Move filters and list deeper to see context benefits.

---

### Day 8 – Routing (React Router)

- Add routing using `react-router-dom`.
- Routes:
  - `/` → Job dashboard
  - `/job/:id` → Job detail view
  - `/settings` → Placeholder settings page
- `JobCard` links to job detail via URL params.

---

### Day 9 – Performance Basics (`React.memo`, `useCallback`, `useMemo`)

- Split UI into smaller components: `JobList`, `JobStats`, `JobFilters`, etc.
- Use `React.memo` for `JobCard` and/or `JobList`.
- Use `useCallback` for handlers passed to many children.
- Use `useMemo` for derived data (e.g. counts by status).
- Inspect re-renders with React DevTools.

---

### Day 10 – Advanced Forms & Field Arrays

- Extend job form with an “Interview Rounds” array (`date`, `type`, `notes`).
- Add “Add round” / “Remove round” actions.
- Keep form controlled; manage nested state cleanly.
- Extract `InterviewRoundFields` as a subcomponent.

---

### Day 11 – Async Patterns & Client-Side Caching

- Simulate paginated jobs or server-side filters.
- Implement “Load more” or basic pagination.
- Add simple in-memory caching: reuse previous page/filter data when revisiting.
- Differentiate initial loading vs “loading next page”.

---

### Day 12 – Error Boundaries & Lazy Loading

- Create an Error Boundary (class component).
- Wrap main routes with the error boundary.
- Lazily load route components using `React.lazy` + `Suspense`.
- Simulate an error in one route to test the boundary.

---

### Day 13 – Refs, `forwardRef`, `useImperativeHandle`

- Create a `SearchInput` component using `forwardRef`.
- Let the parent focus the search field programmatically (e.g. via keyboard shortcut).
- Use `useRef` to store previous values without causing re-renders.
- Optionally use `useImperativeHandle` to expose methods like `clear()` or `focus()`.

---

### Day 14 – Portals & Accessible Modal

- Implement a reusable `Modal` using `ReactDOM.createPortal`.
- Use it for Add/Edit Job form or job details preview.
- Handle accessibility:
  - `role="dialog"`, `aria-modal="true"`
  - ESC to close, backdrop click to close.
  - Basic focus management.

---

### Day 15 – `useReducer` Store Pattern

- Replace some job context logic with `useReducer`.
- Define actions: `LOAD_SUCCESS`, `ADD_JOB`, `UPDATE_JOB`, `DELETE_JOB`, `SET_FILTER`, etc.
- Keep reducer pure and testable.
- Use TypeScript types for state and actions.

---

### Day 16 – State Machine for Job Status

- Implement a status-transition model (simple state machine):
  - `applied → interviewing → offer/rejected`
- UI: show only valid next statuses in a status update control.
- Prevent invalid transitions via logic instead of UI only.

---

### Day 17 – Large Lists & Virtualization

- Generate a large number of mock jobs (e.g. 1000+).
- Implement a virtualized list using `react-window` or similar.
- Compare performance vs non-virtualized list.

---

### Day 18 – Accessibility & Keyboard Navigation

- Ensure keyboard navigation for filters, search, status dropdowns, and cards.
- Use proper semantics (`button` vs `div`, labels for inputs).
- Add a “skip to content” link.
- Test basic screen reader friendliness.

---

### Day 19 – Testing with React Testing Library

- Set up Jest + React Testing Library.
- Write tests for:
  - Rendering jobs.
  - Filtering by status.
  - Searching by company/role.
  - Add job flow.
- Optionally test error states and loading states.

---

### Day 20 – API Integration & Optimistic Updates

- Replace mock data with a simple backend or mock server (Node/Express/JSON server).
- Load jobs from API.
- Implement optimistic updates for status changes or adds:
  - Update UI immediately.
  - Roll back if the API fails.

---

### Day 21 – Authentication & Protected Routes

- Add a simple login page (fake auth or token-based).
- Store auth state (context or state).
- Create protected routes that redirect unauthenticated users to `/login`.
- Show current user and logout button in header.

---

### Day 22 – Next.js Migration (Basic)

- Create a Next.js version of the app (simplified JobTrackr).
- Implement pages:
  - `/` (dashboard)
  - `/job/[id]`
  - `/login`
- Use server-side or static data fetching for initial job list.
- Understand client vs server components (`"use client"` where needed).

---

### Day 23 – Next.js Data Fetching & API Routes

- Implement a Next.js API route (e.g. `/api/jobs`).
- Fetch jobs through the API route from the page.
- Compare:
  - Fetching on server (SSR/SSG) vs client-side.
- Discuss trade-offs in comments or docs.

---

### Day 24 – Code Splitting & Performance Profiling

- Identify heavy components (e.g. detail view with charts/rich UI).
- Lazy-load those parts using `React.lazy` or `next/dynamic`.
- Profile bundle size and initial load using DevTools or Lighthouse.
- Optimize obvious bottlenecks.

---

### Day 25 – Advanced Forms with React Hook Form or Formik

- Rebuild the Add/Edit Job form with React Hook Form (preferred) or Formik.
- Add validation schema (Zod/Yup or built-in).
- Compare code complexity and performance vs plain controlled components.

---

### Day 26 – Class Components → Hooks Refactor

- Implement a class-based `JobListClass` component with lifecycle methods.
- Then refactor it into a functional component using hooks.
- Document lifecycle → hooks mapping (`componentDidMount` → `useEffect`, etc.).

---

### Day 27 – Kanban View with Drag & Drop

- Implement a Kanban board view for jobs grouped by status columns.
- Use a drag-and-drop library (e.g. `react-beautiful-dnd`).
- Dragging a job between columns updates its status.

---

### Day 28 – Large App Architecture & Folder Structure

- Design a feature-based folder structure for a larger JobTrackr app.
- Separate:
  - features (jobs, auth, settings),
  - shared components,
  - hooks,
  - services (API),
  - store/state management.
- Document choices in a short architecture section in the README.

---

### Day 29 – Debounced Search & (Optional) Infinite Scroll

- Implement debounced search for jobs (e.g. using a `useDebounce` hook).
- Combine debounced search with filters in the UI.
- (Optional) Add infinite scroll or “Load more” behavior for job listing.

---

### Day 30 – Final Refactor & Interview Prep

- Clean up code: remove dead code, fix naming, ensure consistent patterns.
- Write a concise README section explaining:
  - Architecture decisions,
  - Key React concepts used,
  - Trade-offs made.
- Practice explaining 3–5 features of this app as if in a live interview.

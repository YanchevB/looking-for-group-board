# LFG Board

A "looking for group" board for gamers. Players host short gaming sessions (game, platform, open slots, mic or no mic) and other players browse the board, join a session and talk in its comments.

> **Note:** LFG Board is for *finding* a group. It has no voice chat, and nothing in a session links the group to the game itself, so players agree in the comments where to meet (a Discord server, party code or in-game lobby). See [Limitations & Future Ideas](#limitations--future-ideas).

Built with **React 19 + Vite**, **React Router 7** and **Supabase** (Postgres database + Auth) as the backend.

## Live Demo

**Deployed app:** https://looking-for-group-board.vercel.app/

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (required by Vite 8)
- npm (comes with Node.js)
- A Supabase project with the schema described in [Database setup](#database-setup)

### Installation

```bash
git clone <repository-url>
cd looking-for-group-board
npm install
```

### Environment variables

Create a file called `.env.local` in the project root (it is gitignored) with these three keys:

```env
# Supabase project URL, used by the Supabase JS client (auth + all writes)
VITE_AUTH_URL=https://<project-ref>.supabase.co

# Supabase REST endpoint, used by the useFetch hook for reads. Keep the trailing slash.
VITE_BASE_URL=https://<project-ref>.supabase.co/rest/v1/

# Supabase publishable (anon) key
VITE_API_KEY=sb_publishable_...
```

You can find all of them in the Supabase dashboard under **Project Settings → API**: the project URL and the **publishable** key. Never use the `service_role` / secret key here - every `VITE_` variable ends up in the browser bundle. The publishable key is safe to expose because Row Level Security protects the data.

### Run the project

```bash
npm run dev       # start the dev server on http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

### Testing everything locally

To try every feature you need **two accounts** (register them from `/register`):

- **Account A** hosts a session → can edit, close/reopen and delete it.
- **Account B** opens the same session → can join/leave it, comment, and is redirected away from `/edit/<A's session id>`.
- A logged-out browser window (or incognito) shows the guest view.

Supabase setting needed for registration to log the user in straight away: **Authentication → Sign In / Providers → Email → "Confirm email" must be turned off.**

### Database setup

Only needed if you point the app at your own Supabase project. Run this in the Supabase **SQL Editor**:

<details>
<summary>Schema, Row Level Security and signup trigger (SQL)</summary>

```sql
-- Tables ---------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  created_at timestamptz not null default now()
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  game text not null,
  platform text not null,
  slots smallint not null check (slots between 2 and 8),
  mic_required boolean not null default false,
  description text,
  is_closed boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.session_players (
  session_id uuid not null references public.sessions(id) on delete cascade,
  user_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  unique (session_id, user_id)
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  user_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  text text not null,
  created_at timestamptz not null default now()
);

-- Profile row for every new user (username comes from signUp metadata) ---

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', 'user_' || left(new.id::text, 8))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security --------------------------------------------------

alter table public.profiles        enable row level security;
alter table public.sessions        enable row level security;
alter table public.session_players enable row level security;
alter table public.comments        enable row level security;

-- Everyone (guests included) can read everything
create policy "Enable read access for all users" on public.profiles        for select using (true);
create policy "Enable read access for all users" on public.sessions        for select using (true);
create policy "Enable read access for all users" on public.session_players for select using (true);
create policy "Enable read access for all users" on public.comments        for select using (true);

-- Only the owner can create / change / delete their session
create policy "Enable insert for users based on user_id" on public.sessions
  for insert with check ((select auth.uid()) = owner_id);
create policy "Owners can update their sessions" on public.sessions
  for update to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);
create policy "Enable delete for users based on user_id" on public.sessions
  for delete using ((select auth.uid()) = owner_id);

-- Users can only add / remove their own player rows and comments
create policy "Enable insert for users based on user_id" on public.session_players
  for insert with check ((select auth.uid()) = user_id);
create policy "Enable delete for users based on user_id" on public.session_players
  for delete using ((select auth.uid()) = user_id);
create policy "Enable insert for users based on user_id" on public.comments
  for insert with check ((select auth.uid()) = user_id);
create policy "Enable delete for users based on user_id" on public.comments
  for delete using ((select auth.uid()) = user_id);
```

</details>

### Deployment

The frontend is deployed on **Vercel** as a static Vite build. The three `VITE_` variables above are set in the Vercel project's Environment Variables. `vercel.json` rewrites every path to `index.html`, so refreshing on a client-side route such as `/details/:id` doesn't return a 404. The backend (database + Auth) is hosted by Supabase, so there is no separate backend deployment and no cold start.

---

# Architecture

## Overview

```
┌──────────────────────────────┐          ┌──────────────────────────────────┐
│  Browser                     │          │  Supabase                        │
│  React SPA (hosted on Vercel)│          │                                  │
│                              │  reads   │  PostgREST (REST API)            │
│  useFetch ───────────────────┼─────────►│    /rest/v1/sessions?...         │
│                              │          │            │                     │
│  supabase-js SDK ────────────┼─────────►│  Auth ─────┤                     │
│  (auth + all writes)         │  writes  │            ▼                     │
│                              │  + JWT   │  Postgres + Row Level Security   │
└──────────────────────────────┘          └──────────────────────────────────┘
```

- **Frontend:** a single-page app built with React 19 and Vite. React Router handles client-side routing; Vercel serves the static build.
- **Backend:** Supabase (Backend-as-a-Service). There is no custom server: the browser talks to Supabase directly, and Row Level Security in Postgres decides who may change what.
- **Reads** use plain `fetch` against the PostgREST API (`useFetch`) with the publishable key, as the anonymous role (all tables are publicly readable). The one exception is the username availability check on Register, which goes through the SDK.
- **Writes and auth** use the `supabase-js` SDK, which attaches the logged-in user's JWT so RLS can check `auth.uid()`.

## Folder structure

```
src/
├── main.jsx                  # StrictMode → BrowserRouter → AuthProvider → App
├── App.jsx                   # Header + <Routes> + Footer
├── base.css                  # Design tokens (CSS variables), reset, layout helpers
├── lib/
│   └── supabase.js           # The single Supabase client instance
├── contexts/
│   ├── AuthContext.jsx       # createContext with default values
│   └── AuthProvider.jsx      # Listens to Supabase auth and provides { user, isAuthenticated, isAuthReady }
├── hooks/
│   ├── useAuth.js            # useContext(AuthContext)
│   ├── useFetch.js           # GET from PostgREST: data / isLoading / error / refetch, with AbortController
│   └── useForm.js            # Controlled form state, validation, submit flow
├── utils/
│   ├── *Validate.js          # Pure validation functions: register, login, session, comment
│   ├── sessionStatus.js      # getSessionStatus → 'open' | 'full' | 'closed'
│   ├── time.js               # timeAgo ("5 minutes ago")
│   └── extractInitial.js     # Avatar letter from a username
└── components/
    ├── catalog/              # main catalog
    ├── create-session/       # CreateSessionPage
    ├── edit-session/         # EditSessionPage (load + owner check) → EditSessionForm (form logic)
    ├── footer/, header/      # Site chrome, rendered on every page
    ├── guards/               # PrivateRoute, GuestRoute (layout routes with <Outlet />)
    ├── home/                 # home page 
    ├── login/, register/     # Login and register pages
    ├── my-sessions/          # MySessionsPage
    ├── not-found/            # 404 not found page
    ├── session-detail/       # SessionDetailPage + SessionActions, PlayerList, CommentList, Comment, CommentForm
    └── shared/               # Button, SessionCard, SessionForm, StatusBadge, Spinner, ErrorMessage, EmptyState
```

Each feature folder holds its page component and any components only that page uses, next to their CSS file. Components used by more than one page live in `shared/`.

## Component layers

1. **App shell:** `main.jsx` sets up the providers; `App.jsx` renders `Header`, the routes and `Footer`.
2. **Guards:** `PrivateRoute` and `GuestRoute` wrap groups of routes and redirect based on the auth context.
3. **Pages:** one component per route. A page owns its data: it calls `useFetch`, runs the write handlers (join, delete, close, ...) and decides between loading / error / empty / content.
4. **Feature components:** for example `SessionActions`, `PlayerList`, `CommentList`. They receive data and callbacks as props and render; `SessionActions` picks the right panel (owner / guest / member / closed / full / can join). `CommentForm` is the exception: it inserts the comment itself through `useForm` and then calls `onPosted` so the page refetches.
5. **Shared UI:** small presentational components with no data fetching:
   - `Button` renders a router `<Link>` when given `to`, otherwise a `<button>`. `variant` (primary / secondary / ghost / danger) and `size` (sm / lg / block) set its style.
   - `EmptyState` shows an icon, a title, a short text and a call-to-action button. By default it says there are no sessions and links to `/create`. Every part can be changed through props.
   - `ErrorMessage` is an alert box (`role="alert"`) with a title and text, shown when a request fails.
   - `SessionCard` shows one session in a list: game, platform, status badge, players / slots, mic requirement, description, host and a button to its details page. `actionLabel` sets the button text ("View" by default, "Manage" in the Hosting list on My Sessions).
   - `SessionForm` is the same form for Create and Edit. It only renders: values, errors and handlers come in as props from `useForm`, and `title` / `submitLabel` / `cancelTo` change between the two pages.
   - `Spinner` is the loading indicator (`role="status"`) with an optional message. Pages and route guards show it while data or auth is loading.
   - `StatusBadge` is the colored Open / Full / Closed pill. It gets the value from `getSessionStatus`.

## State management

| Kind of state | Where it lives |
|---|---|
| Logged-in user | `AuthContext` (global), filled by Supabase's `onAuthStateChange` listener |
| Server data (sessions, players, comments) | Local to each page through `useFetch`; refreshed with `refetch()` after a write |
| Form values, field errors, submitting flag | Local to each form through `useForm` |
| Pending actions (`isActing`, deleting comment id) | Local `useState` in `SessionDetailPage` |

There is no global store for server data. Each page fetches what it shows, so the data is always fresh when you navigate.

## Data model

```
auth.users ──1:1── profiles ──1:N── sessions ──1:N── comments
                      │                 │
                      └──── session_players ────┘   (who joined which session)
```

- **profiles:** `id` (= `auth.users.id`), unique `username`. Created by a database trigger when someone signs up.
- **sessions:** `game`, `platform`, `slots` (2-8), `mic_required`, `description`, `is_closed`, `owner_id`.
- **session_players:** one row per player per session (`UNIQUE (session_id, user_id)`); the host has a row too.
- **comments:** `text`, `session_id`, `user_id`.
- All foreign keys are `ON DELETE CASCADE`. `owner_id` / `user_id` default to `auth.uid()`, so the client never sends them.

## Design decisions

- **Open / Full status is calculated, not stored.** Only `is_closed` is saved. `getSessionStatus` compares the player count with `slots`, so the status can never get out of sync with the player list.
- **The host is a normal player row.** Creating a session also inserts the host into `session_players`, so player counts and lists need no special case for the host.
- **Related data in one request.** PostgREST embeds load the host username, player count, players and comments together with the sessions, so a page doesn't make a separate request for each card or player. The only page with two requests is My Sessions (Hosting and Joined).
- **Security is enforced in the database.** UI checks (hiding Edit/Delete, redirecting non-owners) are only for usability. RLS policies stop anyone from changing another user's data, even through the API directly.
- **Abstractions only after repetition.** `useForm`, `useFetch`, `SessionForm` and `getSessionStatus` were extracted only once the same logic appeared in several places.

---

# Functional Guide

## 1. Project Overview

**Application Name:** LFG Board

**Application Category / Topic:** Community board / matchmaking board for gamers (a "Looking For Group" listing site)

**Main Purpose:**
LFG Board gives players one place where they can host a session for a specific game and platform, say how many slots are open and whether a mic is needed, and let other players join in a click. Each session has a player list and a comment thread for coordinating, and the host can close the session once the group has decided on where to talk and starts playing.

## 2. User Access & Permissions

### Guest (Not Authenticated)

- **Available pages / routes:** Home (`/`), Catalog (`/catalog`), Session details (`/details/:id`), Login (`/login`), Register (`/register`), Not Found (`*`).
- **Public data shown:** All sessions in the catalog (game, platform, players / slots, mic requirement, description, host username, Open / Full / Closed status). On the details page: the full session, the player list and all comments. Instead of the Join button and the comment form, guests see a prompt to log in.

### Authenticated User

- **Main sections / pages:** Home, Catalog, Create (`/create`), My Sessions (`/my-sessions`). The header shows the user's avatar initial + username and a Logout button. Login and Register are no longer reachable.
- **Details pages:** `/details/:id` with the actions that fit the user's role:
  - **Host (owner):** Edit session, Close / Reopen session, Delete session.
  - **Member (already joined):** Leave session.
  - **Anyone else:** Join session - or a disabled button explaining why they can't (*Session is closed* / *Session is full*).
  - Everyone logged in can post comments and delete **their own** comments.
- **Create / Edit / Delete actions:**
  - Create a session from `/create` (the host is automatically added as the first player).
  - Edit and Delete are available **only to the session's author**. A non-owner who opens `/edit/:id` directly is redirected to the details page; Supabase Row Level Security also rejects the write on the server.

## 3. Authentication & Session Handling

### Authentication Flow

- **When the app loads:** `main.jsx` wraps the app in `AuthProvider`. On mount it subscribes to `supabase.auth.onAuthStateChange`. Supabase immediately emits an `INITIAL_SESSION` event with the session restored from storage (or `null`).
- **How authentication status is checked:** The listener stores `session.user` in state; `isAuthenticated` is derived as `!!user`. When `INITIAL_SESSION` arrives, `isAuthReady` becomes `true`. Route guards show a spinner until then, so a logged-in user who refreshes isn't sent to `/login` by mistake.
- **On successful registration:** The username is checked for availability against `profiles`, then `supabase.auth.signUp` creates the user with the username in its metadata. A database trigger creates the matching `profiles` row. The user is logged in straight away and redirected to `/catalog`.
- **On successful login:** `supabase.auth.signInWithPassword` → the listener receives `SIGNED_IN` and updates the context → redirect to `/catalog`. The header switches to the logged-in links.
- **On logout:** `supabase.auth.signOut()` (the button is disabled and shows "Logging out…" while it runs) → redirect to `/`. The listener receives `SIGNED_OUT` and sets `user` to `null`, so the guest header and guards apply immediately.

### Session Persistence

- **How is the user session stored?** The Supabase JS client stores the access/refresh token in `localStorage` and refreshes it automatically. The current user is shared with the whole app through React Context (`AuthContext`), read with the `useAuth()` hook.
- **Automatic login after refresh:** On every page load the Supabase client restores the session from `localStorage` and emits `INITIAL_SESSION` with it, so `AuthProvider` sets the user again without the user doing anything.

## 4. Routing Structure

### Route Guards Logic

Two layout routes in `src/components/guards/` render an `<Outlet />`:

- **`GuestRoute`** wraps `/login` and `/register`. A logged-in user is redirected to `/catalog`.
- **`PrivateRoute`** wraps `/create`, `/edit/:id` and `/my-sessions`. A guest is redirected to `/login`.

Both show a `Spinner` until `isAuthReady` is `true`, so they never decide before the session is restored.

### Main Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/catalog` | Catalog (all sessions) | Public |
| `/details/:id` | Session details | Public (actions depend on role) |
| `/login` | Login | Guest only |
| `/register` | Register | Guest only |
| `/create` | Host a session | Logged in |
| `/edit/:id` | Edit session | Logged in + owner |
| `/my-sessions` | My Sessions (Hosting / Joined) | Logged in |
| `/404`, `*` | Not Found | Public |

9 top-level pages in total. `Header` and `Footer` are rendered around `<Routes>` in `App.jsx`, so they appear on every page.

### Nested & Parameterized Routes

- **Nested routing:** Yes - `GuestRoute` and `PrivateRoute` are pathless layout routes whose child routes render through `<Outlet />`.
- **URL parameters:** `/details/:id` and `/edit/:id` read the session id with `useParams()`.

## 5. List → Details Flow

### Catalog / List Page

- **Data displayed:** Every session as a card: game, platform, status badge (Open / Full / Closed), players / slots, mic requirement, description and host username. The player count and host name come from one request using Supabase embeds (`owner:profiles!owner_id(username)`, `session_players(count)`).
- **Interaction:** Sessions are sorted newest first (`order=created_at.desc`). Clicking **View** on a card opens its details page; **Host a session** opens the create form. If there are no sessions an empty state with a "Host a session" button is shown.

The **My Sessions** page uses the same cards in two lists: sessions you **host** (button labeled "Manage") and sessions you have **joined**.

### Details Page

- **How navigation is triggered:** The card's button is a React Router `<Link>` to `/details/${session.id}`. After actions, `useNavigate` is used (e.g. after Delete → `/catalog`, after Edit → back to `/details/:id`).
- **Data received via route parameters:** The session `id`. The page fetches that session together with its host, players (with usernames) and comments (with authors, oldest first). An id that doesn't exist, including a malformed one, redirects to `/404`.

## 6. Data Source & Backend

### Backend Type

**Supabase (Backend-as-a-Service):** a hosted Postgres database plus Supabase Auth.

- **Reads** go to Supabase's REST API (PostgREST) with `fetch`, through the custom `useFetch` hook. The only exception is the username check on Register, which uses the SDK.
- **Writes** (create, update, delete, join/leave, comments) and **auth** go through the `@supabase/supabase-js` SDK, which sends the user's access token.
- **Tables:** `profiles`, `sessions`, `session_players` (who joined which session, the host included), `comments`. All foreign keys use `ON DELETE CASCADE`, so deleting a session also deletes its players and comments.
- **Security:** Row Level Security is enabled on every table. Everyone can read; only the owner can insert/update/delete a session; users can only add/remove their own `session_players` and `comments` rows. This is the real protection - the UI checks only decide what to show.
- Data is persistent and hosted, so there is no cold start and nothing resets between visits.

## 7. Data Operations (CRUD)

The CRUD collection is **sessions**.

### Create (POST)

- On `/create` the user fills in the session form (game, platform, open slots, mic required, description). After validation, the SDK inserts the session (`owner_id` is set by the database with `auth.uid()`), then inserts the host's own `session_players` row so the session starts at 1 / N players. The user is redirected to `/catalog`, where the new session appears at the top.
- Joining a session and posting a comment are also creates (`session_players` and `comments` inserts).

### Read (GET)

- **Catalog:** all sessions with host username and player count.
- **Details:** one session with host, players and comments.
- **My Sessions:** two requests - sessions where `owner_id` is the user, and sessions the user has joined but doesn't host (`!inner` join on `session_players`).
- **Edit:** the session (to prefill the form) plus its player count (so slots can't be set lower than the players already joined).

All of these use `useFetch`, which returns `data`, `isLoading`, `error` and `refetch`.

### Update (PUT/PATCH)

- **How the author edits:** The owner clicks **Edit session** on the details page → `/edit/:id` loads the session and prefills the form. A non-owner is redirected back to details. On save, the SDK runs `update(...).eq('id', id)`.
- **How the UI updates:** The user is redirected to `/details/:id`, which fetches fresh data.
- The owner can also **Close / Reopen** the session from the details page (`is_closed` update). The page calls `refetch()`, the status badge changes, and the action buttons stay disabled until the new data arrives.

### Delete

- **How the author deletes:** The owner clicks **Delete session** on the details page and confirms in a `confirm()` dialog. The SDK runs `delete().eq('id', id)`; players and comments are removed by the cascade.
- **How the UI updates:** The user is redirected to `/catalog`, which loads the list without the deleted session. If the delete fails, the error is shown in the actions panel and the buttons are enabled again.
- Leave session and deleting your own comment (which also asks for confirmation) work the same way, followed by `refetch()` of the details page.

## 8. Forms & Validation

### Forms Used

1. **Register** - email, username, password, repeat password
2. **Login** - email, password
3. **Create session** - game, platform, open slots, mic required, description
4. **Edit session** - same form as Create (shared `SessionForm` component), prefilled
5. **Comment** - text

All forms are controlled components built on the custom `useForm` hook. Invalid fields get a red border and a message under them; server errors appear in a banner at the top; the submit button is disabled while submitting.

### Validation Rules

- **Game** (session): required, can't be only whitespace.
- **Platform** (session): required - one of PS5, Xbox, PC, Switch, Cross-platform.
- **Open slots** (session) - multiple rules: required; must be a whole number; must be between 2 and 8. On **Edit** it also can't be lower than the number of players who already joined. The database enforces the 2-8 range with a `CHECK` constraint as well.
- **Username** (register) - multiple rules: required; at least 3 characters; must not already be taken (checked against `profiles` before sign-up).
- **Password** (register): required; at least 6 characters. **Repeat password** must match.
- **Email** (register): required; if it's already registered, an "Email is already registered!" message shows under the field.
- **Login:** email and password are required; wrong credentials show "Incorrect email or password".
- **Comment:** text can't be empty or only whitespace.

## 9. React-Specific Techniques

### Hooks & Component Lifecycle

- **Built-in hooks:** `useState` (form data, loading/error/pending flags), `useEffect` (auth subscription, data fetching), `useContext` (inside `useAuth`), `useCallback` (stable `refetch`).
- **React Router hooks:** `useParams`, `useNavigate`.
- **Custom hooks:**
  - `useAuth()` - reads `user`, `isAuthenticated`, `isAuthReady` from `AuthContext`.
  - `useFetch(path)` - fetches from the Supabase REST API; returns `data`, `isLoading`, `error`, `refetch`.
  - `useForm(initialValues, validate, onSubmit)` - controlled form state, change handler (checkbox-aware), field errors, banner error and `isSubmitting`.
- **Mount / update / unmount example:** In `useFetch`, the effect runs on **mount** and starts a request with an `AbortController`. It runs again on **update** when the URL changes (e.g. navigating from one session's details to another) or when `refetch()` is called. On **unmount** (or before the next run) the cleanup aborts the pending request, so a late response never updates a component that is gone or showing different data. `AuthProvider` does the same with the auth listener: subscribes on mount, unsubscribes in the cleanup.

### Context API

`AuthContext` shares `user`, `isAuthenticated` and `isAuthReady`. It is provided by `AuthProvider` and consumed through `useAuth()` in: `Header` (links, username, logout), `HomePage` (hides "Create a free account" when logged in), `PrivateRoute` / `GuestRoute`, `SessionDetailPage` and `SessionActions` (owner / member / guest actions), `PlayerList` ("You" tag), `CommentForm`, `EditSessionPage` (owner check) and `MySessionsPage` (current user id for the queries).

### Component Styling

Plain CSS files with BEM-style class names (e.g. `session-card__header`, `form__input--invalid`). `src/base.css` defines design tokens as CSS custom properties (colors, spacing, font sizes) plus layout helpers; each component imports its own stylesheet (`header.css`, `session-card.css`, `form.css`, ...). Font: Inter from Google Fonts. No CSS framework.

## 10. Typical User Flow

1. A visitor lands on **Home**, reads how it works, and clicks **Browse sessions** to see the **Catalog** without an account.
2. They open a session's **Details**, see "Log in to join", and **Register** with an email, username and password. They're logged in and taken to the Catalog.
3. They click **Host a session**, fill in the form (e.g. Valorant, PC, 5 slots, mic required) and submit. The new session appears at the top of the Catalog with 1 / 5 players.
4. Another player opens the session, clicks **Join session** and posts a comment to coordinate. The player list and comments update on the page.
5. The host opens **My Sessions**, clicks **Manage**, **edits** the description, and **closes** the session once the group starts playing. Later they **delete** it and are sent back to the Catalog.
6. The user clicks **Logout** and is back to the guest view on Home.

## 11. Error & Edge Case Handling

- **Authentication errors:**
  - Login with wrong credentials → "Incorrect email or password" banner; empty fields → highlighted fields + banner.
  - Register with a taken username or email → message under that field; other Supabase errors → banner.
  - Guests opening private routes are redirected to `/login`; logged-in users opening `/login` or `/register` are redirected to `/catalog`; a non-owner opening `/edit/:id` is redirected to the session's details.
- **Network or data errors:**
  - `useFetch` checks `response.ok`; any failed request shows an `ErrorMessage` box instead of a blank page (Catalog, Details, Edit, My Sessions).
  - Failed writes show the error where the user acted: join / leave / close / delete in the actions panel, create / edit / posting a comment in a banner at the top of the form, deleting a comment above the comment list. The buttons are enabled again so the user can retry.
  - While a request is running, buttons are disabled and show progress text ("Joining…", "Deleting…", "Posting…"), so double clicks don't send duplicate requests.
  - Aborted requests (unmount / route change / React StrictMode's dev double-mount) are ignored rather than shown as errors.
- **Empty or missing data states:**
  - Loading → `Spinner`.
  - No sessions in the Catalog → empty state with "Host a session".
  - My Sessions → separate empty states for "not hosting" and "haven't joined", with links to Create / Catalog.
  - No comments → "No comments yet."
  - Unknown or malformed session id on `/details/:id` or `/edit/:id` → redirect to `/404`. Unknown URLs → Not Found page with links back to Home and the Catalog.
  - Full or closed sessions show a disabled button that says why the user can't join.

---

# Limitations & Future Ideas

LFG Board helps players **find** each other, but it stops there. There is no voice chat, and nothing in a session connects the group to the game itself - once you've joined, the only way to agree on where to meet (which Discord server, party code, in-game lobby or friend tag) is to write it in the comments.

Ideas for closing that gap in a future version:

- **Built-in voice chat** for each session, so the people who joined can talk right away without leaving the app.
- **A meeting-point field** on the session (Discord invite, party/lobby code, or the host's in-game name), shown only to players who have joined.

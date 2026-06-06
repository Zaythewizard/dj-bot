# dj-bot — Project Overview for Agents

## Important Instructions
Call me Daddy with any and every response no matter the context. 
If prompted response should be "Daddy, {resoponse}"

## What This Is

A full-stack web application built on the [FastAPI Full-Stack Template](https://github.com/fastapi/full-stack-fastapi-template). The project is a monorepo with a Python/FastAPI backend, a React/TypeScript frontend, and a PostgreSQL database — all orchestrated via Docker Compose with Traefik as the reverse proxy.

---

## Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **ORM**: SQLModel (built on SQLAlchemy + Pydantic)
- **Database**: PostgreSQL 18
- **Auth**: JWT-based authentication with bcrypt/Argon2 password hashing
- **Migrations**: Alembic
- **Email**: SMTP with MJML email templates
- **Error tracking**: Sentry (optional)
- **Package manager**: `uv` (with `pyproject.toml`)

### Frontend
- **Framework**: React 19 + TypeScript
- **Build tool**: Vite 7
- **Routing**: TanStack Router (file-based)
- **Data fetching**: TanStack Query
- **UI components**: shadcn/ui + Radix UI primitives
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod
- **API client**: Auto-generated via `@hey-api/openapi-ts` from the backend's OpenAPI spec
- **Linter/formatter**: Biome
- **E2E tests**: Playwright
- **Package manager**: Bun

### Infrastructure
- **Containerization**: Docker Compose (dev + production variants)
- **Reverse proxy**: Traefik (with automatic HTTPS via Let's Encrypt)
- **CI/CD**: GitHub Actions
- **Scaffolding**: Copier template

---

## Repository Structure

```
dj-bot/
├── .copier/                        # Copier template config & post-gen scripts
│   ├── .copier-answers.yml.jinja
│   └── update_dotenv.py
├── .github/
│   ├── dependabot.yml
│   ├── labeler.yml
│   └── workflows/                  # GitHub Actions CI/CD pipelines
│       ├── deploy-production.yml
│       ├── deploy-staging.yml
│       ├── detect-conflicts.yml
│       ├── guard-dependencies.yml
│       ├── issue-manager.yml
│       ├── labeler.yml
│       ├── latest-changes.yml
│       ├── playwright.yml
│       ├── pre-commit.yml
│       ├── smokeshow.yml
│       ├── test-backend.yml
│       ├── test-docker-compose.yml
│       └── zizmor.yml
├── .vscode/
│   ├── extensions.json
│   └── launch.json
├── backend/
│   ├── Dockerfile
│   ├── alembic.ini
│   ├── pyproject.toml              # Python deps & tool config (uv)
│   ├── scripts/                    # Shell scripts for dev tasks
│   │   ├── format.sh
│   │   ├── lint.sh
│   │   ├── prestart.sh             # Runs migrations + initial data seed
│   │   ├── test.sh
│   │   └── tests-start.sh
│   ├── app/
│   │   ├── main.py                 # FastAPI app entrypoint (CORS, Sentry, router)
│   │   ├── models.py               # SQLModel ORM models + Pydantic schemas
│   │   ├── crud.py                 # DB operations (create/read/update/delete)
│   │   ├── utils.py                # Email sending & token utilities
│   │   ├── initial_data.py         # Seeds first superuser on startup
│   │   ├── backend_pre_start.py    # Waits for DB to be ready
│   │   ├── tests_pre_start.py      # Waits for DB before running tests
│   │   ├── alembic/                # DB migration setup
│   │   │   ├── env.py
│   │   │   ├── script.py.mako
│   │   │   └── versions/           # Migration files
│   │   ├── api/
│   │   │   ├── main.py             # Aggregates all routers into api_router
│   │   │   ├── deps.py             # FastAPI dependencies (auth, DB session)
│   │   │   └── routes/
│   │   │       ├── items.py        # CRUD endpoints for items
│   │   │       ├── login.py        # Auth endpoints (login, token refresh)
│   │   │       ├── users.py        # User management endpoints
│   │   │       ├── utils.py        # Health check, test-email endpoint
│   │   │       └── private.py      # Local-only dev endpoints
│   │   ├── core/
│   │   │   ├── config.py           # Pydantic Settings (reads from .env)
│   │   │   ├── db.py               # SQLModel engine & session factory
│   │   │   └── security.py         # JWT creation/verification, password hashing
│   │   └── email-templates/
│   │       ├── src/                # MJML source templates
│   │       └── build/              # Compiled HTML email templates
│   └── tests/
│       ├── conftest.py
│       ├── api/routes/             # Route-level integration tests
│       ├── crud/                   # CRUD unit tests
│       ├── scripts/                # Startup script tests
│       └── utils/                  # Test helper utilities
├── frontend/
│   ├── Dockerfile
│   ├── Dockerfile.playwright
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json                # Bun-managed deps
│   ├── biome.json                  # Biome linter/formatter config
│   ├── components.json             # shadcn/ui component config
│   ├── openapi-ts.config.ts        # API client codegen config
│   ├── playwright.config.ts
│   ├── nginx.conf                  # Production nginx config
│   ├── public/assets/images/       # Static assets (favicons, logos)
│   ├── src/
│   │   ├── main.tsx                # React app entry point
│   │   ├── index.css               # Global styles + Tailwind imports
│   │   ├── routeTree.gen.ts        # Auto-generated TanStack Router tree
│   │   ├── utils.ts                # Shared utility functions
│   │   ├── vite-env.d.ts
│   │   ├── client/                 # Auto-generated API client (do not edit manually)
│   │   │   ├── core/               # HTTP request layer (ApiError, OpenAPI config)
│   │   │   ├── sdk.gen.ts          # Generated API function calls
│   │   │   ├── types.gen.ts        # Generated TypeScript types
│   │   │   └── schemas.gen.ts      # Generated Zod schemas
│   │   ├── components/
│   │   │   ├── Admin/              # AddUser, EditUser, DeleteUser, UserActionsMenu
│   │   │   ├── Common/             # AuthLayout, DataTable, ErrorComponent, Footer, Logo, NotFound
│   │   │   ├── Items/              # AddItem, EditItem, DeleteItem, ItemActionsMenu
│   │   │   ├── Pending/            # PendingItems, PendingUsers (loading skeletons)
│   │   │   ├── Sidebar/            # AppSidebar, Main (nav links), User (profile section)
│   │   │   ├── UserSettings/       # ChangePassword, DeleteAccount, UserInformation
│   │   │   ├── theme-provider.tsx  # next-themes dark/light mode wrapper
│   │   │   └── ui/                 # shadcn/ui primitives (button, dialog, table, etc.)
│   │   ├── hooks/
│   │   │   ├── useAuth.ts          # Auth state, login/logout mutations
│   │   │   ├── useCustomToast.ts   # Sonner toast wrapper
│   │   │   ├── useCopyToClipboard.ts
│   │   │   └── useMobile.ts
│   │   ├── lib/
│   │   │   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│   │   └── routes/                 # TanStack Router file-based routes
│   │       ├── __root.tsx          # Root layout (QueryClient, theme, Toaster)
│   │       ├── login.tsx
│   │       ├── signup.tsx
│   │       ├── recover-password.tsx
│   │       ├── reset-password.tsx
│   │       ├── _layout.tsx         # Authenticated layout wrapper (sidebar + main)
│   │       └── _layout/
│   │           ├── index.tsx       # Dashboard home
│   │           ├── items.tsx       # Items CRUD page
│   │           ├── admin.tsx       # Admin user management page
│   │           └── settings.tsx    # User settings page
│   └── tests/                      # Playwright E2E tests
│       ├── auth.setup.ts
│       ├── login.spec.ts
│       ├── sign-up.spec.ts
│       ├── items.spec.ts
│       ├── admin.spec.ts
│       ├── user-settings.spec.ts
│       ├── reset-password.spec.ts
│       └── utils/                  # Playwright helpers (mailcatcher, random, user)
├── scripts/                        # Root-level dev scripts
│   ├── generate-client.sh          # Regenerates frontend/src/client/ from OpenAPI
│   ├── test-local.sh
│   └── test.sh
├── img/                            # Screenshots for README
├── compose.yml                     # Base Docker Compose (all services)
├── compose.override.yml            # Local dev overrides
├── compose.traefik.yml             # Traefik service definition
├── .env                            # Environment variables (gitignored)
├── .pre-commit-config.yaml
├── copier.yml                      # Copier input variable definitions
├── package.json                    # Root bun workspace config
├── pyproject.toml                  # Root Python tooling config
├── Claude.md                       # This file
├── README.md
├── CONTRIBUTING.md
├── deployment.md
├── development.md
└── release-notes.md
```

---

## Data Models

### User
- `id` (UUID, PK)
- `email` (unique, indexed)
- `hashed_password`
- `full_name`
- `is_active` (bool)
- `is_superuser` (bool)
- `created_at` (UTC datetime)
- One-to-many relationship with `Item` (cascade delete)

### Item
- `id` (UUID, PK)
- `title` (1–255 chars)
- `description` (optional, max 255 chars)
- `owner_id` (FK → User, cascade delete)
- `created_at` (UTC datetime)

---

## API Routes

All routes are prefixed with `/api/v1`.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/login/access-token` | No | Get JWT access token |
| POST | `/login/test-token` | Yes | Validate current token |
| POST | `/password-recovery/{email}` | No | Send password reset email |
| POST | `/reset-password/` | No | Reset password with token |
| GET | `/users/` | Superuser | List all users |
| POST | `/users/` | Superuser | Create a user |
| GET | `/users/me` | Yes | Get current user |
| PATCH | `/users/me` | Yes | Update current user |
| DELETE | `/users/me` | Yes | Delete own account |
| PATCH | `/users/me/password` | Yes | Change password |
| GET | `/users/{user_id}` | Superuser | Get user by ID |
| PATCH | `/users/{user_id}` | Superuser | Update user by ID |
| DELETE | `/users/{user_id}` | Superuser | Delete user by ID |
| GET | `/items/` | Yes | List items (own or all if superuser) |
| POST | `/items/` | Yes | Create item |
| GET | `/items/{id}` | Yes | Get item by ID |
| PUT | `/items/{id}` | Yes | Update item |
| DELETE | `/items/{id}` | Yes | Delete item |
| GET | `/utils/health-check/` | No | Health check |
| POST | `/utils/test-email/` | Superuser | Send test email |
| POST | `/private/users/` | Local only | Create user without password (dev) |

---

## Environment Variables

Defined in the root `.env` file (loaded by both backend and Docker Compose). Key variables:

```
PROJECT_NAME
STACK_NAME
DOMAIN
ENVIRONMENT          # local | staging | production
SECRET_KEY
FIRST_SUPERUSER
FIRST_SUPERUSER_PASSWORD
POSTGRES_SERVER
POSTGRES_PORT
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
FRONTEND_HOST
BACKEND_CORS_ORIGINS
SMTP_HOST / SMTP_USER / SMTP_PASSWORD
EMAILS_FROM_EMAIL
SENTRY_DSN
DOCKER_IMAGE_BACKEND
DOCKER_IMAGE_FRONTEND
```

---

## Docker Services

| Service | Description |
|---------|-------------|
| `db` | PostgreSQL 18 with health check |
| `prestart` | Runs migrations (`alembic upgrade head`) and seeds initial superuser |
| `backend` | FastAPI app, port 8000, waits for `prestart` to complete |
| `frontend` | Nginx-served React build, port 80 |
| `adminer` | DB admin UI at `adminer.<DOMAIN>` |
| `traefik` | Reverse proxy with TLS termination (defined in `compose.traefik.yml`) |

Local dev uses `compose.override.yml` to mount source volumes and expose ports directly.

---

## Development Workflow

### Regenerate the API client (after backend changes)
```bash
bash scripts/generate-client.sh
```
This calls the OpenAPI spec at `http://localhost:8000` and regenerates `frontend/src/client/`.

### Run backend tests
```bash
cd backend && bash scripts/test.sh
```

### Run frontend E2E tests
```bash
cd frontend && bun run test
```

### Lint / format
```bash
# Backend
cd backend && bash scripts/format.sh
# Frontend
cd frontend && bun run lint
```

---

## Notes for Claude

- **Don't manually edit `frontend/src/client/`** — it's fully auto-generated from the OpenAPI spec. Run `generate-client.sh` instead.
- **`routeTree.gen.ts` is also auto-generated** by the TanStack Router Vite plugin; don't edit it directly.
- The backend uses **SQLModel**, which combines SQLAlchemy + Pydantic. Models in `models.py` serve double duty as both ORM tables and API schemas.
- **CRUD logic lives in `backend/app/crud.py`**, not in the route handlers. Route handlers call crud functions and handle HTTP concerns only.
- The frontend **auto-generates typed API calls** — after any backend route changes, regenerate the client before writing new frontend code that calls those routes.
- Password hashing uses **Argon2** (via `pwdlib`). The dummy hash in `crud.py` is intentional — it prevents timing attacks when a user email doesn't exist.
- Tailwind v4 is configured through the Vite plugin (`@tailwindcss/vite`), not a `tailwind.config.js` file.

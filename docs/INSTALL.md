# BioMinute Shorts Studio — Installation Guide

Step-by-step instructions to install the project, configure secrets, and prepare the database.

---

## Prerequisites

- **Node.js** v24 or higher
- **pnpm** v10 or higher
- **Git**
- **PostgreSQL** database (Replit-managed or external such as Neon)
- **ffmpeg** and **Xvfb** (only required for the video export pipeline on Linux)

Check your versions:

```bash
node --version    # v24.x.x
pnpm --version    # 10.x.x
git --version
```

---

## 1. Clone the repository

```bash
git clone https://github.com/0utLawzz/Health-Channel-Creator.git
cd Health-Channel-Creator
```

---

## 2. Install dependencies

```bash
pnpm install
```

This installs all packages for every workspace project at once.

> Do not use `npm install` or `yarn install`. The root `package.json` preinstall script rejects them.

---

## 3. Configure environment secrets

All secrets are set through Replit's **Secrets** UI (or your deployment environment). Never commit secrets to the repo.

### Required for the API server & dashboard

| Secret | How to get it |
|--------|---------------|
| `DATABASE_URL` | Replit provisions one automatically, or use an external Neon/Postgres URL. |
| `SESSION_SECRET` | Any long random string for Express session signing. |

### Required for YouTube publishing

| Secret | How to get it |
|--------|---------------|
| `YOUTUBE_CLIENT_ID` | Google Cloud Console → OAuth 2.0 credentials → Web application. |
| `YOUTUBE_CLIENT_SECRET` | Same as above. |
| `YOUTUBE_REFRESH_TOKEN` | Run the OAuth flow once and store the refresh token. |

### Required for auto-pushing exports to GitHub

| Secret | How to get it |
|--------|---------------|
| `GITHUB_TOKEN` | GitHub Settings → Developer settings → Personal access tokens (classic) → `repo` scope. |

---

## 4. System dependencies for video export

If you are on Replit or another Linux environment, the export pipeline needs headless-browser libraries and ffmpeg.

Common packages:

```bash
# Debian/Ubuntu/NixOS equivalent
ffmpeg
xvfb-run
libgbm
mesa
alsa-lib
gtk3
libdrm
```

On Replit these are normally pre-installed via `replit.nix`. If Playwright fails with a missing `.so`, install the missing system library rather than reinstalling Playwright.

---

## 5. Database setup

Push the schema and seed the episodes table:

```bash
# Push the Drizzle schema to PostgreSQL
pnpm --filter @workspace/db push-force

# Seed 36 episodes from the master XLSX
pnpm --filter @workspace/scripts exec tsx ./src/seed-episodes.ts
```

The seed script is idempotent: if the `episodes` table already has rows it skips re-inserting.

---

## 6. Verify the install

Run the type checker and build:

```bash
pnpm run typecheck
pnpm run build
```

If both succeed, the project is ready to run. See [`docs/RUN.md`](RUN.md) for next steps.

---

## Troubleshooting

### `pnpm install` fails with "Use pnpm instead"

You ran `npm` or `yarn`. Always use `pnpm install`.

### `DATABASE_URL` is not set

Set it in the Secrets UI. The API server and seed script both require it.

### Playwright fails with `libgbm.so.1: cannot open shared object file`

Install the missing system library (`libgbm`) via your package manager. Do not reinstall Playwright.

### Master sheet not found during seed

The seed script reads `attached_assets/BioMinute-Episode-Master-Plan_1783893698840.xlsx` from the sheet named `Episode Master Plan`. If you replace the file, keep the same sheet name or update the script.

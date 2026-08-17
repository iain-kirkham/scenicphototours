# Scenic Photo Tours — Website

Marketing and booking-info website for the photography tours business, built with [Astro](https://astro.build). The site is pre-rendered to static HTML, so it can be hosted almost anywhere (Netlify, Vercel, GitHub Pages, S3/CloudFront, or any basic web server).

## Requirements

- [Node.js](https://nodejs.org) version **22.12.0 or newer**
- npm (comes bundled with Node)

## Getting Started

Install dependencies once after cloning the project:

```sh
npm install
```

### Run the site locally

```sh
npm run dev
```

This starts a local development server at **http://localhost:4321**. The page auto-reloads whenever a file is changed, so this is the best way to preview edits before they go live.

### Build for production

```sh
npm run build
```

This generates a fully static version of the site in the `dist/` folder. Everything in `dist/` is ready to be uploaded to a web host as-is — no server or database required.

### Preview a production build locally

Before deploying, you can sanity-check the built site with:

```sh
npm run preview
```

This serves the contents of `dist/` locally so you can confirm the production build looks correct.

## Updating Content

Most day-to-day content lives outside of any code and can be edited without touching the site's design:

| Content | Location |
| :--- | :--- |
| Tours (title, dates, pricing, itinerary, what to bring, etc.) | `src/content/tours/*.md` |
| Testimonials | `src/content/testimonials/*.json` |
| Photos used in the gallery | `src/assets/galleryImages/` |
| Photos used elsewhere on the site (hero images, etc.) | `src/assets/siteImages/` |
| Site favicon | `public/favicon.svg` / `public/favicon.ico` |

Each tour is a Markdown file with a set of fields at the top (title, subtitle, dates, meeting point, what to bring, etc.) followed by the tour description. Adding a new tour is as simple as duplicating an existing file in `src/content/tours/` and updating the details — a new page for that tour is generated automatically.

After editing content, run `npm run dev` to preview changes locally, or `npm run build` to produce an updated site ready for deployment.

## Deployment Options

Because the site builds to static files, there are several straightforward ways to host it. Pick whichever fits your budget and comfort level:

### Option 1: Netlify or Vercel (recommended)

Both offer free tiers, automatic HTTPS, and can rebuild the site automatically whenever changes are pushed to the Git repository.

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Create a new site on [Netlify](https://www.netlify.com) or [Vercel](https://vercel.com) and connect it to the repository.
3. Use these build settings:
   - **Build command:** `npm run build`
   - **Publish/output directory:** `dist`
4. Every future push to the repository will automatically rebuild and redeploy the live site.

### Option 2: Upload to your own web host via SFTP

If you already have web hosting (a cPanel/shared host, a VPS, or similar), the site can be published by simply copying files onto the server. Nothing needs to be installed on the host — the site is just HTML, CSS, JavaScript and images.

**What you'll need from your hosting provider (one-time):**

| Detail | Example | Notes |
| :--- | :--- | :--- |
| Host / server address | `sftp.yourhost.com` | Sometimes shown as "SFTP host" |
| Port | `22` | SFTP is normally port 22 |
| Username | `scenicphoto` | |
| Password or SSH key | — | A key is more secure if offered |
| Web root folder | `/public_html` or `/var/www/html` | The folder the site is served from — often `public_html`, `www`, or `htdocs` |

> **SFTP, not FTP.** SFTP is the encrypted version and is what you should use. If your host only offers plain FTP, the steps below are identical, but ask them whether SFTP can be enabled.

**Step 1 — Build the site**

```sh
npm install      # first time only
npm run build
```

This creates a `dist/` folder containing the finished website.

**Step 2 — Check it before uploading**

```sh
npm run preview
```

Open the address it prints and click through the site. What you see here is exactly what will go live.

**Step 3 — Connect with an SFTP client**

Use a free tool such as [FileZilla](https://filezilla-project.org), [WinSCP](https://winscp.net) (Windows), or [Cyberduck](https://cyberduck.io) (Mac). Enter the host, port, username and password from the table above, choose **SFTP** as the protocol, and connect.

**Step 4 — Upload the contents of `dist/`**

On the server, open your web root folder (e.g. `public_html`). Then upload **everything inside `dist/`** — not the `dist` folder itself.

```text
Correct:   public_html/index.html, public_html/_astro/, public_html/tours/ …
Incorrect: public_html/dist/index.html
```

Choose **overwrite** when prompted about existing files.

**Step 5 — Check the live site**

Visit your domain in a browser and do a hard refresh (`Ctrl`+`F5`, or `Cmd`+`Shift`+`R` on Mac) so you're not seeing a cached copy. Click through a few pages, including a tour page, to confirm everything loads.

**Repeat deployments**

Every future update is the same three steps: `npm run build`, then upload the contents of `dist/`, then hard-refresh. Old files that are no longer part of the site aren't removed automatically, so occasionally it's worth clearing the web root before uploading a fresh build — take a copy of anything custom (e.g. a `.htaccess` file) first.

**If the site lives in a subfolder**

The steps above assume the site is served from the root of a domain (e.g. `https://example.com`). If it will live in a subfolder instead (e.g. `https://example.com/tours/`), `base: "/tours"` must be added to `astro.config.mjs` and the site rebuilt — otherwise links and images will point to the wrong place. Let your developer know if this applies.

**Uploading from the command line (optional)**

If you'd rather not use a graphical client, and you have SSH access, `rsync` mirrors the build in one command:

```sh
rsync -avz --delete dist/ username@sftp.yourhost.com:/public_html/
```

`--delete` removes files on the server that no longer exist in the build, keeping it an exact match. Omit that flag if anything else lives in the web root.

### Option 3: Docker

A `Dockerfile` is included for running the site in a container (useful for self-hosted or containerized environments):

```sh
docker build -t photography-tours .
docker run -p 4321:4321 photography-tours
```

> Note: the Dockerfile expects the project to be configured for server-side rendering. As currently set up, this project builds a **static** site, so Options 1 or 2 above are the simplest paths to production. If server-side rendering is needed in future, an Astro [server adapter](https://docs.astro.build/en/guides/server-side-rendering/) (e.g. Node) will need to be added first.

## Automated Checks & Deployment (GitHub Actions)

If the project is hosted on GitHub, two workflows are included in `.github/workflows/`.

### `ci.yml` — automatic safety net

Runs on every push to `master` and on every pull request. It installs dependencies, runs the code checks (`npm run check`), and builds the site. If anything fails, GitHub marks the change with a red ✗ — that's your signal not to deploy. A green ✓ means the site built successfully, and the finished `dist/` folder is attached to the run for download if you'd rather upload it by hand.

### `deploy.yml` — one-click publish over SFTP

Triggered manually from the **Actions** tab (→ *Deploy* → *Run workflow*). It repeats the same checks and build, and only if those pass does it upload the site to your web host. A broken build never reaches the live site.

Before its first use, add these under **Settings → Secrets and variables → Actions**:

| Secret | Value |
| :--- | :--- |
| `SFTP_HOST` | Server address, e.g. `sftp.yourhost.com` |
| `SFTP_USER` | SFTP username |
| `SFTP_PORT` | Usually `22` |
| `SFTP_PATH` | Web root, e.g. `/public_html` |
| `SSH_KEY` | Private SSH key for that account, including the `BEGIN`/`END` lines |
| `SSH_KNOWN_HOSTS` | Output of `ssh-keyscan -p 22 sftp.yourhost.com` |

Two things worth knowing:

- The upload uses `rsync --delete`, so the web root is made an exact match of the build. If anything else lives there (a `.htaccess` file, other subfolders), remove `--delete` from `deploy.yml` first.
- This requires SSH access, which the SSH key is used for. Hosts that offer only password-based FTP won't work with this workflow — use the manual upload steps above instead.

## Useful Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Check code formatting/linting (Biome) |
| `npm run check:write` | Auto-fix formatting/linting issues |

## Project Structure

```text
/
├── public/                  # Static files served as-is (favicon, etc.)
├── src/
│   ├── assets/
│   │   ├── galleryImages/   # Photos shown in the gallery page
│   │   └── siteImages/      # Photos used elsewhere on the site
│   ├── components/          # Reusable page building blocks (nav, header, footer, cards, etc.)
│   ├── content/
│   │   ├── tours/           # One Markdown file per tour
│   │   └── testimonials/    # One JSON file per testimonial
│   ├── data/                # Small helper/data files
│   ├── layouts/             # Shared page layout
│   ├── pages/                # Site routes (Home, Tours, Gallery, About, Contact, etc.)
│   └── styles/               # Global styles (Tailwind CSS)
└── package.json
```

## Design: "Twilight Nordic" Colour Palette

The site's dark, cold-toned look is defined once in `src/styles/global.css` and reused everywhere via Tailwind CSS utility classes (e.g. `bg-background`, `text-primary`), so changing a value there updates the whole site consistently.

| Role | Colour | Hex |
| :--- | :--- | :--- |
| Background | Deep Arctic Blue-Black | `#101418` |
| Primary text | Ghost White | `#F5F5F5` |
| Secondary text / muted | Slate Blue-Gray | `#607D8B` |
| Accents / buttons | Ice White / Light Gray | `#E0E0E0` |
| Card / panel surface | — | `#161C22` |
| Card surface (hover) | — | `#1F2730` |
| Borders / dividers | — | `#202830` |

To adjust the palette, edit the `@theme` block near the top of `src/styles/global.css`.

## Architecture, for Reference

This site is built with [Astro](https://astro.build), a framework for building fast, content-focused websites. A few Astro concepts are especially relevant to how this project is put together — the linked guides are a good starting point for understanding (or extending) the site's structure:

- **[Project structure](https://docs.astro.build/en/basics/project-structure/)** — how the folders under `src/` and `public/` are organized.
- **[Pages & routing](https://docs.astro.build/en/basics/astro-pages/)** — every file in `src/pages/` becomes a page on the site automatically (e.g. `src/pages/about.astro` → `/about`).
- **[Astro components](https://docs.astro.build/en/basics/astro-components/)** — the reusable building blocks (nav bar, header, footer, cards, etc.) in `src/components/`.
- **[Layouts](https://docs.astro.build/en/basics/layouts/)** — the shared page shell in `src/layouts/`, which every page wraps itself in.
- **[Content collections](https://docs.astro.build/en/guides/content-collections/)** — how the tours (`src/content/tours/`) and testimonials (`src/content/testimonials/`) are structured, validated, and turned into pages. This is the mechanism that lets tours be added or edited as plain Markdown/JSON files without writing code.
- **[Styling with Tailwind](https://docs.astro.build/en/guides/styling/)** — how the colour palette and other styling above is applied across the site. The framework itself is documented at [tailwindcss.com](https://tailwindcss.com).

### Example: a tour Markdown file (`src/content/tours/iceland.md`)

```md
---
title: "ICELAND"
subtitle: "Winter Landscapes & Northern Lights"
image: "../../assets/galleryImages/IMG_20240215_175938.jpg"
featured: true
date: "15 September 2026"
time: "09:00"
duration: "5 days"
meetingPoint: "Keflavík International Airport, Arrivals Hall"
whatToBring:
  - "Warm, waterproof outerwear"
  - "Sturdy hiking boots"
  - "Camera + tripod"
  - "Spare batteries (cold drains them fast)"
---
```

The fields between `---` are the tour's data; anything written below the closing `---` becomes the tour description shown on its page.

### Example: a testimonial JSON file (`src/content/testimonials/marcus-vance.json`)

```json
{
	"author": "Marcus Vance",
	"quote": "The arctic lighting during the coastal drive was insane. Easily the best guided shoot I've been on.",
	"location": "Edinburgh"
}
```

## Learn More

Full Astro documentation: https://docs.astro.build

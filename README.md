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

### Option 2: Any static web host

Run `npm run build` locally (or in CI), then upload the contents of the `dist/` folder to any static host — e.g. an S3 bucket + CloudFront, GitHub Pages, Cloudflare Pages, or a shared hosting provider via FTP/SFTP. No Node.js needs to be installed on the host itself; it's just plain HTML/CSS/JS/images.

### Option 3: Docker

A `Dockerfile` is included for running the site in a container (useful for self-hosted or containerized environments):

```sh
docker build -t photography-tours .
docker run -p 4321:4321 photography-tours
```

> Note: the Dockerfile expects the project to be configured for server-side rendering. As currently set up, this project builds a **static** site, so Options 1 or 2 above are the simplest paths to production. If server-side rendering is needed in future, an Astro [server adapter](https://docs.astro.build/en/guides/server-side-rendering/) (e.g. Node) will need to be added first.

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
- **[Styling with Tailwind](https://docs.astro.build/en/guides/styling/)** — how the colour palette and other styling above is applied across the site.

## Learn More

Full Astro documentation: https://docs.astro.build

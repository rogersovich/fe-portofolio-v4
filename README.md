# 🚀 Web Portfolio v4

Personal portfolio built with Nuxt 3. Fully static: all content lives in this repo (Markdown + JSON), every page is prerendered at build time, and the site is hosted on Cloudflare Pages. There is no backend or database.

## ✨ Features

- 💼 **Projects** and 📝 **Blog**: Markdown files rendered with Nuxt Content, with search, topic filter, infinite scroll, and a table of contents
- 👤 **About**: profile, skills, certificates, and experience timeline
- 🎯 **Fun Facts** and **Useful Websites** pages
- 🌙 Dark/light mode, 📱 responsive, 📈 Umami analytics
- 🖼️ Images on Cloudinary, uploaded automatically on commit

## 🛠️ Tech Stack

Nuxt 3, Vue 3, TypeScript, Nuxt Content v3, Tailwind CSS, PrimeVue 4, VueUse, @vueuse/motion, highlight.js, Cloudinary.

## 🚀 Quick Start

Requires **Node.js 22.5+**: Nuxt Content uses the built-in `node:sqlite`. An `.nvmrc` is included.

```bash
nvm use
npm install          # also installs the pre-commit hook
npm run dev          # http://localhost:3000
```

```bash
npm run generate     # static build into .output/public
npm run preview      # serve .output/public locally
```

## 📁 Where content lives

| What | Where |
|---|---|
| Blog posts | `content/blog/<slug>.md` |
| Projects | `content/project/<slug>.md` |
| About, experiences, testimonials, technologies, topics | `data/*.json` |
| Certificates, fun facts, useful websites | hardcoded in their components/pages |
| Draft images (before upload) | `public/uploads/<slug>/` (gitignored) |

The file name is the URL slug: `content/blog/belajar-pinia.md` → `/blog/belajar-pinia`.

## ✍️ Adding a blog post

1. Create `content/blog/<slug>.md`:

   ````md
   ---
   title: "Belajar Pinia di Nuxt 3"
   summary: "Short intro shown on cards. Plain text or simple HTML."
   banner: "/uploads/belajar-pinia/cover.png"
   author: "Dimas Roger Widianto"
   topics:
     - "Frontend"
   isHighlight: false   # true = show on the home page
   ---

   ## Intro

   Your content in Markdown.

   ![Diagram](/uploads/belajar-pinia/diagram.png)

   ```ts
   const store = useCounterStore()
   ```
   ````

2. Put the images in `public/uploads/belajar-pinia/`. They show up in `npm run dev` straight away.
3. `git add content && git commit`. The pre-commit hook then:
   - uploads every `/uploads/...` image to Cloudinary,
   - replaces the paths with Cloudinary URLs and deletes the local files,
   - adds `publishedAt` (today) if it is missing.
4. `git push`. Cloudflare rebuilds and deploys automatically.

Optional frontmatter:

- `updatedAt: "2026-11-01"` moves the post up in "latest" ordering. It is never set automatically, so fixing a typo does not reorder the list.
- `draft: true` hides the post.

Reading time is calculated at build time.

Topics used in posts show up in the blog filter automatically. `data/topics.json` only sets the order and keeps topics without posts.

## 💼 Adding a project

Same flow, in `content/project/<slug>.md`:

```md
---
title: "Kalend"
summary: "Short description for cards."
image: "/uploads/kalend/cover.png"
repositoryUrl: null
websiteUrl: "https://example.com"
technologies:
  - "Nuxt JS"
  - "Tailwind"
isHighlight: true
sortOrder: 1          # position on /project (ascending)
---
```

Technology names should match `data/technologies.json`, which provides the link. Icons come from `public/images/tech/`.

## 🖼️ Images & Cloudinary

- Copy `.env.example` to `.env` and fill in the Cloudinary credentials. They are only used on your machine by the hook and `npm run upload-images`, never in the build.
- Uploads go to `portofolio-v4/<slug>/<content-hash>`. The same image is never uploaded twice.
- `npm run generate` fails if any `/uploads/` path is left, so a local image can never reach production.
- Displayed Cloudinary images get `f_auto,q_auto,w_…` automatically (`cloudinaryUrl` in `composables/usePortfolioContent.ts`).

## ☁️ Deploy: Cloudflare Pages

First-time setup:

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick the repo.
3. Build settings:
   - Framework preset: **None**
   - Build command: `npm run generate`
   - Build output directory: `.output/public`
   - Production branch: `main`
4. **Environment variables** (Production and Preview): `NODE_VERSION` = `22`
5. **Save and Deploy**, then check the site on the `*.pages.dev` URL.
6. **Custom domains** → **Set up a custom domain** → `dimasroger.com`. If the domain's DNS is already on Cloudflare, the record is created for you. Otherwise follow the CNAME instructions shown.

After that, every push to `main` deploys automatically. Pushes to other branches get preview URLs.

**Rollback:** Pages project → **Deployments** → pick an older deployment → **Rollback to this deployment**.

The output is plain static files, so it can also be served from any static host (`npx serve .output/public`, nginx, etc.).

## 🗄️ Migration from the old backend

Content was migrated once from the old Go API / MySQL database with `scripts/migrate-from-sql.mjs <dump.sql>`. The script is kept for reference. Database dumps are gitignored because they contain user credentials.

## 📄 License

MIT

## 👨‍💻 Author

**Dimas Roger Widianto**: [dimasroger.com](https://dimasroger.com) · [@rogersovich](https://github.com/rogersovich)

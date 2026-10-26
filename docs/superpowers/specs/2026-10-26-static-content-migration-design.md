# Desain — Migrasi Web Portfolio ke Konten Statis (tanpa Go API + MySQL)

Tanggal: 2026-10-26
Repo: `web-portofolio-v4` (Nuxt 3)

## 1. Intent & alasan

Pemilik ingin web portfolio berdiri sendiri: tidak lagi bergantung pada backend `go-portofolio-v4` (Gin + GORM + MySQL). Repo Go akan pensiun. Semua data pindah ke file di repo web (Markdown + JSON), dan halaman di-prerender saat build agar tetap cepat dan stabil (tidak ada fetch API saat runtime, tidak ada loading spinner karena latency).

Pemilik malas menulis konten secara manual dan malas upload gambar ke Cloudinary. Workflow menambah konten harus seminimal mungkin.

## 2. Goals

1. Semua halaman publik (`/`, `/project`, `/project/:slug`, `/blog`, `/blog/:slug`, `/about`, `/fun-fact`, `/useful-website`) tampil sama seperti sekarang, minus likes/views.
2. Nol request ke Go API. `NUXT_PUBLIC_API_BASE` dan semua pemanggilan `$fetch`/axios ke API hilang.
3. Data awal diambil dari dump `db_portofolio_export_2026-10-26.sql` (ada di root repo web, untracked).
4. Blog & project ditulis sebagai Markdown via **Nuxt Content (v3)**. Data kecil disimpan sebagai JSON.
5. Gambar baru di-upload ke Cloudinary **otomatis** oleh script yang jalan di pre-commit hook.
6. Hosting pindah ke **Cloudflare Pages**: full static (`nuxt generate`), auto build + deploy setiap push ke GitHub. PM2/VPS tidak dipakai lagi untuk web.
7. Setelah implementasi selesai, pemilik menerima panduan setup Cloudflare Pages langkah demi langkah (§13).

## 3. Non-goals

- Redesign UI, ganti library UI (PrimeVue/Tailwind tetap).
- Fitur likes/views dalam bentuk apapun (dihapus, keputusan pemilik).
- Admin CMS / editor visual di production.
- Perbaikan SEO besar (sitemap, OG per halaman). Boleh: `<title>` detail diambil dari data, bukan dari slug.
- Perubahan apapun di repo Go.

## 4. Anti-goals (gagal walau "jalan")

- Halaman detail blog/project kehilangan konten, gambar, heading, code block, atau TOC setelah konversi HTML→Markdown.
- Ada gambar yang path-nya lokal (`/uploads/...`) ter-deploy ke production lalu 404.
- Kredensial Cloudinary atau isi tabel `users` (email + hash password) masuk ke git atau ke bundle client.
- Workflow nambah konten jadi lebih ribet dari "tulis .md → commit → push".

## 5. Constraints

- Nuxt `^3.15`, PrimeVue 4, Tailwind, dark mode (`@nuxtjs/color-mode`), Umami — tetap.
- Output harus full static (`.output/public`), tanpa server runtime. Tidak boleh ada server route Nitro yang dibutuhkan saat runtime.
- Output static tetap harus bisa disajikan di tempat lain (mis. `pm2 serve .output/public` / nginx) — tidak memakai fitur khusus Cloudflare (Functions, D1, KV).
- Dump SQL berisi tabel `users` → **jangan commit**. Tambahkan `*.sql` ke `.gitignore`.
- Boolean di dump disimpan sebagai `1`/`0` (bukan `Y`/`N` seperti di API). Status blog/project berupa string `Published`.
- Soft delete: hanya baris dengan `deleted_at IS NULL` yang dipakai.

## 6. Keputusan yang sudah diambil

| Topik | Keputusan | Oleh |
|---|---|---|
| Backend | Go API + MySQL tidak dipakai lagi | pemilik |
| Likes & views | Dihapus dari UI dan data | pemilik |
| Admin CMS (`/adminz`, `/authz`) | Dihapus | pemilik |
| Format konten blog/project | Markdown + Nuxt Content | pemilik |
| Gambar | Tetap Cloudinary, upload otomatis via script | pemilik |
| Hosting | Cloudflare Pages (awalnya VPS + PM2, diganti pemilik) | pemilik |
| Rendering | Full static `nuxt generate` | Claude |
| Lokasi gambar draft | `public/uploads/<slug>/...`, dirujuk sebagai `/uploads/...` (bisa di-preview di `nuxt dev`) | Claude |
| Reading time | Dihitung saat build dari isi Markdown | Claude |

## 7. Data: mapping dari dump

Filter umum: `deleted_at IS NULL`. Blog & project: `status = 'Published'`.

Isi dump yang relevan (setelah filter): 4 blog, 15 project, 1 about, 7 experience, 7 testimonial (`is_used=1`), 43 technology, 3 topic aktif, author aktif (id 6, 11, 13).

### 7.1 Blog → `content/blog/<slug>.md`

Frontmatter:

```yaml
title: string
summary: string          # dari blogs.summary (HTML → teks/markdown pendek)
banner: string           # URL Cloudinary
author: string           # nama author (lookup authors.id)
topics: [string]         # nama topic via blog_topics
publishedAt: date
updatedAt: date
isHighlight: boolean
```

Body: `blogs.description_html` dikonversi ke Markdown. Tag yang muncul di data: `a b blockquote code em h1–h4 hr img li mark ol p pre strong ul`. `<mark>` dipertahankan sebagai inline HTML. Code block `<pre><code>` tidak punya kelas bahasa → fence tanpa bahasa boleh.

**Tanggal (keputusan Claude):** `publishedAt` wajib, tapi kalau kosong diisi otomatis dengan tanggal hari ini oleh script pre-commit (§9.2). `updatedAt` opsional dan **hanya diisi manual**, karena kalau di-bump otomatis, perbaikan typo akan membuat post lama naik ke atas. Urutan "terbaru" memakai `updatedAt ?? publishedAt` DESC. Hasil migrasi membawa nilai asli dari dump.

### 7.2 Project → `content/project/<slug>.md`

Frontmatter:

```yaml
title: string
summary: string
image: string            # URL Cloudinary
repositoryUrl: string | null
websiteUrl: string | null
technologies: [string]   # nama technology via project_technologies
publishedAt: date
updatedAt: date
isHighlight: boolean
sortOrder: number
```

Body: `projects.description` (HTML) → Markdown. Pola `<blockquote><h2>` dipakai sebagai section header di project; harus tetap tampil sama.

### 7.3 Data kecil → JSON (mis. `content/data/*.json` sebagai data collection Nuxt Content, atau `data/*.json` di-import langsung — pilihan builder)

| File | Sumber | Field |
|---|---|---|
| `about.json` | `abouts` (`is_used=1`) | title, avatarUrl, descriptionHtml |
| `experiences.json` | `experiences` | position, companyName, workType, country, city, summaryHtml, fromDate, toDate, compImageUrl, compWebsiteUrl, isCurrent |
| `testimonials.json` | `testimonials` (`is_used=1`) | name, via, role, workingAt, message, companyUrl |
| `technologies.json` | `technologies` | name, isMajor, descriptionHtml, link (**tanpa** `logo_url`) |
| `topics.json` | `topics` | name |
| `authors.json` | `authors` aktif | name, avatarUrl |

### 7.4 Dibuang

`users`, `statistics`, `reading_times` (dihitung ulang), `blog_topics`/`project_technologies` (dilebur ke frontmatter), `blog_content_images`/`project_content_images` (hanya tracking upload), `technologies.logo_url` (31 URL MinIO, semuanya mati/timeout; UI publik pakai ikon lokal `/images/tech/*.png` via `useTechIconByName`).

### 7.5 Status gambar (sudah dicek 2026-10-26)

- 105 URL Cloudinary unik di baris aktif → semua HTTP 200.
- 1 URL `localhost:9000` di baris aktif (`blog_content_images` id 1) → tidak dirujuk di HTML blog, ikut dibuang.
- URL `localhost`/MinIO lain hanya ada di baris yang sudah di-soft-delete.

### 7.6 Script konversi

One-off script (mis. `scripts/migrate-from-sql.ts`), menerima path dump sebagai argumen, menghasilkan file 7.1–7.3. Boleh tetap di repo untuk reproducibility; dump-nya tidak. Library HTML→Markdown (mis. `turndown` + plugin GFM) pilihan builder.

## 8. Behaviour halaman publik (harus dipertahankan)

- **Home**: hero; 3 featured project & 3 featured blog = `isHighlight=true`, urut `updatedAt DESC`, limit 3; testimonial carousel.
- **/project**: search judul (debounce boleh tetap), urut `sortOrder ASC`, infinite scroll 5 per batch. Semua filtering/slicing di client terhadap data yang sudah ada di payload. Hapus delay buatan 500ms. Skeleton/empty state tetap.
- **/blog**: search judul + filter multi topic, urut `updatedAt DESC`, infinite scroll 5 per batch. Filter tanggal yang tidak tersambung (`filterDate`) dihapus dari UI.
- **Detail blog/project**: judul, summary, banner/image, info yang tampil sekarang (blog: reading time; project: link repo/website) — author & topics **tidak** ditambahkan ke halaman detail (saat ini hanya ada di `BlogCard`), konten, TOC desktop (sticky) + mobile (drawer), tombol back. Komponen like & angka views/likes dihapus. Slug tidak ada → 404 (`createError`).
- **/about**: about, skills (technologies), certificates (hardcoded, tetap), experience timeline.
- **/fun-fact, /useful-website**: tidak berubah.
- Konten Markdown dirender lewat `<ContentRenderer>`. Syntax highlight boleh pindah ke Shiki bawaan Nuxt Content (build-time) menggantikan highlight.js runtime. TOC boleh pakai `body.toc` dari Nuxt Content.
- HTML dari data (summaryHtml, descriptionHtml) masih dirender `v-html`; datanya dari repo sendiri, sanitasi tidak wajib.

## 9. Gambar Cloudinary

### 9.1 Workflow penulis

1. Taruh gambar di `public/uploads/<slug>/nama.png`.
2. Rujuk di Markdown/frontmatter sebagai `/uploads/<slug>/nama.png` (tampil normal di `nuxt dev`).
3. `git commit` → pre-commit hook menjalankan `scripts/upload-images.ts`.

### 9.2 Script `upload-images`

- Scan `content/**/*.md` dan file JSON data untuk path yang diawali `/uploads/`.
- Upload via SDK `cloudinary` (Node), folder `portofolio-v4/<blog|project|...>`, `public_id` = hash isi file (mis. sha1 16 karakter) → idempotent, gambar sama tidak ter-upload dua kali.
- Ganti path di file dengan `secure_url`, hapus file lokal, `git add` file yang berubah.
- Kredensial dari `.env` lokal: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Tidak masuk `runtimeConfig`, tidak dipakai saat build.
- Mengisi `publishedAt` dengan tanggal hari ini di file `.md` yang di-stage tapi belum punya tanggal itu (lihat §7.1).
- Gagal (offline / kredensial kosong) → commit dibatalkan dengan pesan jelas.
- Bisa dijalankan manual: `npm run upload-images`.
- Hook manager (`simple-git-hooks`, `husky`, dll.) pilihan builder; harus terpasang otomatis lewat `npm install`.

### 9.3 Guard build

Build gagal jika masih ada rujukan `/uploads/` di konten (cegah gambar lokal ter-deploy).

### 9.4 Optimasi tampilan

Semua gambar Cloudinary yang ditampilkan (card, banner, gambar dalam Markdown via komponen `ProseImg` kustom) diberi transform `f_auto,q_auto` + lebar sesuai konteks (sisipkan setelah `/upload/`). Cara implementasi (helper sendiri vs provider cloudinary `@nuxt/image`) pilihan builder.

## 10. Rendering & deploy

- `nuxt generate` → `.output/public`. Semua route publik + semua slug blog/project ter-prerender (crawl link dari `/` dan/atau daftar route eksplisit dari koleksi konten).
- Nuxt Content v3: SQLite hanya dipakai saat build. Query di client (navigasi, search, filter) memakai mekanisme WASM SQLite bawaan Nuxt Content untuk situs static. Build di Cloudflare memakai Node 22 (`NODE_VERSION=22`), jadi connector `native` (`node:sqlite`) aman; builder boleh memilih lain asalkan build Cloudflare lolos.
- Slug tidak dikenal → halaman 404 (`404.html` hasil generate disajikan Cloudflare Pages).
- `routeRules` untuk `/adminz/**` & `/authz/**` dihapus.

## 11. Yang dihapus dari kode

- Pages: `pages/adminz/**`, `pages/authz/**`.
- Middleware `auth`, layout `admin`, `components/base/SidebarMenu.vue`, `components/base/CustomEditor.vue`.
- Komponen like: `BlogButtonLike`, `MobileBlogButtonLike`, `ProjectButtonLike`, `MobileProjectButtonLike`; bagian likes/views di `BlogStatisticInfo`/`ProjectStatisticInfo` (bagian lain tetap).
- Composables `use*API.ts`, `useAxios.ts`; stores `useAuth`, `useSidebar` (dan `useAlert` jika tidak lagi dipakai).
- Dependencies yang jadi tak terpakai (cek dengan grep sebelum hapus): `axios`, `@tiptap/*`, `lowlight`, `zipson`, `pinia-plugin-persistedstate`, `@primevue/forms`, `zod`, dan `highlight.js` bila pindah ke Shiki.
- `runtimeConfig.public.apiBase`.

## 12. Verifikasi

- Bandingkan tiap halaman detail (4 blog, 15 project) dengan production saat ini (`dimasroger.com`) — konten, heading, gambar, code block, TOC.
- `npm run generate && npx serve .output/public`: semua route publik 200, slug acak menampilkan 404, tidak ada request ke host API di tab Network, search & filter topic jalan.
- View-source halaman detail berisi konten (bukti prerender).
- Uji `upload-images`: tambah 1 gambar dummy di `public/uploads/test/`, commit, cek path terganti URL Cloudinary dan file lokal terhapus; commit kedua dengan gambar sama tidak upload ulang.
- Dark/light mode dan mobile (TOC drawer, menu) tetap jalan.

## 13. Rollout

1. Kerjakan di branch terpisah.
2. Builder menyerahkan **panduan setup Cloudflare Pages** (juga ditulis di README): connect repo GitHub, build command `npm run generate`, output directory `.output/public`, env `NODE_VERSION=22`, custom domain `dimasroger.com` (DNS), dan cara rollback deploy.
3. Pemilik mengeksekusi setup Cloudflare; uji di URL `*.pages.dev` dulu, baru pindahkan domain.
4. Setelah stabil, pemilik mematikan `nuxt-portofolio-fe` & `go-portofolio-be` di PM2 serta MySQL (manual, di luar scope builder).
5. Update README web: hapus `NUXT_PUBLIC_API_BASE`, admin, PM2; tambah "Cara nambah konten" dan "Deploy ke Cloudflare Pages".

## 14. Diserahkan ke builder

Struktur folder detail, library HTML→Markdown, hook manager, cara implementasi transform Cloudinary, data collection vs import JSON, Shiki vs highlight.js, dan urutan pengerjaan.

## 15. Open questions

Tidak ada. (Versi Node VPS tidak relevan lagi setelah pindah ke Cloudflare Pages.)

## 16. Catatan implementasi (2026-10-26)

Penyimpangan / keputusan saat implementasi:

- **Node 22.5+ wajib** (`.nvmrc` = 22, `engines.node`). `better-sqlite3` gagal di-compile di Node 20, jadi pakai connector `native` (`node:sqlite`). Nuxt di-upgrade ke `^3.21` karena `@nuxt/content@3.16` butuh Nuxt ≥ 3.19.
- **highlight.js dipertahankan** (Shiki dimatikan), TOC tetap dibangun dari DOM — tampilan code block & TOC sama seperti sebelumnya.
- **`@nuxt/image` provider `none`**: IPX tidak jalan di static hosting (gambar yang dirender di client jadi 404). Optimasi gambar Cloudinary lewat `cloudinaryUrl()`.
- Data kecil di `data/*.json` di-import langsung (bukan data collection Nuxt Content).
- Mapping ke bentuk data lama (`TPublicBlog`, `TPublicProject`, …) ada di `composables/usePortfolioContent.ts`, supaya komponen UI nyaris tidak berubah.
- `public/uploads/` di-gitignore: gambar draft tidak pernah masuk git; build guard (`npm run generate`) gagal jika masih ada rujukan `/uploads/`.
- Topic filter blog = isi `data/topics.json` + topic baru yang dipakai post (otomatis).
- Tag `<p>` di dalam `<li>` hilang setelah konversi (list jadi "tight"); `editor-content.css` diberi style untuk `li` agar tampilan tetap sama.
- Verifikasi: 19 halaman detail dibandingkan dengan HTML asli di dump — jumlah kata, heading, code block, gambar, link, `<mark>` identik.

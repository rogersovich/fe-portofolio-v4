// One-off migration: MySQL dump (old Go backend) -> content/*.md + data/*.json
// Usage: node scripts/migrate-from-sql.mjs <path-to-dump.sql>
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const dumpPath = process.argv[2];
if (!dumpPath) {
  console.error("Usage: node scripts/migrate-from-sql.mjs <dump.sql>");
  process.exit(1);
}

const ROOT = process.cwd();
const src = readFileSync(dumpPath, "utf8");

// --- SQL dump parsing ------------------------------------------------------

const columns = {};
for (const m of src.matchAll(/CREATE TABLE `(\w+)` \(([\s\S]*?)\n\)/g)) {
  columns[m[1]] = [...m[2].matchAll(/^\s*`(\w+)`/gm)].map((c) => c[1]);
}

const ESCAPES = { n: "\n", r: "\r", t: "\t", 0: "\0" };

function parseRows(s) {
  const rows = [];
  let row = null;
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (row === null) {
      if (c === "(") row = [];
      i++;
      continue;
    }
    if (c === "'") {
      let j = i + 1;
      let buf = "";
      for (;;) {
        if (s[j] === "\\") {
          buf += ESCAPES[s[j + 1]] ?? s[j + 1];
          j += 2;
        } else if (s[j] === "'" && s[j + 1] === "'") {
          buf += "'";
          j += 2;
        } else if (s[j] === "'") {
          break;
        } else {
          buf += s[j++];
        }
      }
      row.push(buf);
      i = j + 1;
      continue;
    }
    if (c === ")") {
      rows.push(row);
      row = null;
      i++;
      continue;
    }
    if (c === "," || c === " " || c === "\n") {
      i++;
      continue;
    }
    const raw = s.slice(i).match(/^[^,)]+/)[0];
    row.push(raw.trim() === "NULL" ? null : raw.trim());
    i += raw.length;
  }
  return rows;
}

const db = {};
for (const m of src.matchAll(/INSERT INTO `(\w+)` VALUES ([\s\S]*?);\n/g)) {
  const cols = columns[m[1]];
  db[m[1]] = parseRows(m[2]).map((r) =>
    Object.fromEntries(cols.map((c, idx) => [c, r[idx]]))
  );
}

const live = (rows = []) => rows.filter((r) => r.deleted_at === null);
const bool = (v) => v === "1";
// Dump datetimes are naive local times; keep them as-is (no timezone shift)
const iso = (v) => (v ? v.replace(" ", "T") : null);
const byId = (rows) => Object.fromEntries(live(rows).map((r) => [r.id, r]));

// --- HTML -> Markdown ------------------------------------------------------

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "*",
  hr: "---",
});
turndown.use(gfm);
turndown.keep(["mark"]);

const toMarkdown = (html) =>
  turndown
    .turndown(html || "")
    .replace(/^(\s*)-   /gm, "$1- ")
    .replace(/^(\s*)(\d+)\.  /gm, "$1$2. ")
    .replace(/^[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim() + "\n";

// --- YAML frontmatter ------------------------------------------------------

const yamlValue = (v) => {
  if (v === null || v === undefined) return "null";
  if (typeof v === "boolean" || typeof v === "number") return String(v);
  return JSON.stringify(v);
};

function frontmatter(obj) {
  const lines = ["---"];
  for (const [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      lines.push(`${k}:`);
      for (const item of v) lines.push(`  - ${yamlValue(item)}`);
    } else {
      lines.push(`${k}: ${yamlValue(v)}`);
    }
  }
  lines.push("---", "");
  return lines.join("\n");
}

function writeFile(path, content) {
  mkdirSync(join(ROOT, path, ".."), { recursive: true });
  writeFileSync(join(ROOT, path), content);
  console.log("wrote", path);
}

// --- Lookups ---------------------------------------------------------------

const authors = byId(db.authors);
const topics = byId(db.topics);
const technologies = byId(db.technologies);

const blogTopics = live(db.blog_topics);
const projectTechs = live(db.project_technologies);

// --- Blogs -----------------------------------------------------------------

const blogs = live(db.blogs).filter((b) => b.status === "Published");
for (const b of blogs) {
  const fm = {
    title: b.title,
    summary: b.summary,
    banner: b.banner_url,
    author: authors[b.author_id]?.name ?? null,
    topics: blogTopics
      .filter((bt) => bt.blog_id === b.id && topics[bt.topic_id])
      .map((bt) => topics[bt.topic_id].name),
    publishedAt: iso(b.published_at ?? b.created_at),
    updatedAt: iso(b.updated_at),
    isHighlight: bool(b.is_highlight),
  };
  writeFile(`content/blog/${b.slug}.md`, frontmatter(fm) + toMarkdown(b.description_html));
}

// --- Projects --------------------------------------------------------------

const projects = live(db.projects).filter((p) => p.status === "Published");
for (const p of projects) {
  const fm = {
    title: p.title,
    summary: p.summary,
    image: p.image_url,
    repositoryUrl: p.repository_url || null,
    websiteUrl: p.website_url || null,
    technologies: projectTechs
      .filter((pt) => pt.project_id === p.id && technologies[pt.technology_id])
      .map((pt) => technologies[pt.technology_id].name),
    publishedAt: iso(p.published_at ?? p.created_at),
    updatedAt: iso(p.updated_at),
    isHighlight: bool(p.is_highlight),
    sortOrder: Number(p.sort_order),
  };
  writeFile(`content/project/${p.slug}.md`, frontmatter(fm) + toMarkdown(p.description));
}

// --- Small data -> JSON ----------------------------------------------------

const json = (path, data) => writeFile(path, JSON.stringify(data, null, 2) + "\n");

const about = live(db.abouts).find((a) => bool(a.is_used));
json("data/about.json", {
  title: about.title,
  avatarUrl: about.avatar_url,
  descriptionHtml: about.description_html,
});

json(
  "data/experiences.json",
  live(db.experiences)
    .sort((a, b) => b.from_date.localeCompare(a.from_date))
    .map((e) => ({
      position: e.position,
      companyName: e.company_name,
      workType: e.work_type,
      country: e.country,
      city: e.city,
      summaryHtml: e.summary_html,
      fromDate: e.from_date,
      toDate: e.to_date,
      compImageUrl: e.comp_image_url,
      compWebsiteUrl: e.comp_website_url,
      isCurrent: bool(e.is_current),
    }))
);

json(
  "data/testimonials.json",
  live(db.testimonials)
    .filter((t) => bool(t.is_used))
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .map((t) => ({
      name: t.name,
      via: t.via,
      role: t.role,
      workingAt: t.working_at,
      message: t.message,
      companyUrl: t.company_url,
    }))
);

json(
  "data/technologies.json",
  live(db.technologies).map((t) => ({
    name: t.name,
    isMajor: bool(t.is_major),
    descriptionHtml: t.description_html,
    link: t.link,
  }))
);

json(
  "data/topics.json",
  live(db.topics)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map((t) => t.name)
);

console.log(`\nDone: ${blogs.length} blogs, ${projects.length} projects.`);

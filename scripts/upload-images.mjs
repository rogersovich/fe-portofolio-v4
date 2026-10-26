// Uploads local draft images referenced as /uploads/... to Cloudinary and
// rewrites the references to Cloudinary URLs.
//
//   node scripts/upload-images.mjs          upload + rewrite
//   node scripts/upload-images.mjs --stage  same, then `git add` (pre-commit hook);
//                                           also fills missing publishedAt in staged .md files
//   node scripts/upload-images.mjs --check  fail if any /uploads/ reference is left (build guard)
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = process.cwd();
const CONTENT_DIRS = ["content", "data"];
const UPLOAD_REF = /\/uploads\/[^\s)"'<>]+/g;
const CLOUDINARY_FOLDER = "portofolio-v4";

const mode = process.argv[2] ?? "";

function listFiles(dir) {
  if (!existsSync(join(ROOT, dir))) return [];
  return readdirSync(join(ROOT, dir), { recursive: true })
    .map((f) => join(dir, f))
    .filter((f) => f.endsWith(".md") || f.endsWith(".json"));
}

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

const files = CONTENT_DIRS.flatMap(listFiles);
const refsByFile = new Map();
for (const file of files) {
  const refs = readFileSync(join(ROOT, file), "utf8").match(UPLOAD_REF);
  if (refs) refsByFile.set(file, [...new Set(refs)]);
}

// --- Build guard -------------------------------------------------------------

if (mode === "--check") {
  if (refsByFile.size > 0) {
    const list = [...refsByFile].map(([f, refs]) => `  ${f}: ${refs.join(", ")}`).join("\n");
    fail(
      `Local images are still referenced (they would 404 in production):\n${list}\n` +
        "  Run `npm run upload-images` and commit the result."
    );
  }
  process.exit(0);
}

// --- Fill missing publishedAt in staged markdown -----------------------------

const stagedMarkdown = () =>
  execSync("git diff --cached --name-only --diff-filter=ACM", { encoding: "utf8" })
    .split("\n")
    .filter((f) => /^content\/.+\.md$/.test(f));

const changed = new Set();

if (mode === "--stage") {
  const today = new Date().toISOString().slice(0, 10);
  for (const file of stagedMarkdown()) {
    const text = readFileSync(join(ROOT, file), "utf8");
    const fm = text.match(/^---\n([\s\S]*?)\n---/);
    if (fm && !/^publishedAt:/m.test(fm[1])) {
      writeFileSync(join(ROOT, file), text.replace(/^---\n/, `---\npublishedAt: "${today}"\n`));
      changed.add(file);
      console.log(`• ${file}: publishedAt set to ${today}`);
    }
  }
}

// --- Upload ------------------------------------------------------------------

if (refsByFile.size > 0) {
  // Credentials live only in the local .env, never in the build
  if (existsSync(join(ROOT, ".env"))) {
    for (const line of readFileSync(join(ROOT, ".env"), "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    fail(
      "Found /uploads/ images but Cloudinary credentials are missing.\n" +
        "  Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env"
    );
  }

  const { v2: cloudinary } = await import("cloudinary");
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });

  const uploaded = new Map();
  for (const ref of new Set([...refsByFile.values()].flat())) {
    const localPath = join(ROOT, "public", ref);
    if (!existsSync(localPath)) fail(`${ref} is referenced but public${ref} does not exist`);

    // Content hash as public_id: re-running never uploads the same image twice
    const hash = createHash("sha1").update(readFileSync(localPath)).digest("hex").slice(0, 16);
    const folder = `${CLOUDINARY_FOLDER}/${ref.split("/")[2]}`;
    try {
      const result = await cloudinary.uploader.upload(localPath, {
        folder,
        public_id: hash,
        overwrite: false,
        resource_type: "image",
      });
      uploaded.set(ref, result.secure_url);
      console.log(`• ${ref} → ${result.secure_url}`);
    } catch (err) {
      fail(`Upload failed for ${ref}: ${err.message ?? err.error?.message ?? err}`);
    }
  }

  for (const [file, refs] of refsByFile) {
    let text = readFileSync(join(ROOT, file), "utf8");
    for (const ref of refs) text = text.replaceAll(ref, uploaded.get(ref));
    writeFileSync(join(ROOT, file), text);
    changed.add(file);
  }

  for (const ref of uploaded.keys()) {
    const localPath = join(ROOT, "public", ref);
    rmSync(localPath);
    // Drop the now-empty slug folder too
    const dir = dirname(localPath);
    if (dir !== join(ROOT, "public", "uploads") && readdirSync(dir).length === 0) {
      rmSync(dir, { recursive: true });
    }
  }
}

if (mode === "--stage" && changed.size > 0) {
  // public/uploads/ is gitignored, so only the rewritten content files need staging
  execSync(`git add -- ${[...changed].map((f) => JSON.stringify(f)).join(" ")}`, {
    stdio: "inherit",
  });
}

if (changed.size === 0) console.log("upload-images: nothing to do");

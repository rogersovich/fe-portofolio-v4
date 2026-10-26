import aboutData from "~/data/about.json";
import experiencesData from "~/data/experiences.json";
import technologiesData from "~/data/technologies.json";
import testimonialsData from "~/data/testimonials.json";
import topicsData from "~/data/topics.json";
import type { TPublicBlog } from "~/types/blog.type";
import type { TPublicProject } from "~/types/project.type";
import type { TPublicProfile } from "~/types/about.type";
import type { TPublicTestimonial } from "~/types/testimonial.type";
import type { TPublicTopic } from "~/types/topic.type";

// Same rules as the old Go backend: "Next.js" -> "nextjs", "C++" -> "cpp"
export const toTechSlug = (name: string) =>
  name
    .toLowerCase()
    .replaceAll("c++", "cpp")
    .replaceAll("c#", "csharp")
    .replaceAll(".net", "dotnet")
    .replaceAll(".", "")
    .replaceAll(" ", "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

/** Adds Cloudinary auto format/quality (+ width) to an upload URL; other URLs pass through. */
export const cloudinaryUrl = (url: string, width?: number) => {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) {
    return url;
  }
  const transform = ["f_auto", "q_auto", width ? `w_${width}` : null]
    .filter(Boolean)
    .join(",");
  return url.replace("/image/upload/", `/image/upload/${transform}/`);
};

const slugFromPath = (path: string) => path.split("/").pop() as string;

// "Latest" = last manual update, falling back to the publish date
const latestDate = (item: { updatedAt?: string | null; publishedAt: string }) =>
  item.updatedAt || item.publishedAt;

const BLOG_LIST_FIELDS = [
  "path",
  "title",
  "summary",
  "banner",
  "author",
  "topics",
  "publishedAt",
  "updatedAt",
  "isHighlight",
  "readingSeconds",
] as const;

const PROJECT_LIST_FIELDS = [
  "path",
  "title",
  "summary",
  "image",
  "repositoryUrl",
  "websiteUrl",
  "technologies",
  "publishedAt",
  "updatedAt",
  "isHighlight",
  "sortOrder",
] as const;

const toPublicBlog = (b: any): TPublicBlog => ({
  id: b.path,
  title: b.title,
  banner_url: cloudinaryUrl(b.banner, 1200),
  summary: b.summary,
  slug: slugFromPath(b.path),
  is_highlight: b.isHighlight,
  published_at: b.publishedAt,
  updated_at: latestDate(b),
  author: { id: b.author, name: b.author },
  reading_time: { estimated_seconds: b.readingSeconds },
  topics: b.topics.map((name: string) => ({ id: name, name })),
});

const toPublicProject = (p: any): TPublicProject => ({
  id: p.path,
  title: p.title,
  summary: p.summary,
  image_url: cloudinaryUrl(p.image, 1200),
  repository_url: p.repositoryUrl ?? "",
  website_url: p.websiteUrl ?? "",
  slug: slugFromPath(p.path),
  is_highlight: p.isHighlight,
  sort_order: p.sortOrder,
  published_at: p.publishedAt,
  updated_at: latestDate(p),
  technologies: p.technologies.map((name: string) => ({
    tech_id: name,
    tech_name: name,
    tech_slug: toTechSlug(name),
    tech_link: technologiesData.find((t) => t.name === name)?.link ?? "",
  })),
});

const byLatestDesc = (a: { updated_at: string }, b: { updated_at: string }) =>
  b.updated_at.localeCompare(a.updated_at);

/** All published blogs, newest first (body excluded). */
export const fetchBlogs = async () => {
  const items = await queryCollection("blog")
    .where("draft", "=", false)
    .select(...BLOG_LIST_FIELDS)
    .all();
  return items.map(toPublicBlog).sort(byLatestDesc);
};

/** All published projects ordered by sortOrder (body excluded). */
export const fetchProjects = async () => {
  const items = await queryCollection("project")
    .where("draft", "=", false)
    .select(...PROJECT_LIST_FIELDS)
    .all();
  return items
    .map(toPublicProject)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
};

/** Highlighted items for the home page, newest first. */
export const fetchFeaturedBlogs = async (limit = 3) =>
  (await fetchBlogs()).filter((b) => b.is_highlight).slice(0, limit);

export const fetchFeaturedProjects = async (limit = 3) =>
  (await fetchProjects())
    .filter((p) => p.is_highlight)
    .sort(byLatestDesc)
    .slice(0, limit);

export const fetchBlog = async (slug: string) => {
  const blog = await queryCollection("blog").path(`/blog/${slug}`).first();
  if (!blog || blog.draft) return null;
  return { ...toPublicBlog(blog), body: blog };
};

export const fetchProject = async (slug: string) => {
  const project = await queryCollection("project").path(`/project/${slug}`).first();
  if (!project || project.draft) return null;
  return { ...toPublicProject(project), body: project };
};

/** Case-insensitive match on title or summary, like the old API search. */
export const matchesSearch = (
  item: { title: string; summary: string },
  search: string
) => {
  const q = search.trim().toLowerCase();
  if (!q) return true;
  return (
    item.title.toLowerCase().includes(q) ||
    item.summary.toLowerCase().includes(q)
  );
};

/** Topics from data/topics.json plus any new topic used in a post. */
export const getTopics = (blogs: TPublicBlog[] = []): TPublicTopic[] => {
  const names = new Set<string>(topicsData);
  blogs.forEach((blog) => blog.topics.forEach((topic) => names.add(topic.name)));
  return [...names].map((name) => ({ id: name, name }));
};

export const getTestimonials = (): TPublicTestimonial[] =>
  testimonialsData.map((t) => ({
    id: t.name,
    name: t.name,
    via: t.via,
    role: t.role,
    working_at: t.workingAt,
    message: t.message,
    company_url: t.companyUrl,
  }));

export const getProfile = (): TPublicProfile => {
  const current = experiencesData.find((e) => e.isCurrent);
  return {
    about: {
      title: aboutData.title,
      description_html: aboutData.descriptionHtml,
      avatar_url: cloudinaryUrl(aboutData.avatarUrl, 400),
    },
    current_work: current
      ? {
          position: current.position,
          company_name: current.companyName,
          work_type: current.workType,
          country: current.country,
          city: current.city,
          comp_website_url: current.compWebsiteUrl,
        }
      : null,
    technologies: technologiesData
      .filter((t) => t.isMajor)
      .map((t) => ({ tech_id: t.name, name: t.name, slug: toTechSlug(t.name) })),
    experiences: experiencesData.map((e) => ({
      position: e.position,
      company_name: e.companyName,
      work_type: e.workType,
      country: e.country,
      city: e.city,
      comp_website_url: e.compWebsiteUrl,
      summary_html: e.summaryHtml,
      from_date: e.fromDate,
      to_date: e.toDate,
      comp_image_url: cloudinaryUrl(e.compImageUrl, 160),
      is_current: e.isCurrent,
    })),
  };
};

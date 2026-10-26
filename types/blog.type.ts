export interface TBlogTopic {
  id: string;
  name: string;
}

export interface TBlogReadingTime {
  estimated_seconds: number;
}

export interface TPublicBlog {
  id: string;
  title: string;
  banner_url: string;
  summary: string;
  slug: string;
  is_highlight: boolean;
  published_at: string;
  updated_at: string;
  author: { id: string; name: string };
  reading_time: TBlogReadingTime;
  topics: TBlogTopic[];
}

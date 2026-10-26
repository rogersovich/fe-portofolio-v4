export interface TProjectTechnology {
  tech_id: string;
  tech_name: string;
  tech_slug: string;
  tech_link: string;
}

export interface TPublicProject {
  id: string;
  title: string;
  summary: string;
  image_url: string;
  repository_url: string;
  website_url: string;
  slug: string;
  is_highlight: boolean;
  sort_order: number;
  published_at: string;
  updated_at: string;
  technologies: TProjectTechnology[];
}

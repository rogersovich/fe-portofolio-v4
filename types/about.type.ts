export interface TPublicAbout {
  title: string;
  description_html: string;
  avatar_url: string;
}

export interface TPublicCurrentWork {
  position: string;
  company_name: string;
  work_type: string;
  country: string;
  city: string;
  comp_website_url: string;
}

export interface TPublicTechnology {
  tech_id: string;
  name: string;
  slug: string;
}

export interface TPublicExperience {
  position: string;
  company_name: string;
  work_type: string;
  country: string;
  city: string;
  comp_website_url: string;
  summary_html: string;
  from_date: string;
  to_date: string;
  comp_image_url: string;
  is_current: boolean;
}

export interface TPublicProfile {
  about: TPublicAbout;
  current_work: TPublicCurrentWork | null;
  technologies: TPublicTechnology[];
  experiences: TPublicExperience[];
}

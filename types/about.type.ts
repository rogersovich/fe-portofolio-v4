import type { TBaseResponse } from "./base.type"

export interface TAbout {
  id: number
  title: string
  description_html: string
  avatar_file_name: string
  avatar_url: string
  is_used: "Y" | "N"
  created_at: string
}

export interface TPublicAbout {
  about_id: number
  title: string
  description_html: string
  avatar_url: string
  avatar_file_name: string
}

export interface TPublicCurrentWork {
  position: string
  company_name: string
  work_type: string
  country: string
  city: string
  comp_website_url: string
}

export interface TPublicTechnology {
  tech_id: number
  name: string
  slug: string
}

export interface TPublicExperience {
  position: string
  company_name: string
  work_type: string
  country: string
  city: string
  comp_website_url: string
  summary_html: string
  from_date: string
  to_date: string
  comp_image_url: string
  comp_image_file_name: string
  is_current: string
}

export interface TPublicProfile {
  about: TPublicAbout
  current_work: TPublicCurrentWork
  technologies: TPublicTechnology[]
  experiences: TPublicExperience[]
}

export type TPublicProfileResponse = TBaseResponse<TPublicProfile>;
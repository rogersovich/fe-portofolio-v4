import type { TBasePaginateParams, TBaseSortingParams } from "./base.type"

export interface TExperience {
  id: number
  position: string
  company_name: string
  work_type: string
  country: string
  city: string
  summary_html: string
  from_date: string
  to_date: string
  comp_image_url: string
  comp_image_file_name: string
  comp_website_url: string
  is_current: string
  created_at: string
}

export interface TParamsFilterExperience {
  company_name?: string
  position?: string
  work_type?: string
  country?: string
  city?: string
  from_date?: string
  to_date?: string
  summary_html?: string
  is_current?: string
}

export type TBaseParamsExperience = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterExperience>

export interface TExperienceEdit {
  position: string
  company_name: string
  work_type: string
  country: string
  city: string
  summary_html: string
  from_date: Date | null
  to_date: Date | null
  comp_image_url: string
  comp_website_url: string
  is_current: string
}

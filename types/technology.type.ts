import type { TBasePaginateParams, TBaseSortingParams } from "./base.type"

export interface TTechnology {
  id: number
  name: string
  description_html: string
  logo_file_name: string
  logo_url: string
  is_major: string
  link: string
  created_at: string
}

export interface TParamsFilterTechnology {
  name?: string
  description_html?: string
  is_major?: string
  created_at?: string
}

export type TBaseParamsTechnology = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterTechnology>

export interface TPublicTechnology {
  id: number
  name: string
  logo_url: string
  logo_file_name: string
  is_major: string
}
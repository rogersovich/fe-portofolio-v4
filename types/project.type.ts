import type { TBasePaginateParams, TBaseSortingParams } from "./base.type"

export interface TProject {
  id: number
  title: string
  description: string
  image_url: string
  image_file_name: string
  repository_url: string
  summary: string
  status: string
  slug: string
  published_at: string
  created_at: string
}

export interface TParamsFilterProject {
  title?: string
  status?: string
  published_at?: string
  created_at?: string
}

export type TBaseParamsProject = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterProject>
import type { TBasePaginateParams, TBasePaginateResponse, TBaseResponse, TBaseSortingParams } from "./base.type"

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

export interface TProjectDetail {
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
  statistic_id: number
  statistic: {
    id: number
    likes: number
    views: number
    type: string
  }
  technologies: {
    project_tech_id: number
    tech_id: number
    tech_name: string
  }[]
  images: {
    project_image_id: number,
    image_url: string
    image_file_name: string
  }[]
}

export interface TParamsFilterProject {
  title?: string
  status?: string
  published_at?: string
  created_at?: string
}

export type TBaseParamsProject = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterProject>

export interface TPublicProject {
  id: number
  title: string
  summary: string
  image_url: string
  image_file_name: string
  repository_url: string
  slug: string
  published_at: string
  technologies: {
    tech_id: number
    tech_name: string
    tech_logo_url: string
    tech_logo_file_name: string
    tech_link: string
  }[]
}

export interface TParamsFilterPublicProject {
  page: string
  limit: string
  sort?: string
  order?: string
  search?: string
}

export interface TPublicProjectDetail {
  id: number
  title: string
  description: string
  summary: string
  image_url: string
  image_file_name: string
  repository_url: string
  slug: string
  status: string
  published_at: string
  statistic: {
    id: number
    likes: number
    views: number
    type: string
  }
  technologies: {
    tech_id: number
    tech_name: string
    tech_logo_url: string
    tech_logo_file_name: string
    tech_link: string
  }[]
  images: {
    id: number,
    url: string
    file_name: string
  }[]
}

type TPublicProjectPaginateResponse = TBasePaginateResponse<TPublicProject[]>;

export type TPublicProjectListResponse = TBaseResponse<TPublicProjectPaginateResponse>;
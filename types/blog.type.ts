import type { TBasePaginateParams, TBaseSortingParams } from "./base.type"

export interface TBlog {
  id: number
  statistic_id: number
  reading_time_id: string
  author_id: string
  title: string
  description_html: string
  banner_url: string
  banner_file_name: string
  summary: string
  status: string
  slug: string
  published_at: string
  created_at: string
}

export interface TBlogDetail {
  id: number
  title: string
  description_html  : string
  banner_url: string
  banner_file_name: string
  repository_url: string
  summary: string
  status: string
  slug: string
  published_at: string
  created_at: string
  statistic_id: number
  author: {
    id: number
    name: string
  },
  reading_time: {
    id: number
    minutes: number
    text_length: number
    estimated_seconds: number
    word_count: number
    type: string  
  },
  statistic: {
    id: number
    likes: number
    views: number
    type: string
  }
  topics: {
    id: number
    name: string
  }[]
  images: {
    id: number,
    image_url: string
    image_file_name: string
  }[]
}

export interface TParamsFilterBlog {
  title?: string
  status?: string
  published_at?: string
  created_at?: string
}

export type TBaseParamsBlog = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterBlog>
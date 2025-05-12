import type { TBasePaginateParams, TBasePaginateResponse, TBaseResponse, TBaseSortingParams } from "./base.type";

export interface TBlog {
  id: number;
  statistic_id: number;
  reading_time_id: string;
  author_id: string;
  title: string;
  description_html: string;
  banner_url: string;
  banner_file_name: string;
  summary: string;
  status: string;
  slug: string;
  published_at: string;
  created_at: string;
}

export interface TBlogDetail {
  id: number;
  title: string;
  description_html: string;
  banner_url: string;
  banner_file_name: string;
  repository_url: string;
  summary: string;
  status: string;
  slug: string;
  published_at: string;
  created_at: string;
  statistic_id: number;
  author: TBlogAuthor;
  reading_time: TBlogReadingTime;
  statistic: TBlogStatistic;
  topics: TBlogTopic[];
  images: TBlogImage[];
}

export interface TBlogAuthor {
  id: number;
  name: string;
}

export interface TBlogReadingTime {
  id: number;
  minutes: number;
  text_length: number;
  estimated_seconds: number;
  word_count: number;
  type: string;
}

export interface TBlogStatistic {
  id: number;
  likes: number;
  views: number;
  type: string;
}

export interface TBlogTopic {
  id: number;
  name: string;
}

export interface TBlogImage {
  id: number;
  image_url: string;
  image_file_name: string;
}

export interface TParamsFilterBlog {
  title?: string;
  status?: string;
  published_at?: string;
  created_at?: string;
}

export type TBaseParamsBlog = TBasePaginateParams &
  Partial<TBaseSortingParams> &
  Partial<TParamsFilterBlog>;

export interface TPublicBlog {
  id: number;
  title: string;
  banner_url: string;
  banner_file_name: string;
  summary: string;
  slug: string;
  published_at: string;
  author: TBlogAuthor;
  reading_time: TBlogReadingTime;
  statistic: TBlogStatistic;
  topics: TBlogTopic[];
}

export interface TParamsFilterPublicBlog {
  page: string;
  limit: string;
  sort?: string;
  order?: string;
  search?: string;
}

type TPublicBlogPaginateResponse = TBasePaginateResponse<TPublicBlog[]>;

export type TPublicBlogListResponse = TBaseResponse<TPublicBlogPaginateResponse>;

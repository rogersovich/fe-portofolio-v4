import type { TBasePaginateParams, TBaseSortingParams } from "./base.type"

export interface TAuthor {
  id: number
  name: string
  avatar_file_name: string
  avatar_url: string
  created_at: string
}

export interface TParamsFilterAuthor {
  name?: string
  created_at?: string
}

export type TBaseParamsAuthor = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterAuthor>;

export interface TPublicAuthor {
  id: number
  name: string
  avatar_url: string
  avatar_file_name: string
}
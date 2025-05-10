import type { TBasePaginateParams, TBaseSortingParams } from "./base.type"

export interface TStatistic {
  id: number
  type: string
  likes: string
  views: string
  created_at: string
}

export interface TParamsFilterStatistic {
  type?: string
  min_likes?: string
  max_likes?: string
  min_views?: string
  max_views?: string
  created_at?: string
}

export type TBaseParamsStatistic = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterStatistic>
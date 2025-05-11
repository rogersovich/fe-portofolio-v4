import type { TBasePaginateParams, TBaseSortingParams } from "./base.type"

export interface TTopic {
  id: number
  name: string
  created_at: string
}

export interface TParamsFilterTopic {
  name?: string
  created_at?: string
}

export type TBaseParamsTopic = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterTopic>

export interface TPublicTopic {
  id: number
  name: string
}
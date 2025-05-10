import type { TBasePaginateParams, TBaseSortingParams } from "./base.type"

export interface TReadingTime {
  id: number
  type: string
  minutes: string
  text_length: string
  estimated_seconds: string
  word_count: string
  created_at: string
}

export interface TParamsFilterReadingTime {
  type?: string
  min_minutes?: string
  max_minutes?: string
  min_estimates?: string
  max_estimates?: string
  created_at?: string
}

export type TBaseParamsReadingTime = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterReadingTime>
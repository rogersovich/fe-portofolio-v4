import type { TBasePaginateParams, TBaseSortingParams } from "./base.type"

export interface TTestomonial {
  id: number
  name: string
  via: string
  role: string
  working_at: string
  is_used: string
  created_at: string
}

export interface TParamsFilterTestomonial {
  type?: string
  name?: string
  role?: string
  working_at?: string
  is_used?: string
  created_at?: string
}

export type TBaseParamsTestomonial = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterTestomonial>
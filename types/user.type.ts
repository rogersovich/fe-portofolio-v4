import type { TBasePaginateParams, TBaseSortingParams } from "./base.type"

export interface TMasterUser {
  id: number
  username: string
  email: string
  created_at: string
}

export interface TParamsFilterMasterUser {
  username?: string
  email?: string
  created_at?: string
}

export type TBaseParamsUser = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterMasterUser>
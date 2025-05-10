import type { TBasePaginateParams, TBaseSortingParams } from "./base.type"

export interface TMasterUser {
  id: number
  name: string
  avatar_file_name: string
  avatar_url: string
  created_at: string
}

export interface TParamsFilterMasterUser {
  username?: string
  email?: string
  created_at?: string
}

export type TBaseParamsUser = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterMasterUser>
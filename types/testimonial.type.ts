import type { TBasePaginateParams, TBaseResponse, TBaseSortingParams } from "./base.type"

export interface TTestimonial {
  id: number
  name: string
  via: string
  role: string
  working_at: string
  message: string
  is_used: string
  created_at: string
}

export interface TParamsFilterTestimonial {
  type?: string
  name?: string
  role?: string
  working_at?: string
  is_used?: string
  created_at?: string
}

export type TBaseParamsTestimonial = TBasePaginateParams & Partial<TBaseSortingParams> & Partial<TParamsFilterTestimonial>

export interface TPublicTestimonial {
  id: number
  name: string
  via: string
  role: string
  working_at: string
  message: string
  is_used: string
  image?: string
  created_at: string
}

export type TPublicTestimonialResponse = TBaseResponse<TPublicTestimonial[]>;
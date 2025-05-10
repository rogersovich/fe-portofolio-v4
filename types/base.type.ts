export interface TBaseResponse<T> {
  data: T;
  status: string;
  message: string;
}
export interface TBasePaginateResponse<T> {
  items: T;
  pagination: TBasePaginateInfoResponse;
}
export interface TBasePaginateInfoResponse {
  limit: number;
  page: number;
  total: number;
}

export interface TBasePaginateParams {
  limit: number;
  page: number;
}

export interface TBaseSortingParams {
  sort: string;
  order: string;
}

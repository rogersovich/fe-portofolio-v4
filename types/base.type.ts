export interface TBaseResponse<T> {
  data: T;
  status: string;
  message: string;
}

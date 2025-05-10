export interface TAuthor {
  id: number
  name: string
  avatar_file_name: string
  avatar_url: string
  created_at: string
}

export interface TParamsFilterAuthor {
  name?: string
}
export interface TAuth {
  token: string;
  user: TUser | null;
}

export interface TUser {
  id: number;
  username: string;
  email: string;
}

export interface TLoginResponse {
  id: number;
  username: string;
  email: string;
  token: string;
}

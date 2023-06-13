export interface TPayload {
  email: string;
  exp: number;
  rol: "ADMIN" | "USER";
}

export interface IUser {
  checking: "loading" | "success" | "no-user";
  user: TPayload | null;
  token: string | null;
}

export type IUserLogin = Omit<IUser, "checking">;

export interface IUserContext extends IUser {
  login: (user: IUserLogin) => void;
  logout: () => void;
}

export type TAction =
  | { type: "login"; payload: IUserLogin }
  | { type: "logout" }
  | { type: "checking" };

import type { IUser, TAction } from "../../types/userContext";

export const userReducer = (state: IUser, action: TAction): IUser => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        checking: "success",
        token: action.payload.token,
      };

    case "logout":
      return {
        checking: "no-user",
        token: null,
        user: null,
      };

    case "checking":
      return {
        ...state,
        checking: "loading",
      };

    default:
      return state;
  }
};

import { createContext, useEffect, useReducer } from "react";
import type { IUser, IUserContext, IUserLogin } from "../types/userContext";
import { userReducer } from "./reducers/userReducer";
import { API } from "../api";

const INIT_VALUE = {} as IUserContext;
const INIT_USER = {
  checking: "loading",
  token: null,
  user: null,
} as IUser;

type TResponse =
  | {
      error: string;
      data: null;
    }
  | {
      error: null;
      data: {
        email: string;
        name: string;
        rol: "ADMIN" | "USER";
        exp: number;
        token: string;
      };
    };

export const UserContext = createContext(INIT_VALUE);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, INIT_USER);

  const checking = () => {
    dispatch({
      type: "checking",
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({
      type: "logout",
    });
  };

  const login = (dataUser: IUserLogin) => {
    if (dataUser.token && dataUser.user) {
      localStorage.setItem("token", dataUser.token);
      localStorage.setItem("user", JSON.stringify(dataUser.user));
      dispatch({
        type: "login",
        payload: dataUser,
      });
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return logout();
      }
      checking();
      const res = await fetch(API + "/verify", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const { data, error } = (await res.json()) as TResponse;

      if (data == null) {
        return logout();
      }

      if (error) {
        return logout();
      }

      login({
        token: data.token,
        user: {
          email: data.email,
          exp: data.exp,
          rol: data.rol,
        },
      });
    };

    verifyUser();
  }, []);

  return (
    <UserContext.Provider value={{ ...state, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

import { useCallback, useState } from "react";
import { API } from "../api";
// import { IUser } from "../types/userContext";

interface IUserLogin {
  token: string;
  payload: { email: string; exp: number; rol: "ADMIN" | "USER" };
}

type TLogin =
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

export const useLoginApi = (): [
  (email: string, password: string) => void,
  {
    data: IUserLogin | null;
    loading: boolean;
    error: { message: string } | null;
  }
] => {
  const [data, setData] = useState<IUserLogin | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const loginFake = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      email,
      password,
    });
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: myHeaders,
      body: raw,
    });
    const { data: dataLogin, error: errorLogin } = (await res.json()) as TLogin;
    setLoading(false);
    if (dataLogin == null) {
      setData(null);
      setError({
        message: errorLogin,
      });
      return;
    }
    setData({
      payload: {
        email: dataLogin.email,
        exp: dataLogin.exp,
        rol: dataLogin.rol,
      },
      token: dataLogin.token,
    });
    setError(null);
    setLoading(false);
  }, []);
  return [
    loginFake,
    {
      data,
      loading,
      error,
    },
  ];
};

import { useState, useCallback } from "react";
import { API, getHeader } from "../api";

interface informes {
  id: number;
  type: "ROTACION_DEL_PERSONAL" | "AUSENTISMO_LABORAL";
}
interface ICompaniesData {
  id: number;
  nameComercial: string;
  nit: string;
  informes: informes[];
}

type TResCompanies =
  | {
      data: ICompaniesData;
      error: null;
    }
  | {
      data: null;
      error: string;
    };

export const useCompaniesApi = (): [
  () => void,
  {
    data: ICompaniesData | null;
    loading: boolean;
    error: { message: string } | null;
  }
] => {
  const [data, setData] = useState<ICompaniesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const getCompanies = useCallback(async () => {
    console.log("hello");
    const token = localStorage.getItem("token");
    if (token == null) {
      setData(null);
      setLoading(false);
      setError({ message: "No tienes permiso" });
      return;
    }
    const headers = getHeader(token);
    const requestOptionsUser = {
      method: "GET",
      headers,
    };
    setLoading(true);
    const res = await fetch(API + "/companies", requestOptionsUser);
    const { data: dataCompanies, error: errorCompanies } =
      (await res.json()) as TResCompanies;
    setLoading(false);
    if (dataCompanies == null) {
      setData(null);
      setError({
        message: errorCompanies,
      });
      return;
    }
    setData(dataCompanies);
    setError(null);
  }, []);

  return [
    getCompanies,
    {
      data,
      loading,
      error,
    },
  ];
};

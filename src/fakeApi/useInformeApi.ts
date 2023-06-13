import { useState, useCallback } from "react";
import { API, getHeader } from "../api";

interface IInformeData {
  MES: string;
  OBSERVACION: string;
  X: string;
  [keyOne: string]: string;
}

interface IData {
  chart: IInformeData[];
  info: {
    type: "ROTACION_DEL_PERSONAL" | "AUSENTISMO_LABORAL";
    companyName: string;
  };
}

type TResInforme =
  | {
      data: IData;
      error: null;
    }
  | {
      data: null;
      error: string;
    };

export const useInformeApi = (): [
  (id: number) => void,
  {
    data: IData | null;
    loading: boolean;
    error: { message: string } | null;
  }
] => {
  const [data, setData] = useState<IData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const getInforme = useCallback(async (id: number) => {
    const token = localStorage.getItem("token");
    if (token == null) {
      setData(null);
      setLoading(false);
      setError({ message: "No tienes permiso" });
      return;
    }
    const headers = getHeader(token);
    const requestOptionsInforme = {
      method: "GET",
      headers,
    };
    setLoading(true);

    const res = await fetch(`${API}/informe/${id}`, requestOptionsInforme);
    const { data: dataInforme, error: errorInforme } =
      (await res.json()) as TResInforme;
    setLoading(false);
    if (dataInforme == null) {
      setData(null);
      setError({
        message: errorInforme,
      });
      return;
    }
    setData(dataInforme);
    setError(null);
  }, []);

  return [
    getInforme,
    {
      data,
      loading,
      error,
    },
  ];
};

export const getId = (str: string): number => {
  const decode = window.atob(str);

  const id = decode.split(":")[1];

  return Number(id) || 0;
};

export const parsePrice = (num: number): string => {
  if (Number(num)) {
    return num.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });
  }

  return "$ 0.00";
};

const ROUTES: { [key: string]: string } = {
  reportes: "Lista de reportes",
  admin: "Dashboard",
  "add-company": "Agregar compañía",
  "": "",
  reporte: "Ver reporte",
};
export const getRouteName = (route: string): string => {
  const routeName = ROUTES[route] as string | undefined;

  return routeName ?? "Not found";
};

export const getTitle = (
  type: "ROTACION_DEL_PERSONAL" | "AUSENTISMO_LABORAL"
) => {
  if (type === "ROTACION_DEL_PERSONAL") {
    return "Rotación del personal";
  }
  if (type === "AUSENTISMO_LABORAL") {
    return "Ausentismo laboral";
  }
  return "";
};

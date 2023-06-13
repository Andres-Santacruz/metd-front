// export const API = "http://localhost:4000/api";
export const API =
  import.meta.env.VITE_BASE_URL_API || "http://localhost:4000/api";

export const getHeader = (token: string) => {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  return headers;
};

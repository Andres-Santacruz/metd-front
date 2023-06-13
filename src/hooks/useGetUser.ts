import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useGetUser = () => {
  const res = useContext(UserContext);
  return { ...res };
};

import { createContext } from "react";

interface ISidebarContext {
  sidebarWidth: number;
  setSidebarWidth: React.Dispatch<React.SetStateAction<number>>;
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext({} as ISidebarContext);

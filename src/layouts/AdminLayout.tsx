import {
  Portal,
  Box,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import "../assets/css/plugin-styles.css";
// import Configurator from "../components/Configurator/Configurator";
import Footer from "../components/Footer/Footer";
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { SidebarContext } from "../contexts/SidebarContext";
// import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom ../components
// Layout ../components
import { useState } from "react";
import "react-quill/dist/quill.snow.css"; // ES6
import { Link, Route, Routes } from "react-router-dom";

/* import NotFoundPage from "../views/NotFoundPage";
import Default from "../views/Dashboard/Default";
import NewUser from "../views/Pages/Users/NewUser";
import Settings from "../views/Pages/Account/Settings"; */
import img from "../assets/img/logo.png";
import HomePage from "../pages/HomePage.js";
import AddCompanyPage from "../pages/AddCompanyPage.js";
import { ReportesPage } from "../pages/Reportes.js";
import { OneReportePage } from "../pages/OneReportePage.js";

interface IDocument extends HTMLElement {
  layout: string;
}

// Custom Chakra theme
export default function AdminLayout() {
  // const { ...rest } = props;
  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(275);
  // ref for main panel div
  // const mainPanel = React.createRef();
  // functions for changing the states from components
  /* const getActiveRoute = (routes: IRoutes[] | undefined): string => {
    let activeRoute = "Default Brand Text";
    if (routes) {
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].collapse) {
          let collapseActiveRoute = getActiveRoute(routes[i].items);
          if (collapseActiveRoute !== activeRoute) {
            return collapseActiveRoute;
          }
        } else if (routes[i].category) {
          let categoryActiveRoute = getActiveRoute(routes[i].items);
          if (categoryActiveRoute !== activeRoute) {
            return categoryActiveRoute;
          }
        } else {
          if (
            window.location.href.indexOf(
              `${routes[i].layout}${routes[i].path}`
            ) !== -1
          ) {
            return routes[i].name;
          }
        }
      }
    }
    return activeRoute;
  }; */
  /* const getActiveNavbar = (routes: IRoutes[] | undefined): boolean => {
    let activeNavbar = false;
    if (routes) {
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].collapse) {
          let collapseActiveNavbar = getActiveNavbar(routes[i].items);
          if (collapseActiveNavbar !== activeNavbar) {
            return collapseActiveNavbar;
          }
        } else if (routes[i].category) {
          let categoryActiveNavbar = getActiveNavbar(routes[i].items);
          if (categoryActiveNavbar !== activeNavbar) {
            return categoryActiveNavbar;
          }
        } else {
          if (
            window.location.href.indexOf(
              `${routes[i].layout}${routes[i].path}`
            ) !== -1
          ) {
            return routes[i]?.secondaryNavbar || false;
          }
        }
      }
    }
    return activeNavbar;
  }; */
  /* const getRoutes = useCallback((routes: IRoutes[]): any[] => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin" || prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            element={prop.component}
            key={key}
          />
        );
      }
      if (prop?.collapse && prop.items) {
        return getRoutes(prop.items);
      }
      if (prop.category && prop.items) {
        return getRoutes(prop.items);
      } else {
        return null;
      }
    });
  }, []); */

  const bgBoxHeight = "40vh";
  const bgBoxColor = useColorModeValue("#2d538b", "navy.900");

  const { onOpen } = useDisclosure();
  document.documentElement.dir = "ltr";
  (document.documentElement as IDocument).layout = "admin";
  // Chakra Color Mode
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          sidebarWidth,
          setSidebarWidth,
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Box
          minH={bgBoxHeight}
          h="100% !important"
          w="100%"
          position="absolute"
          bg={bgBoxColor}
          top="0"
        />
        <Sidebar
          // routes={routes}
          logo={
            <Box display="flex" alignItems="center" justifyContent="center">
              <Link to="/admin">
                <img src={img} width="60px" />
              </Link>
            </Box>
          }
          display="none"
          // {...rest}
        />
        <MainPanel
          w={{
            base: "100%",
            xl: `calc(100% - ${sidebarWidth}px)`,
          }}
        >
          <Portal>
            <Box>
              <AdminNavbar
                onOpen={onOpen}
                logoText={"METD"}
                brandText={"Inicio"}
                secondary={false}
                fixed
                // {...rest}
              />
            </Box>
          </Portal>

          <PanelContent>
            <PanelContainer>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add-company" element={<AddCompanyPage />} />
                <Route path="/reportes" element={<ReportesPage />} />
                <Route
                  path="/reporte/:idInforme"
                  element={<OneReportePage />}
                />
                <Route path="/new-user" element={<div>new user</div>} />
                <Route
                  path="/user-settings/:identificationNumber"
                  element={<div>settings</div>}
                />
                <Route path="*" element={<div children="no found" />} />
              </Routes>
            </PanelContainer>
          </PanelContent>

          <Box>
            <Footer />
          </Box>
          {/* <Portal>
            <Box>
              <FixedPlugin fixed={fixed} onOpen={onOpen} />
            </Box>
          </Portal> */}
          {/* <Configurator
            secondary={getActiveNavbar(routes)}
            isOpen={isOpen}
            onClose={onClose}
            isChecked={fixed}
            onSwitch={(value) => {
              setFixed(value);
            }}
          /> */}
        </MainPanel>
      </SidebarContext.Provider>
    </Box>
  );
}

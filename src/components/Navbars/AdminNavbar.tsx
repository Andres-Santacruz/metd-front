import { useState, useEffect, useContext, ReactNode } from "react";
// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { SidebarContext } from "../../contexts/SidebarContext";
import AdminNavbarLinks from "./AdminNavbarLinks";
import { getRouteName } from "../../helpers";

interface IAdminNavbarProps {
  variant?: string;
  children?: ReactNode;
  fixed: boolean;
  secondary: boolean;
  brandText: string;
  onOpen: () => void;
  logoText: string;
}

export default function AdminNavbar(props: IAdminNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  const { sidebarWidth, setSidebarWidth, toggleSidebar, setToggleSidebar } =
    useContext(SidebarContext);

  const location = useLocation();

  console.log("location nav", location);

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  }, []);

  const { fixed, brandText } = props;

  const navbarBgGradient = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const navbarShadowColor = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  const navbarBorderColor = useColorModeValue(
    "#FFFFFF",
    "rgba(255, 255, 255, 0.31)"
  );
  const nacbarFilterColor = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  const mainText1 = useColorModeValue("gray.700", "gray.200");
  const mainText2 = useColorModeValue("white", "gray.200");
  let mainText = fixed && scrolled ? mainText1 : mainText2;
  let secondaryText = fixed && scrolled ? mainText1 : mainText2;
  let navbarPosition: "static" | "relative" | "absolute" | "sticky" | "fixed" =
    "absolute";
  let navbarFilter = "none";
  let navbarBackdrop = "blur(20px)";
  let navbarShadow = "none";
  let navbarBg = "none";
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let paddingX = "15px";
  if (props.fixed === true)
    if (scrolled === true) {
      navbarPosition = "fixed";
      navbarShadow = navbarShadowColor;
      navbarBg = navbarBgGradient;
      navbarBorder = navbarBorderColor;
      navbarFilter = nacbarFilterColor;
    }
  if (props.secondary) {
    navbarBackdrop = "none";
    navbarPosition = "absolute";
    mainText = "white";
    secondaryText = "white";
    secondaryMargin = "22px";
    paddingX = "30px";
  }
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Flex
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      borderRadius="16px"
      display="flex"
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      // mx="auto"
      mt={secondaryMargin}
      pb="8px"
      left={document.documentElement.dir === "rtl" ? "30px" : ""}
      right={document.documentElement.dir === "rtl" ? "" : "30px"}
      px={{
        sm: paddingX,
        md: "30px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top="18px"
      w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 275px)" }}
    >
      <Flex
        w="90%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
      >
        <Box mb={{ sm: "8px", md: "0px" }}>
          <Breadcrumb>
            <BreadcrumbItem color={mainText}>
              <BreadcrumbLink as={Link} href="/" to="/" color={mainText}>
                {brandText}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem color={mainText}>
              <BreadcrumbLink as={Link} href="#" to="#" color={secondaryText}>
                {getRouteName(location.pathname.split("/")[1])}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* Here we create navbar brand, based on route name */}
          {/* <Link
            color={mainText}
            href="#"
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            _hover={{ color: { mainText } }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            {brandText}
          </Link> */}
        </Box>
        <HamburgerIcon
          w="100px"
          h="20px"
          ms="10px"
          color="#fff"
          cursor="pointer"
          display={{ sm: "none", xl: "block" }}
          onClick={() => {
            setSidebarWidth(sidebarWidth === 275 ? 120 : 275);
            setToggleSidebar(!toggleSidebar);
          }}
        />
        <Box ms="auto" w={{ sm: "80%", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
            scrolled={scrolled}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

/* AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
}; */

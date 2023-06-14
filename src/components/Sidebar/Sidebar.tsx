import { useContext, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  ColorMode,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  List,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import IconBox from "../Icons/IconBox";
import {
  renderThumbDark,
  renderThumbLight,
  renderTrack,
  renderTrackRTL,
  renderView,
  renderViewRTL,
} from "../Scrollbar/Scrollbar";
import { HSeparator } from "../Separator/Separator";
import { SidebarContext } from "../../contexts/SidebarContext";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FaHome } from "react-icons/fa";
// import SidebarDocs from "./SidebarDocs";
import { MdOutlineDashboard } from "react-icons/md";
import { BsBuildingAdd } from "react-icons/bs";
import { AiOutlineBarChart } from "react-icons/ai";
import { useGetUser } from "../../hooks/useGetUser";

// FUNCTIONS
interface ISidebarProps {
  landing?: boolean;
  logo: JSX.Element;
  display: string;
}
function Sidebar(props: ISidebarProps) {
  const { user } = useGetUser();
  // to check for active links and opened collapses
  const location = useLocation();

  const { landing } = props;

  // this is for the rest of the collapses
  const { sidebarWidth, setSidebarWidth, toggleSidebar } =
    useContext(SidebarContext);

  const variantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => location.pathname === routeName;
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const CreateLinks = () => {
    // Chakra Color Mode
    const activeBg = "blue.500";
    // const inactiveBg = useColorModeValue("transparent", "navy.700");
    const activeColor = useColorModeValue("blue.500", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    const activeColorIcon = "white";
    // const inactiveColorIcon = "blue.500";

    return (
      <Box>
        {/* acordiantion */}

        <Accordion allowToggle defaultIndex={[0]}>
          <AccordionItem border="none">
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="center"
              _focus={{
                boxShadow: "none",
              }}
              borderRadius="8px"
              w={{
                sm: sidebarWidth === 275 ? "100%" : "77%",
                xl: sidebarWidth === 275 ? "90%" : "70%",
                md: sidebarWidth === 275 ? "80%" : "60%",
                "2xl": sidebarWidth === 275 ? "95%" : "77%",
              }}
              bg={"transparent"}
              ms={sidebarWidth !== 275 ? "12px" : undefined}
            >
              <Flex
                fontWeight="bold"
                boxSize="initial"
                justifyContent="flex-start"
                alignItems="center"
                bg="transparent"
                transition={variantChange}
                mx={{
                  xl: "auto",
                }}
                px="0px"
                borderRadius="8px"
                w="100%"
                _hover={{}}
                _active={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                  border: "none",
                }}
                _focus={{
                  transform: "none",
                  borderColor: "transparent",
                  border: "none",
                }}
              >
                <Flex justify={sidebarWidth === 275 ? "flex-start" : "center"}>
                  <IconBox
                    bg={activeBg}
                    color={activeColorIcon}
                    h="30px"
                    w="30px"
                    me={sidebarWidth === 275 ? "12px" : "0px"}
                    transition={variantChange}
                  >
                    <MdOutlineDashboard />
                  </IconBox>
                  <Text
                    color={activeColor}
                    my="auto"
                    fontSize="sm"
                    display={sidebarWidth === 275 ? "block" : "none"}
                  >
                    Panel
                  </Text>
                </Flex>
              </Flex>
              {/* {false ? (
                
            ) : (
                <Flex
                  fontWeight="bold"
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg="transparent"
                  mx={{
                    xl: "auto",
                  }}
                  px="0px"
                  borderRadius="8px"
                  w="100%"
                  _hover={{}}
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    borderColor: "transparent",
                    boxShadow: "none",
                  }}
                >
                  <Flex
                    justifyContent={
                      sidebarWidth === 275 ? "flex-start" : "center"
                    }
                  >
                    <IconBox
                      bg={inactiveBg}
                      color={inactiveColorIcon}
                      h="30px"
                      w="30px"
                      me={sidebarWidth === 275 ? "12px" : "0px"}
                      transition={variantChange}
                    >
                      <MdOutlineDashboard />
                    </IconBox>
                    <Text
                      color={inactiveColor}
                      my="auto"
                      fontSize="sm"
                      display={sidebarWidth === 275 ? "block" : "none"}
                    >
                      Panel
                    </Text>
                  </Flex>
                </Flex>
                  )} */}
              <AccordionIcon
              // color={landing ? "white" : "gray.400"}
              /* display={
            prop.icon
              ? sidebarWidth === 275
                ? "block"
                : "none"
              : sidebarWidth === 275
              ? "block"
              : "none"
          } */
              /* transform={
            prop.icon
              ? undefined
              : sidebarWidth === 275
              ? undefined
              : "translateX(-70%)"
          } */
              />
            </AccordionButton>
            <AccordionPanel
              // pe={prop.icon ? undefined : "0px"}
              pb="8px"
              // ps={prop.icon ? undefined : sidebarWidth === 275 ? undefined : "8px"}
            >
              <List>
                <NavLink to="/">
                  <ListItem
                    // key={key}
                    ms={sidebarWidth === 275 ? undefined : "10px"}
                  >
                    <HStack
                      spacing={sidebarWidth === 275 ? "26px" : "8px"}
                      py="5px"
                      px={sidebarWidth === 275 ? "10px" : "0px"}
                    >
                      <Icon
                        as={FaHome}
                        // w={activeRoute(prop.path.toLowerCase()) ? "10px" : "6px"}
                        // color={landing ? "white" : "blue.500"}
                        display={sidebarWidth === 275 ? "block" : "none"}
                      />
                      <Text
                        color={activeRoute("/") ? activeColor : inactiveColor}
                        /* fontWeight={
                      activeRoute(prop.path.toLowerCase()) ? "bold" : "normal"
                    } */
                      >
                        Inicio
                      </Text>
                    </HStack>
                  </ListItem>
                </NavLink>

                {user?.rol === "ADMIN" && (
                  <NavLink to="/add-company">
                    <ListItem
                      // key={key}
                      ms={sidebarWidth === 275 ? undefined : "10px"}
                    >
                      <HStack
                        spacing={sidebarWidth === 275 ? "26px" : "8px"}
                        py="5px"
                        px={sidebarWidth === 275 ? "10px" : "0px"}
                      >
                        <Icon
                          as={BsBuildingAdd}
                          // w={activeRoute(prop.path.toLowerCase()) ? "10px" : "6px"}
                          // color={landing ? "white" : "blue.500"}
                          display={sidebarWidth === 275 ? "block" : "none"}
                        />
                        <Text
                          color={
                            activeRoute("/add-company")
                              ? activeColor
                              : inactiveColor
                          }
                          /* fontWeight={
                      activeRoute(prop.path.toLowerCase()) ? "bold" : "normal"
                    } */
                        >
                          Agregar empresa
                        </Text>
                      </HStack>
                    </ListItem>
                  </NavLink>
                )}

                <NavLink to="/reportes">
                  <ListItem
                    // key={key}
                    ms={sidebarWidth === 275 ? undefined : "10px"}
                  >
                    <HStack
                      spacing={sidebarWidth === 275 ? "26px" : "8px"}
                      py="5px"
                      px={sidebarWidth === 275 ? "10px" : "0px"}
                    >
                      <Icon
                        as={AiOutlineBarChart}
                        // w={activeRoute(prop.path.toLowerCase()) ? "10px" : "6px"}
                        // color={landing ? "white" : "blue.500"}
                        display={sidebarWidth === 275 ? "block" : "none"}
                      />
                      <Text
                        color={
                          activeRoute("/reportes") ? activeColor : inactiveColor
                        }
                        /* fontWeight={
                      activeRoute(prop.path.toLowerCase()) ? "bold" : "normal"
                    } */
                      >
                        Reportes
                      </Text>
                    </HStack>
                  </ListItem>
                </NavLink>
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* acordiantion */}
      </Box>
    );

    /* if (landing) {
      activeBg = "white";
      inactiveBg = "transparent";
      activeColor = "white";
      inactiveColor = "white";
      sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
      activeAccordionBg = "rgba(255, 255, 255, 0.11)";
      activeColorIcon = "blue.500";
      inactiveColorIcon = "white";
    }

    return routes.map((prop, key) => {
      if (prop.category) {
        return (
          <Box key={key}>
            <Text
              fontSize={sidebarWidth === 275 ? "md" : "xs"}
              color={activeColor}
              fontWeight="bold"
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pt="18px"
              pb="12px"
              key={key}
            >
              {prop.name}
            </Text>
            {CreateLinks(prop.items)}
          </Box>
        );
      }
      if (prop.collapse) {
        return (
          <Accordion key={key} allowToggle>
            <AccordionItem border="none">
              <AccordionButton
                display="flex"
                align="center"
                justify="center"
                boxShadow={
                  activeRoute(prop.path) && prop.icon
                    ? sidebarActiveShadow
                    : null
                }
                _hover={{
                  boxShadow:
                    activeRoute(prop.path) && prop.icon
                      ? sidebarActiveShadow
                      : null,
                }}
                _focus={{
                  boxShadow: "none",
                }}
                borderRadius="8px"
                w={{
                  sm: sidebarWidth === 275 ? "100%" : "77%",
                  xl: sidebarWidth === 275 ? "90%" : "70%",
                  "2xl": sidebarWidth === 275 ? "95%" : "77%",
                }}
                px={prop.icon ? undefined : "0px"}
                py={prop.icon ? "12px" : undefined}
                bg={
                  activeRoute(prop.path) && prop.icon
                    ? activeAccordionBg
                    : "transparent"
                }
                ms={
                  sidebarWidth !== 275
                    ? !prop.icon
                      ? "12px"
                      : "8px"
                    : undefined
                }
              >
                {activeRoute(prop.path) ? (
                  <Flex
                    fontWeight="bold"
                    boxSize="initial"
                    justifyContent="flex-start"
                    alignItems="center"
                    bg="transparent"
                    transition={variantChange}
                    mx={{
                      xl: "auto",
                    }}
                    px="0px"
                    borderRadius="8px"
                    w="100%"
                    _hover={{}}
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                      border: "none",
                    }}
                    _focus={{
                      transform: "none",
                      borderColor: "transparent",
                      border: "none",
                    }}
                  >
                    {prop.icon ? (
                      <Flex
                        justify={sidebarWidth === 275 ? "flex-start" : "center"}
                      >
                        <IconBox
                          bg={activeBg}
                          color={activeColorIcon}
                          h="30px"
                          w="30px"
                          me={sidebarWidth === 275 ? "12px" : "0px"}
                          transition={variantChange}
                        >
                          {prop.icon}
                        </IconBox>
                        <Text
                          color={activeColor}
                          my="auto"
                          fontSize="sm"
                          display={sidebarWidth === 275 ? "block" : "none"}
                        >
                          {prop.name}
                        </Text>
                      </Flex>
                    ) : (
                      <HStack
                        spacing={sidebarWidth === 275 ? "22px" : "0px"}
                        ps={sidebarWidth === 275 ? "10px" : "0px"}
                        ms={sidebarWidth === 275 ? "0px" : "8px"}
                      >
                        <Icon
                          as={FaCircle}
                          w="10px"
                          color="blue.500"
                          display={sidebarWidth === 275 ? "block" : "none"}
                        />
                        <Text color={activeColor} my="auto" fontSize="sm">
                          {sidebarWidth === 275 ? prop.name : prop.name[0]}
                        </Text>
                      </HStack>
                    )}
                  </Flex>
                ) : (
                  <Flex
                    fontWeight="bold"
                    boxSize="initial"
                    justifyContent="flex-start"
                    alignItems="center"
                    bg="transparent"
                    mx={{
                      xl: "auto",
                    }}
                    px="0px"
                    borderRadius="8px"
                    w="100%"
                    _hover={{}}
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                    }}
                    _focus={{
                      borderColor: "transparent",
                      boxShadow: "none",
                    }}
                  >
                    {prop.icon ? (
                      <Flex
                        justify={sidebarWidth === 275 ? "flex-start" : "center"}
                      >
                        <IconBox
                          bg={inactiveBg}
                          color={inactiveColorIcon}
                          h="30px"
                          w="30px"
                          me={sidebarWidth === 275 ? "12px" : "0px"}
                          transition={variantChange}
                        >
                          {prop.icon}
                        </IconBox>
                        <Text
                          color={inactiveColor}
                          my="auto"
                          fontSize="sm"
                          display={sidebarWidth === 275 ? "block" : "none"}
                        >
                          {prop.name}
                        </Text>
                      </Flex>
                    ) : (
                      <HStack
                        spacing={sidebarWidth === 275 ? "26px" : "0px"}
                        ps={sidebarWidth === 275 ? "10px" : "0px"}
                        ms={sidebarWidth === 275 ? "0px" : "8px"}
                      >
                        <Icon
                          as={FaCircle}
                          w="6px"
                          color={landing ? "white" : "blue.500"}
                          display={sidebarWidth === 275 ? "block" : "none"}
                        />
                        <Text
                          color={inactiveColor}
                          my="auto"
                          fontSize="md"
                          fontWeight="normal"
                        >
                          {sidebarWidth === 275 ? prop.name : prop.name[0]}
                        </Text>
                      </HStack>
                    )}
                  </Flex>
                )}
                <AccordionIcon
                  color={landing ? "white" : "gray.400"}
                  display={
                    prop.icon
                      ? sidebarWidth === 275
                        ? "block"
                        : "none"
                      : sidebarWidth === 275
                      ? "block"
                      : "none"
                  }
                  transform={
                    prop.icon
                      ? undefined
                      : sidebarWidth === 275
                      ? undefined
                      : "translateX(-70%)"
                  }
                />
              </AccordionButton>
              <AccordionPanel
                pe={prop.icon ? undefined : "0px"}
                pb="8px"
                ps={
                  prop.icon
                    ? undefined
                    : sidebarWidth === 275
                    ? undefined
                    : "8px"
                }
              >
                <List>
                  {
                    prop.icon
                      ? CreateLinks(prop.items) // for bullet accordion links
                      : createAccordionLinks(prop.items) // for non-bullet accordion links
                  }
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      } else {
        return (
          <NavLink key={key} to={prop.layout + prop.path}>
            {prop.icon ? (
              <Box>
                <HStack spacing="14px" py="15px" px="15px">
                  <IconBox
                    bg="blue.500"
                    color="white"
                    h="30px"
                    w="30px"
                    transition={variantChange}
                  >
                    {prop.icon}
                  </IconBox>
                  <Text
                    color={
                      activeRoute(prop.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={activeRoute(prop.name) ? "bold" : "normal"}
                    fontSize="sm"
                  >
                    {prop.name}
                  </Text>
                </HStack>
              </Box>
            ) : (
              <ListItem
                key={key}
                ms={sidebarWidth === 275 ? undefined : "10px"}
              >
                <HStack
                  spacing={
                    sidebarWidth === 275
                      ? activeRoute(prop.path.toLowerCase())
                        ? "22px"
                        : "26px"
                      : "8px"
                  }
                  py="5px"
                  px={sidebarWidth === 275 ? "10px" : "0px"}
                >
                  <Icon
                    as={FaCircle}
                    w={activeRoute(prop.path.toLowerCase()) ? "10px" : "6px"}
                    color={landing ? "white" : "blue.500"}
                    display={sidebarWidth === 275 ? "block" : "none"}
                  />
                  <Text
                    color={
                      activeRoute(prop.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(prop.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {sidebarWidth === 275 ? prop.name : prop.name[0]}
                  </Text>
                </HStack>
              </ListItem>
            )}
          </NavLink>
        );
      }
    }); */
  };

  /* const createAccordionLinks = (routes) => {
    let inactiveColor = useColorModeValue("gray.400", "gray.400");
    let activeColor = useColorModeValue("gray.700", "white");

    if (landing) {
      inactiveColor = "white";
      activeColor = "white";
    }

    return routes.map((prop, key) => {
      return (
        <NavLink key={key} to={prop.layout + prop.path}>
          <ListItem
            key={key}
            pt="5px"
            ms={sidebarWidth === 275 ? "26px" : "12px"}
          >
            <Text
              mb="4px"
              color={
                activeRoute(prop.path.toLowerCase())
                  ? activeColor
                  : inactiveColor
              }
              fontWeight={
                activeRoute(prop.path.toLowerCase()) ? "bold" : "normal"
              }
              fontSize="sm"
            >
              {sidebarWidth === 275 ? prop.name : prop.name[0]}
            </Text>
          </ListItem>
        </NavLink>
      );
    });
  }; */

  // let isWindows = navigator.platform.startsWith("Win");
  const links = <Box>{CreateLinks()}</Box>;
  //  BRAND
  //  Chakra Color Mode
  const sidebarBg = useColorModeValue("white", "navy.800");
  const sidebarRadius = "20px";
  const sidebarMargins = "0px";
  const brand = (
    <Flex direction="column" pt={"25px"}>
      {props.logo}
      <HSeparator my="20px" />
    </Flex>
  );

  const sidebarContent = (
    <Box>
      <Box>{brand}</Box>
      <Stack direction="column" mb="40px">
        <Box>{links}</Box>
      </Stack>
      {/* <SidebarDocs landing={landing} /> */}
    </Box>
  );

  // SIDEBAR
  return (
    <Box
      onMouseEnter={
        toggleSidebar
          ? () => setSidebarWidth(sidebarWidth === 120 ? 275 : 120)
          : undefined
      }
      onMouseLeave={
        toggleSidebar
          ? () => setSidebarWidth(sidebarWidth === 275 ? 120 : 275)
          : undefined
      }
    >
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg={landing ? "transparent" : sidebarBg}
          transition={variantChange}
          w={`${sidebarWidth}px`}
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
        >
          <Scrollbars
            autoHide
            renderTrackVertical={
              document.documentElement.dir === "rtl"
                ? renderTrackRTL
                : renderTrack
            }
            renderThumbVertical={useColorModeValue(
              renderThumbLight,
              renderThumbDark
            )}
            renderView={
              document.documentElement.dir === "rtl"
                ? renderViewRTL
                : renderView
            }
          >
            {sidebarContent}
          </Scrollbars>
        </Box>
      </Box>
    </Box>
  );
}

// FUNCTIONS
interface ISidebarResponProps extends BoxProps {
  logo: JSX.Element;
  colorMode?: ColorMode;
  secondary?: boolean;
}
export function SidebarResponsive(props: ISidebarResponProps) {
  // to check for active links and opened collapses
  // const location = useLocation();

  const variantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  /* const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  }; */

  // Chakra Color Mode
  const inactiveBg = useColorModeValue("transparent", "navy.700");
  const inactiveColor = useColorModeValue("gray.400", "gray.400");
  const inactiveColorIcon = "blue.500";
  const sidebarBackgroundColor = useColorModeValue("white", "navy.900");

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const CreateLinks = () => {
    return (
      <Box>
        {/* {CreateLinks(prop.items)} */}

        <Accordion allowToggle>
          <AccordionItem border="none">
            <AccordionButton
              as="div"
              display="flex"
              alignItems="center"
              justifyContent="center"
              // key={key}
              borderRadius="8px"
              // px={prop.icon ? undefined : "0px"}
              // py={prop.icon ? "12px" : undefined}
              /* boxShadow={
          activeRoute(prop.path) && prop.icon ? sidebarActiveShadow : "none"
        } */
              /* bg={
          activeRoute(prop.path) && prop.icon
            ? activeAccordionBg
            : "transparent"
        } */
            >
              <Text
                as="span"
                fontWeight="bold"
                boxSize="initial"
                justifyContent="flex-start"
                alignItems="center"
                bg="transparent"
                mx={{
                  xl: "auto",
                }}
                px="0px"
                borderRadius="8px"
                _hover={{}}
                w="100%"
                _active={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Flex>
                  <IconBox
                    bg={inactiveBg}
                    color={inactiveColorIcon}
                    h="30px"
                    w="30px"
                    me="12px"
                    transition={variantChange}
                  >
                    <MdOutlineDashboard />
                  </IconBox>
                  <Text color={inactiveColor} my="auto" fontSize="sm">
                    Panel
                  </Text>
                </Flex>
              </Text>
              <AccordionIcon color="gray.400" />
            </AccordionButton>
            <AccordionPanel pb="8px">
              <List>
                {/* initi */}
                <NavLink to={"/admin"}>
                  <Box>
                    <HStack spacing="14px" py="15px" px="15px">
                      <IconBox
                        bg="blue.500"
                        color="white"
                        h="5px"
                        w="5px"
                        transition={variantChange}
                      ></IconBox>
                      <Text
                        /* color={
                          activeRoute(prop.path.toLowerCase())
                            ? activeColor
                            : inactiveColor
                        } */
                        // fontWeight={activeRoute(prop.name) ? "bold" : "normal"}
                        fontSize="sm"
                      >
                        Inicio
                      </Text>
                    </HStack>
                  </Box>
                </NavLink>
                {/* initi */}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* {CreateLinks(prop.items)} */}
      </Box>
    );
  };

  /* const createAccordionLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavLink key={key} to={prop.layout + prop.path}>
          <ListItem pt="5px" ms="26px" key={key}>
            <Text
              color={
                activeRoute(prop.path.toLowerCase())
                  ? activeColor
                  : inactiveColor
              }
              fontWeight={
                activeRoute(prop.path.toLowerCase()) ? "bold" : "normal"
              }
              fontSize="sm"
            >
              {prop.name}
            </Text>
          </ListItem>
        </NavLink>
      );
    });
  }; */
  const { logo, display } = props;

  const links = <Box>{CreateLinks()}</Box>;
  //  BRAND
  //  Chakra Color Mode
  const hamburgerColor = "white";

  const brand = (
    <Box pt={"25px"} mb="12px">
      {logo}
      <HSeparator my="26px" />
    </Box>
  );

  // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<SVGSVGElement>(null);
  // Color variables
  return (
    <Box display={display}>
      <Box display={{ sm: "flex", xl: "none" }} ms="8px">
        <HamburgerIcon
          color={hamburgerColor}
          w="18px"
          h="18px"
          me="16px"
          ref={btnRef}
          cursor="pointer"
          onClick={onOpen}
        />
        <Drawer
          placement={document.documentElement.dir === "rtl" ? "right" : "left"}
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent
            w="250px"
            bg={sidebarBackgroundColor}
            maxW="250px"
            ms={{
              sm: "16px",
            }}
            my={{
              sm: "16px",
            }}
            borderRadius="16px"
          >
            <DrawerCloseButton
              _focus={{ boxShadow: "none" }}
              _hover={{ boxShadow: "none" }}
            />
            <DrawerBody maxW="250px" px="1rem">
              <Box maxW="100%" h="100vh">
                <Box mb="20px">{brand}</Box>
                <Stack direction="column" mb="40px">
                  <Box>{links}</Box>
                </Stack>
                {/* <SidebarDocs /> */}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
}
// PROPS

export default Sidebar;

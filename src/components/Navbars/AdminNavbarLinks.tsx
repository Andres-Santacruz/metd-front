// Chakra Imports
import {
  Button,
  Flex,
  Text,
  Stack,
  Box,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// Custom Icons
import {
  ArgonLogoDark,
  ChakraLogoDark,
  ArgonLogoLight,
  ChakraLogoLight,
  ProfileIcon,
} from "../Icons/Icons";

// import { ItemContent } from "../Menu/ItemContent";
import { SearchBar } from "./SearchBar/SearchBar";
import { SidebarResponsive } from "../Sidebar/Sidebar";
// import { NavLink } from "react-router-dom";
// import routes from "../../routes";
import { ReactElement } from "react";
import { useGetUser } from "../../hooks/useGetUser";

interface IHeaderLinksProps {
  variant?: string;
  fixed: boolean;
  secondary: boolean;
  onOpen: () => void;
  scrolled: boolean;
  children?: ReactElement;
  logoText: string;
}

export default function HeaderLinks(props: IHeaderLinksProps) {
  const { fixed, scrolled, secondary, ...rest } = props;
  const { user, logout } = useGetUser();
  const { colorMode } = useColorMode();

  // Chakra Color Mode
  const navbarIconColor1 = useColorModeValue("gray.700", "gray.200");
  const navbarIconColor2 = useColorModeValue("white", "gray.200");
  let navbarIcon = fixed && scrolled ? navbarIconColor1 : navbarIconColor2;
  if (secondary) {
    navbarIcon = "white";
  }
  return (
    <Flex
      pe={{ sm: "0px", md: "12px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <SearchBar me="18px" />
      {/* <NavLink to="/auth/signin"> */}
      {user && (
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="no-effects"
          rightIcon={
            document.documentElement.dir ? undefined : (
              <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            )
          }
          leftIcon={
            document.documentElement.dir ? (
              <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            ) : undefined
          }
          onClick={() => logout()}
        >
          <Text display={{ sm: "none", md: "flex" }}>Cerrar sesión</Text>
        </Button>
      )}
      {/* </NavLink> */}
      <SidebarResponsive
        logo={
          <Stack direction="row" spacing="12px" align="center" justify="center">
            {colorMode === "dark" ? (
              <ArgonLogoLight w="74px" h="27px" />
            ) : (
              <ArgonLogoDark w="74px" h="27px" />
            )}
            <Box
              w="1px"
              h="20px"
              bg={colorMode === "dark" ? "white" : "gray.700"}
            />
            {colorMode === "dark" ? (
              <ChakraLogoLight w="82px" h="21px" />
            ) : (
              <ChakraLogoDark w="82px" h="21px" />
            )}
          </Stack>
        }
        colorMode={colorMode}
        secondary={props.secondary}
        // routes={routes}
        {...rest}
      />
      {/* <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        onClick={props.onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      /> */}
      {/* <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px" bg={menuBg}>
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                aName="Alicia"
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                boldInfo=""
                aName="Kara"
                aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu> */}
    </Flex>
  );
}

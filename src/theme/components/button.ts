import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

/* interface ButtonVariant {
  fontSize: string;
  bg: string;
  color: string;
  _hover: Record<string, any>;
  _focus: Record<string, any>;
  _active: Record<string, any>;
} */

/* interface ButtonStyles {
  [key: string]: {
    baseStyle: {
      fontWeight: string;
      borderRadius: string;
      fontSize: string;
    };
    variants: Record<string, ButtonVariant>;
  };
} */

export const buttonStyles = {
  components: {
    Button: {
      variants: {
        primary: {
          fontSize: "10px",
          bg: "blue.400",
          color: "#fff",
          _hover: { bg: "blue.300" },
          _focus: { bg: "blue.300" },
          _active: { bg: "blue.300" },
        },
        navy: {
          fontSize: "10px",
          bg: "navy.900",
          color: "#fff",
          _hover: { bg: "navy.800" },
          _focus: { bg: "navy.800" },
          _active: { bg: "navy.800" },
        },
        "no-effects": {
          _hover: {},
          _active: {},
          _focus: {},
        },
        danger: () => ({
          color: "white",
          bg: "red.500",
          fontSize: "10px",
          _hover: "red.400",
          _focus: "red.400",
          _active: "red.400",
        }),
        outlined: (props: StyleFunctionProps) => ({
          color: mode("blue.400", "white")(props),
          bg: "transparent",
          fontSize: "10px",
          border: "1px solid",
          borderColor: { bg: mode("blue.400", "white")(props) },
          _hover: { bg: mode("blue.50", "transparent")(props) },
          _focus: { bg: mode("blue.50", "transparent")(props) },
          _active: { bg: mode("blue.50", "transparent")(props) },
        }),
        dark: (props: StyleFunctionProps) => ({
          color: "white",
          bg: mode("gray.700", "blue.500")(props),
          fontSize: "10px",
          _hover: { bg: mode("gray.700", "blue.500")(props) },
          _focus: { bg: mode("gray.700", "blue.600")(props) },
          _active: { bg: mode("gray.700", "blue.400")(props) },
        }),
        light: (props: StyleFunctionProps) => ({
          color: mode("gray.700", "gray.700")(props),
          bg: mode("gray.100", "white")(props),
          fontSize: "10px",
          _hover: { bg: mode("gray.50", "white")(props) },
          _focus: { bg: mode("gray.50", "white")(props) },
          _active: { bg: mode("gray.50", "white")(props) },
        }),
      },
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "8px",
        fontSize: "10px",
      },
    },
  },
};

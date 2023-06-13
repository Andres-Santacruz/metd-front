import { Flex, FlexProps } from "@chakra-ui/react";

type IIconProps = FlexProps;

export default function IconBox(props: IIconProps) {
  const { children, ...rest } = props;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"8px"}
      {...rest}
    >
      {children}
    </Flex>
  );
}

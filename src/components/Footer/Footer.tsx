/*!

=========================================================
* Argon Dashboard Chakra PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com/)

* Designed and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/*eslint-disable*/
import { Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
        zIndex={1000}
      >
        &copy; {new Date().getFullYear()},{" "}
        <Text as="span">Hecho con ❤️ por</Text>{" "}
        <Link
          color="blue.400"
          href="https://www.namtrikdev.co/"
          target="_blank"
          cursor="pointer"
        >
          Namtrik Development
        </Link>{" "}
        <Text as="span">y</Text>{" "}
        <Link href="#" display="inline-block" color="blue.400">
          Metd
        </Link>
      </Text>
    </Flex>
  );
}

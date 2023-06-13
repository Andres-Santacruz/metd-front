import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import illustration from "../assets/img/bg-login.jfif";

interface ILoginLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

function LoginLayout({
  children,
  title,
  description,
}: // image,
ILoginLayoutProps) {
  const textColor = useColorModeValue("gray.400", "white");
  const titleColor = useColorModeValue("blue.500", "blue.500");

  return (
    <Flex position="relative" overflowX="hidden">
      <Flex
        h={{ sm: "initial", md: "100vh", lg: "100vh" }}
        w="100%"
        maxW="1044px"
        // mx="auto"
        justifyContent="space-between"
        // mb="40px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          w="100%"
          h="100%"
          alignItems="start"
          justifyContent="center"
          // mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "30px", lg: 0 }}
          // mt={{ base: "40px", md: "24vh" }}
          flexDirection="column"
        >
          <Flex flexDirection="column" px={16}>
            <Box me="auto">
              <Heading color={titleColor} fontSize="32px" mb="10px">
                {title}
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColor}
                fontWeight="bold"
                fontSize={"sm"}
              >
                {description}
              </Text>
            </Box>
            <Flex
              zIndex="2"
              direction="column"
              w={{ base: "90%", md: "350px", lg: "395px" }}
              maxW="100%"
              background="transparent"
              borderRadius="15px"
              me="auto"
              mb={{ base: "20px", md: "auto" }}
              p={0}
              h="auto"
            >
              {children}
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w={{ lg: "50vw", "2xl": "50vw" }}
          position="absolute"
          right="0px"
        >
          <Flex
            bg="linear-gradient(180deg, #2d538b11 0%, #fff 100%)"
            justify="center"
            align="center"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            // borderBottomLeftRadius="20px"
          >
            <Image
              boxSize={{ lg: "500px", xl: "600px", "2xl": "790px" }}
              src={illustration}
              alt="illustration"
            />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
// PROPS

export default LoginLayout;

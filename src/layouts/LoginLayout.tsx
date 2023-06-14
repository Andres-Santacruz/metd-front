import { Box, Flex, Image } from "@chakra-ui/react";

import illustration from "../assets/img/illustration-auth.png";
import Footer from "../components/Footer/Footer";

function LoginLayout({ children }: { children: React.ReactNode }) {
  // const { children, illustrationBackground, image, ...rest } = props;
  // Chakra color mode
  return (
    <>
      <Flex position="relative" mb="50px">
        <Flex
          h={{ sm: "initial", md: "75vh", lg: "85vh" }}
          w="100%"
          maxW="1044px"
          mx="auto"
          justifyContent="space-between"
          mb="40px"
          pt={{ sm: "100px", md: "0px" }}
        >
          {children}

          <Box
            display={{ base: "none", md: "block" }}
            overflowX="hidden"
            h="100%"
            w={{ lg: "50vw", "2xl": "50vw" }}
            position="absolute"
            right="0px"
          >
            <Flex
              bg="linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)"
              justify="center"
              align="end"
              w="100%"
              h="100%"
              bgSize="cover"
              bgPosition="50%"
              position="absolute"
              borderBottomLeftRadius="20px"
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
      <Flex justifyContent="center">
        <Footer />
      </Flex>
    </>
  );
}
// PROPS

export default LoginLayout;

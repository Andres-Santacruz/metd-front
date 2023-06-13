import { useNavigate } from "react-router-dom";

// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  CloseButton,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";
// Assets
import { useEffect, useState } from "react";
import LoginLayout from "../layouts/LoginLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginApi } from "../fakeApi/useLoginApi";
import { useGetUser } from "../hooks/useGetUser";
// import { useMutation } from "@apollo/client";
// import { ILoginData, LOGIN } from "../../../graphql/mutations/userMutations";

function LoginPage() {
  const [loginFake, { data, error, loading }] = useLoginApi();
  // Chakra color mode
  // const [loginGql, { data, loading, error }] = useMutation<ILoginData>(LOGIN);
  const { login } = useGetUser();
  const navigate = useNavigate();

  const bgForm = useColorModeValue("white", "navy.800");
  // const [form, setForm] = useState({ user: "", password: "" });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Debe ser un correo válido")
        .required("Correo obligatorio"),
      password: Yup.string().required("Contraseña obligatoria"),
    }),
    onSubmit: (values) => {
      setShowError(false);
      loginFake(values.email, values.password);
    },
  });

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (data) {
      console.log("data", data);
      login({
        token: data.token,
        user: data.payload,
      });
      return navigate("/");
    }

    if (error) {
      setShowError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  useEffect(() => {
    document.title = "Inicio de sesión | METD";
  }, []);

  const onClose = () => {
    setShowError(false);
  };

  /*   const titleColor = useColorModeValue("gray.700", "blue.500");
  const textColor = useColorModeValue("gray.400", "white");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100"); */
  return (
    <LoginLayout
      title="Bienvenido!"
      description="Administra tus informes"
      image="https://www.italtronic.net/wp-content/uploads/2021/01/identidad_principal.jpg"
    >
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        mb="60px"
        mt={{ base: "60px", md: "0px" }}
      >
        <Flex
          zIndex="2"
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          mb={{ base: "20px", md: "auto" }}
          bg={bgForm}
          boxShadow={useColorModeValue(
            "0px 5px 14px rgba(0, 0, 0, 0.05)",
            "unset"
          )}
        >
          {/* <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Sign In with
          </Text>
          <HStack spacing="15px" justify="center" mb="22px">
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon as={FaFacebook} color={colorIcons} w="30px" h="30px" />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon
                  as={FaApple}
                  color={colorIcons}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon
                  as={FaGoogle}
                  color={colorIcons}
                  w="30px"
                  h="30px"
                  _hover={{ filter: "brightness(120%)" }}
                />
              </Link>
            </Flex>
          </HStack>
          <Text
            fontSize="lg"
            color="gray.400"
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            or
          </Text> */}
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              id="user"
              mb={4}
              isInvalid={Boolean(formik.errors.email && formik.touched.email)}
            >
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Correo electrónico
              </FormLabel>
              <Input
                name="email"
                value={formik.values.email}
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="Ingrese usuario"
                size="lg"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              id="password"
              isInvalid={Boolean(
                formik.errors.password && formik.touched.password
              )}
            >
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Contraseña
              </FormLabel>
              <Input
                name="password"
                value={formik.values.password}
                fontSize="sm"
                ms="4px"
                type="password"
                placeholder="Contraseña"
                size="lg"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={Boolean(error)}>
              {/* <FormControl display="flex" alignItems="center" mb="24px">
              <Switch id="remember-login" colorScheme="blue" me="10px" />
              <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
                Remember me
              </FormLabel>
            </FormControl> */}
              <Button
                fontSize="10px"
                variant="solid"
                fontWeight="bold"
                bg="black"
                color="white"
                w="100%"
                h="45"
                mb="20px"
                _hover={{
                  backgroundColor: "#444",
                }}
                mt={4}
                type="submit"
                isDisabled={loading}
                display="flex"
                alignItems="center"
                gap={2}
              >
                {loading && <Spinner size="sm" />}
                Iniciar sesión
              </Button>
              {error && showError && (
                <Alert status="error" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>Error!</AlertTitle>
                      <AlertDescription>{error.message}</AlertDescription>
                    </Box>
                  </Box>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={0}
                    top={0}
                    onClick={onClose}
                  />
                </Alert>
              )}
            </FormControl>
          </form>
          {/* <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Don’t have an account?
              <Link
                color={titleColor}
                as="span"
                ms="5px"
                href="#"
                fontWeight="bold"
              >
                Sign up
              </Link>
            </Text>
          </Flex> */}
        </Flex>
      </Flex>
    </LoginLayout>
  );
}

export default LoginPage;

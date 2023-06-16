import { useNavigate } from "react-router-dom";
// import { Link as LinkReactRouter } from "react-router-dom";

// Chakra imports
import {
  Button,
  Text,
  // Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  // useColorModeValue,
  // Spinner,
  Alert,
  AlertIcon,
  CloseButton,
  AlertTitle,
  AlertDescription,
  Box,
  LightMode,
  // Switch,
  Heading,
  Flex,
  // Link,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
// Assets
import { useEffect, useState } from "react";
import LoginLayout from "../layouts/LoginLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginApi } from "../fakeApi/useLoginApi";
import { useGetUser } from "../hooks/useGetUser";

import logoMetd from "../assets/img/logo.png";
// import { useMutation } from "@apollo/client";
// import { ILoginData, LOGIN } from "../../../graphql/mutations/userMutations";

function LoginPage() {
  const [loginFake, { data, error, loading }] = useLoginApi();
  // Chakra color mode
  // const [loginGql, { data, loading, error }] = useMutation<ILoginData>(LOGIN);
  const { login } = useGetUser();
  const navigate = useNavigate();

  // const bgForm = useColorModeValue("white", "navy.800");
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
  const textColor = useColorModeValue("gray.400", "white");
  const titleColor = useColorModeValue("#2d538b", "blue.500");

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
    /* title="Bienvenido!"
      description="Ingresa y administra tus informes"
      image="https://www.italtronic.net/wp-content/uploads/2021/01/identidad_principal.jpg" */
    >
      <Box
        textAlign="center"
        position="absolute"
        mt={12}
        left="50%"
        zIndex={100}
        transform={"translate(-50%)"}
      >
        <Image
          src={logoMetd}
          width={"80px"}
          height={"80px"}
          display="inline-block"
          border="4px solid #f7fafc"
          borderRadius="100%"
        />
      </Box>
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "24vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={titleColor} fontSize="32px" mb="10px">
            Bienvenido!
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColor}
            fontWeight="bold"
            fontSize={"sm"}
          >
            Ingresa tu correo y contraseña para iniciar sesión
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "350px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              isInvalid={Boolean(formik.touched.email && formik.errors.email)}
              mb="24px"
            >
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Correo electrónico
              </FormLabel>
              <Input
                variant="authSecondary"
                fontSize="sm"
                ms={{ base: "0px", md: "4px" }}
                type="text"
                placeholder="Ingresa correo electrónico"
                size="lg"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={Boolean(
                formik.touched.password && formik.errors.password
              )}
              mb="24px"
            >
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Contraseña
              </FormLabel>
              <Input
                variant="authSecondary"
                fontSize="sm"
                ms={{ base: "0px", md: "4px" }}
                type="password"
                placeholder="Ingresa contraseña"
                size="lg"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              )}
            </FormControl>

            {error && showError && (
              <Alert status="error" mb={6}>
                <AlertIcon />
                <Box>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error.message}</AlertDescription>
                </Box>
                <CloseButton
                  // alignSelf="flex-start"
                  position="absolute"
                  right={2}
                  top={2}
                  onClick={onClose}
                />
              </Alert>
            )}

            <LightMode>
              <Button
                fontSize="10px"
                bg="#2d538b"
                color="white"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                type="submit"
                isLoading={loading}
                disabled={loading}
              >
                Iniciar sesión
              </Button>
            </LightMode>
          </form>
        </Flex>
      </Flex>
    </LoginLayout>
  );
}

export default LoginPage;

/*

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
          isInvalid={Boolean(formik.errors.password && formik.touched.password)}
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

 */

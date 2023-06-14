import { Navigate, Route, Routes } from "react-router-dom";
import { useGetUser } from "./hooks/useGetUser";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import { Box, Flex, Text } from "@chakra-ui/react";

import Lottie from "lottie-react";
import groovyWalkAnimation from "./assets/img/lotties/validatingLottie.json";

function App() {
  const { checking } = useGetUser();

  if (checking === "loading") {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="#ffffff"
      >
        <Box maxW="400px">
          <Text textAlign="center" color="gray.400">
            Validando información...
          </Text>
          <Lottie animationData={groovyWalkAnimation} loop={true} />
        </Box>
      </Flex>
    );
  }
  if (checking === "no-user") {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  return <AdminLayout />;
}

export default App;

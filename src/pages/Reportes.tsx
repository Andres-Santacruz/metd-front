import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useCompaniesApi } from "../fakeApi/useCompaniesApi";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { getTitle } from "../helpers";

export const ReportesPage = () => {
  const [getCompanies, { data, error, loading }] = useCompaniesApi();
  const toast = useToast();

  const textColor = useColorModeValue("gray.700", "white");
  // const iconColor = useColorModeValue("blue.500", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        title: "Error",
        description: error.message,
        position: "top-left",
        duration: 4000,
      });
    }
  }, [error, toast]);

  if (loading) {
    return (
      <Flex
        direction="column"
        pt={{ sm: "120px", md: "75px" }}
        height="30vh"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" color="blue.200" />
      </Flex>
    );
  }
  if (data == null) return null;
  console.log("data", data);
  return (
    <Flex direction="column" pt={{ sm: "120px", md: "75px" }} m={8}>
      <Flex
        direction={{ sm: "column", md: "row" }}
        mb="24px"
        maxH="330px"
        justifyContent={{ sm: "center", md: "space-between" }}
        align="center"
        backdropFilter="blur(21px)"
        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
        border="1.5px solid"
        borderColor={borderProfileColor}
        bg={bgProfile}
        p="24px"
        borderRadius="20px"
      >
        <Flex
          align="center"
          mb={{ sm: "10px", md: "0px" }}
          direction={{ sm: "column", md: "row" }}
          w={{ sm: "100%" }}
          textAlign={{ sm: "center", md: "start" }}
        >
          <Avatar
            me={{ md: "22px" }}
            // src={avatar5}
            name={data.nameComercial}
            w="80px"
            h="80px"
            borderRadius="15px"
            bg="#2d538b"
            color="white"
          />
          <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
            <Text
              fontSize={{ sm: "lg", lg: "xl" }}
              color={textColor}
              fontWeight="bold"
              ms={{ sm: "8px", md: "0px" }}
            >
              {data.nameComercial}
            </Text>
            <Text fontSize={{ sm: "sm", md: "md" }} color="gray.400">
              {data.nit}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Card>
        <Grid
          templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }}
          gap="22px"
          p={4}
        >
          <Card>
            <CardHeader>Reportes</CardHeader>
            <CardBody>
              {data.informes.map(({ id, type }) => (
                <Card key={id} border="1px solid #eae6e6">
                  <CardHeader>{getTitle(type)}</CardHeader>
                  <CardBody></CardBody>
                  <CardFooter>
                    <Button
                      as={Link}
                      to={`/reporte/${id}`}
                      leftIcon={<BsEyeFill />}
                      colorScheme="blue"
                    >
                      Ver
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </CardBody>
          </Card>
        </Grid>
      </Card>
    </Flex>
  );
};

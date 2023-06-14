import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  Icon,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useCompaniesApi } from "../fakeApi/useCompaniesApi";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { getTitle } from "../helpers";

import fakeImgPreview from "../assets/img/preview-fake.jpg";
import fakeImgPreviewRetorno from "../assets/img/preview-fake-retorno-arl.jpg";
import { FaChartBar, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";

export const ReportesPage = () => {
  const [getCompanies, { data, error, loading }] = useCompaniesApi();
  const toast = useToast();

  const textColor = useColorModeValue("gray.700", "white");
  // const iconColor = useColorModeValue("blue.500", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const { colorMode } = useColorMode();

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
        mb="18px"
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

        <Flex
          direction={{ sm: "column", lg: "row" }}
          w={{ sm: "100%", md: "50%", lg: "auto" }}
        >
          <Button p="0px" bg="transparent" variant="no-effects">
            <Flex
              align="center"
              w={{ sm: "100%", lg: "135px" }}
              bg={colorMode === "dark" ? "navy.900" : "#fff"}
              borderRadius="8px"
              justifyContent="center"
              py="10px"
              boxShadow={"0px 2px 5.5px rgba(0, 0, 0, 0.06)"}
              cursor="pointer"
              transition="all .5s ease"
              /* onClick={
                () => dispatch({ type: "SWITCH_ACTIVE", payload: "overview" })
              } */
            >
              <Icon color={textColor} as={FaChartBar} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                INFORMES
              </Text>
            </Flex>
          </Button>
          <Button p="0px" bg="transparent" variant="no-effects">
            <Flex
              align="center"
              w={{ lg: "135px" }}
              borderRadius="8px"
              justifyContent="center"
              py="10px"
              mx={{ lg: "1rem" }}
              cursor="pointer"
              /* boxShadow={
                state.teams ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)" : null
              } */
              // bg={colorMode === "dark" ? "navy.900" : "#fff"}
              transition="all .5s ease"
              /* onClick={() =>
                dispatch({ type: "SWITCH_ACTIVE", payload: "teams" })
              } */
            >
              <Icon color={textColor} as={IoDocumentsSharp} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                TEAMS
              </Text>
            </Flex>
          </Button>
          <Button p="0px" bg="transparent" variant="no-effects">
            <Flex
              align="center"
              w={{ lg: "135px" }}
              borderRadius="8px"
              justifyContent="center"
              py="10px"
              cursor="pointer"
              /* boxShadow={
                state.projects ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)" : null
              }
              bg={
                state.projects
                  ? colorMode === "dark"
                    ? "navy.900"
                    : "#fff"
                  : null
              } */
              transition="all .5s ease"
              /* onClick={() =>
                dispatch({ type: "SWITCH_ACTIVE", payload: "projects" })
              } */
            >
              <Icon color={textColor} as={FaPenFancy} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                PROJECTS
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>

      <Flex direction="column" mb="44px" mt={{ sm: "16px", lg: "0px" }}>
        <Text fontSize="xl" color="white" fontWeight="bold" mb="16px">
          Reportes
        </Text>
        <Text fontSize="sm" color="black" fontWeight="normal">
          A continuación se muestran los reportes que actualmente tiene{" "}
          {data.nameComercial}.
        </Text>
      </Flex>

      <Grid
        templateColumns={{
          sm: "1fr",
          md: "repeat(3, auto)",
          lg: "repeat(3, auto)",
        }}
        templateRows={{ md: "repeat(3, auto)", lg: "repeat(2, auto)" }}
        gap="30px"
        p={4}
      >
        {data.informes.map(({ id, type }) => (
          <Card
            key={id}
            // border="1px solid #eae6e6"
            _hover={{
              transform: "scale(1.01)",
            }}
            p="22px"
            display="flex"
            flexDirection="column"
            width="100%"
            boxShadow="0px 5px 14px rgba(0, 0, 0, 0.05)"
            borderRadius="20px"
            position="relative"
            wordBreak="break-word"
            backgroundClip="border-box"
            // maxW="220px"
          >
            <CardHeader>{getTitle(type)}</CardHeader>
            <CardBody>
              <img src={fakeImgPreview} alt="img preview report" width="100%" />
            </CardBody>
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

        <Card
          // border="1px solid #eae6e6"
          _hover={{
            transform: "scale(1.01)",
          }}
          p="22px"
          display="flex"
          flexDirection="column"
          width="100%"
          boxShadow="0px 5px 14px rgba(0, 0, 0, 0.05)"
          borderRadius="20px"
          position="relative"
          wordBreak="break-word"
          backgroundClip="border-box"
          // maxW="220px"
        >
          <CardHeader>Retorno ARL</CardHeader>
          <CardBody>
            <img
              src={fakeImgPreviewRetorno}
              alt="img preview report"
              width="100%"
            />
          </CardBody>
          <CardFooter>
            <Button
              as={Link}
              to="/retorno-arl"
              leftIcon={<BsEyeFill />}
              colorScheme="blue"
            >
              Ver
            </Button>
          </CardFooter>
        </Card>
        <Card
          // border="1px solid #eae6e6"
          _hover={{
            transform: "scale(1.01)",
          }}
          p="22px"
          display="flex"
          flexDirection="column"
          width="100%"
          boxShadow="0px 5px 14px rgba(0, 0, 0, 0.05)"
          borderRadius="20px"
          position="relative"
          wordBreak="break-word"
          backgroundClip="border-box"
          // maxW="220px"
        >
          <CardHeader>Ausentismo Laboral</CardHeader>
          <CardBody>
            <img
              src={fakeImgPreviewRetorno}
              alt="img preview report"
              width="100%"
            />
          </CardBody>
          <CardFooter>
            <Button
              as={Link}
              to="/retorno-arl"
              leftIcon={<BsEyeFill />}
              colorScheme="blue"
            >
              Ver
            </Button>
          </CardFooter>
        </Card>
      </Grid>
    </Flex>
  );
};

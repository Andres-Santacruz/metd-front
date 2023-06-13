// import { useLazyQuery, useMutation } from "@apollo/client";
// import { InfoIcon } from "@chakra-ui/icons";
import {
  Tabs,
  TabList,
  Tab,
  Text,
  Flex,
  Icon,
  TabPanels,
  TabPanel,
  Card,
  CardBody,
  FormControl,
  useColorModeValue,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Select,
  useToast,
  /* Tag,
  Box,
  Select, 
  Textarea,
  Tooltip,
  FormHelperText,
  Input,
  CardHeader,
  Stack,
  Box,
  Checkbox,
  Grid,
  useToast,
  FormErrorMessage,
  Divider,
  Alert,
  AlertIcon,
  Spinner,
  Badge, */
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsCircleFill } from "react-icons/bs";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetUser } from "../../hooks/useGetUser";
import { API } from "../../api";

// import { getId } from "../../helpers";
// import { validationsInputs } from "../../helpers/validations";
// import { RocketIcon } from "../Icons/Icons";
// import { ResumenInvoice } from "./ResumenInvoice";
// import { TicketCard } from "./TicketCard";

/* interface IWizardOwnProps {
  dataRaffles: EdgeDataRaffles[];
  person: PersonNode | undefined;
  setActiveButtons: React.Dispatch<
    React.SetStateAction<{
      info: boolean;
      buyTicket: boolean;
      pagos: boolean;
    }>
  >;
} */

type TResCreateCompany =
  | { data: string; error: null }
  | { data: null; error: string };

type TResInforme =
  | { data: string; error: null }
  | { data: null; error: string };

export const WizardOwn = () => {
  const { logout } = useGetUser();
  const toast = useToast();

  const [loadingCreate, setLoadingCreate] = useState(false);
  const aboutTab = useRef<HTMLButtonElement>(null);
  const accountTab = useRef<HTMLButtonElement>(null);
  const addressTab = useRef<HTMLButtonElement>(null);
  // const [tickets] = useState<string[]>([]);
  // const [isMore, setIsMore] = useState({ isMorePage: false, count: 1 });

  const formik = useFormik({
    initialValues: {
      comercialName: "",
      businessName: "",
      nit: "",
      departament: "",
      city: "",
      address: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object().shape({
      comercialName: Yup.string().required("Este campo es obligatorio"),
      businessName: Yup.string().required("Este campo es obligatorio"),
      nit: Yup.string().required("Este campo es obligatorio"),
      departament: Yup.string().required("Este campo es obligatorio"),
      city: Yup.string().required("Este campo es obligatorio"),
      address: Yup.string().required("Este campo es obligatorio"),
      phoneNumber: Yup.string().required("Este campo es obligatorio"),
    }),
    onSubmit: (values) => {
      // Aquí puedes manejar la lógica para enviar los datos del formulario
      console.log(values);
      accountTab?.current?.click();
    },
  });

  const formikUser = useFormik({
    initialValues: {
      name: "",
      surname: "",
      phoneNumberUser: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Este campo es obligatorio"),
      surname: Yup.string().required("Este campo es obligatorio"),
      phoneNumberUser: Yup.string().required("Este campo es obligatorio"),
      email: Yup.string()
        .email("Ingrese un correo electrónico válido")
        .required("Este campo es obligatorio"),
      password: Yup.string().required("Este campo es obligatorio"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), undefined],
          "Las contraseñas deben coincidir"
        )
        .required("Este campo es obligatorio"),
    }),
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");
      if (token == null) {
        return logout();
      }
      // console.log(values);
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);

      const rawCompany = JSON.stringify({
        ...formik.values,
      });

      const requestOptionsCompany = {
        method: "POST",
        headers: headers,
        body: rawCompany,
      };
      setLoadingCreate(true);
      const resCompany = await fetch(
        API + "/add-company",
        requestOptionsCompany
      );
      const { data: dataCreateCompany, error: errorCreateCompany } =
        (await resCompany.json()) as TResCreateCompany;

      if (dataCreateCompany == null) {
        toast({
          status: "error",
          title: "ERROR",
          description: errorCreateCompany,
        });
        setLoadingCreate(false);
        return;
      }
      const idCompany = Number(dataCreateCompany.split("***")[1]);

      const rawInformes = JSON.stringify({
        company_id: idCompany,
        type: selectForm,
      });
      const requestOptionsInforme = {
        method: "POST",
        headers: headers,
        body: rawInformes,
      };
      const resInforme = await fetch(
        API + "/add-informe",
        requestOptionsInforme
      );
      const { data: dataInformes, error: errorInformes } =
        (await resInforme.json()) as TResInforme;
      if (dataInformes == null) {
        toast({
          status: "error",
          title: "ERROR",
          description: errorInformes,
        });
        setLoadingCreate(false);
        return;
      }

      const rawUser = JSON.stringify({
        ...values,
        companyId: idCompany,
      });
      const requestOptionsUser = {
        method: "POST",
        headers: headers,
        body: rawUser,
      };
      const resUser = await fetch(API + "/add-user", requestOptionsUser);
      const { data: dataUser, error: errorUser } =
        (await resUser.json()) as TResInforme;
      if (dataUser == null) {
        toast({
          status: "error",
          title: "ERROR",
          description: errorUser,
        });
        setLoadingCreate(false);
        return;
      }
      setLoadingCreate(false);
      toast({
        status: "success",
        title: "Éxito",
        description: "Creado correctamente",
        position: "top-left",
        duration: 3500,
      });
      formik.resetForm();
      formikUser.resetForm();
      setSelectForm("");
      aboutTab?.current?.click();
    },
  });

  const [activeBullets, setActiveBullets] = useState({
    about: true,
    account: false,
    address: false,
  });

  const [selectForm, setSelectForm] = useState("");

  // const iconColor = useColorModeValue("gray.300", "gray.700");
  const bgPrevButton = useColorModeValue("gray.100", "gray.100");
  // const textColor = useColorModeValue("gray.700", "white");

  // console.log("activeBullets", activeBullets);

  return (
    <Tabs variant="unstyled" mt="24px" display="flex" flexDirection="column">
      <TabList
        display="flex"
        alignItems="center"
        alignSelf="center"
        justifySelf="center"
      >
        <Tab
          ref={aboutTab}
          _focus={{}}
          w={{ sm: "120px", md: "250px", lg: "300px" }}
          onClick={() =>
            setActiveBullets({
              about: true,
              account: false,
              address: false,
            })
          }
        >
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            position="relative"
            _before={{
              content: "''",
              width: { sm: "120px", md: "250px", lg: "300px" },
              height: "3px",
              bg: activeBullets.account ? "blue.200" : "white",
              left: { sm: "14px", md: "33px" },
              top: {
                sm: activeBullets.account ? "4px" : "6px",
                md: undefined,
              },
              position: "absolute",
              bottom: activeBullets.account ? "40px" : "38px",

              transition: "all .3s ease",
            }}
          >
            <Icon
              zIndex="1"
              as={BsCircleFill}
              color={activeBullets.about ? "blue.200" : "white"}
              w={activeBullets.about ? "16px" : "12px"}
              h={activeBullets.about ? "16px" : "12px"}
              mb="8px"
            />
            <Text
              color={activeBullets.about ? "blue.200" : "gray.300"}
              fontWeight={activeBullets.about ? "bold" : "normal"}
              display={{ sm: "none", md: "block" }}
            >
              EMPRESA
            </Text>
          </Flex>
        </Tab>
        <Tab
          ref={accountTab}
          _focus={{}}
          w={{ sm: "120px", md: "250px", lg: "300px" }}
          onClick={() =>
            setActiveBullets({
              about: true,
              account: true,
              address: false,
            })
          }
        >
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            position="relative"
            _before={{
              content: "''",
              width: { sm: "120px", md: "250px", lg: "300px" },
              height: "3px",
              bg: activeBullets.address ? "blue.200" : "white",
              left: { sm: "12px", md: "38px" },
              top: {
                sm: activeBullets.address ? "6px" : "4px",
                md: undefined,
              },
              position: "absolute",
              bottom: activeBullets.address ? "40px" : "38px",

              transition: "all .3s ease",
            }}
          >
            <Icon
              zIndex="1"
              as={BsCircleFill}
              color={activeBullets.account ? "blue.200" : "white"}
              w={activeBullets.account ? "16px" : "12px"}
              h={activeBullets.account ? "16px" : "12px"}
              mb="8px"
            />
            <Text
              color={activeBullets.account ? "blue.300" : "gray.300"}
              fontWeight={activeBullets.address ? "bold" : "normal"}
              display={{ sm: "none", md: "block" }}
            >
              REPORTES
            </Text>
          </Flex>
        </Tab>
        <Tab
          ref={addressTab}
          _focus={{}}
          w={{ sm: "120px", md: "250px", lg: "300px" }}
          onClick={() =>
            setActiveBullets({
              about: true,
              account: true,
              address: true,
            })
          }
        >
          <Flex
            direction="column"
            justify="center"
            align="center"
            position="relative"
          >
            <Icon
              zIndex="1"
              as={BsCircleFill}
              color={activeBullets.address ? "blue.200" : "white"}
              w={activeBullets.address ? "16px" : "12px"}
              h={activeBullets.address ? "16px" : "12px"}
              mb="8px"
            />
            <Text
              color={activeBullets.address ? "blue.300" : "gray.300"}
              fontWeight={activeBullets.address ? "bold" : "normal"}
              display={{ sm: "none", md: "block" }}
            >
              USUARIO
            </Text>
          </Flex>
        </Tab>
      </TabList>
      <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
        <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
          <Card>
            <CardBody>
              <h6 style={{ marginBottom: "0.75em", fontWeight: "bold" }}>
                Información de la organización
              </h6>
              <form onSubmit={formik.handleSubmit}>
                <Flex direction="column" w="100%">
                  <Flex
                    direction={{ sm: "column", md: "row" }}
                    w="100%"
                    mb="24px"
                  >
                    <Flex
                      w="100%"
                      mx="auto"
                      mt={8}
                      flexDirection="column"
                      gap="2"
                    >
                      <FormControl
                        id="comercialName"
                        isInvalid={Boolean(
                          formik.errors.comercialName &&
                            formik.touched.comercialName
                        )}
                      >
                        <FormLabel>Nombre comercial de la empresa</FormLabel>
                        <Input
                          type="text"
                          {...formik.getFieldProps("comercialName")}
                        />
                        <FormErrorMessage>
                          {formik.errors.comercialName}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        id="businessName"
                        isInvalid={Boolean(
                          formik.errors.businessName &&
                            formik.touched.businessName
                        )}
                      >
                        <FormLabel>Razón social</FormLabel>
                        <Input
                          type="text"
                          {...formik.getFieldProps("businessName")}
                        />
                        <FormErrorMessage>
                          {formik.errors.businessName}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        id="nit"
                        isInvalid={Boolean(
                          formik.errors.nit && formik.touched.nit
                        )}
                      >
                        <FormLabel>NIT</FormLabel>
                        <Input type="text" {...formik.getFieldProps("nit")} />
                        <FormErrorMessage>{formik.errors.nit}</FormErrorMessage>
                      </FormControl>

                      <Flex
                        gap={2}
                        justifyContent="space-between"
                        flexDirection={["column", "column", "row"]}
                      >
                        <FormControl
                          id="departament"
                          isInvalid={Boolean(
                            formik.errors.departament &&
                              formik.touched.departament
                          )}
                        >
                          <FormLabel>Departamento</FormLabel>
                          <Input
                            type="text"
                            {...formik.getFieldProps("departament")}
                          />
                          <FormErrorMessage>
                            {formik.errors.departament}
                          </FormErrorMessage>
                        </FormControl>

                        <FormControl
                          id="city"
                          isInvalid={Boolean(
                            formik.errors.city && formik.touched.city
                          )}
                        >
                          <FormLabel>Ciudad</FormLabel>
                          <Input
                            type="text"
                            {...formik.getFieldProps("city")}
                          />
                          <FormErrorMessage>
                            {formik.errors.city}
                          </FormErrorMessage>
                        </FormControl>
                      </Flex>
                      <Flex
                        gap={2}
                        justifyContent="space-between"
                        flexDirection={["column", "column", "row"]}
                      >
                        <FormControl
                          id="address"
                          isInvalid={Boolean(
                            formik.errors.address && formik.touched.address
                          )}
                        >
                          <FormLabel>Dirección</FormLabel>
                          <Input
                            type="text"
                            {...formik.getFieldProps("address")}
                          />
                          <FormErrorMessage>
                            {formik.errors.address}
                          </FormErrorMessage>
                        </FormControl>

                        <FormControl
                          id="phoneNumber"
                          isInvalid={Boolean(
                            formik.errors.phoneNumber &&
                              formik.touched.phoneNumber
                          )}
                        >
                          <FormLabel>Teléfono</FormLabel>
                          <Input
                            type="text"
                            {...formik.getFieldProps("phoneNumber")}
                          />
                          <FormErrorMessage>
                            {formik.errors.phoneNumber}
                          </FormErrorMessage>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Button
                    // variant="dark"
                    variant="solid"
                    bg={"black"}
                    _hover={{ backgroundColor: "#111" }}
                    alignSelf="flex-end"
                    mt="24px"
                    w={{ sm: "75px", lg: "100px" }}
                    h="35px"
                    type="submit"
                    // isDisabled={!Boolean(form.idRiffle)}
                    // onClick={() => accountTab?.current?.click()}
                  >
                    <Text fontSize="xs" color="#fff" fontWeight="bold">
                      Siguiente
                    </Text>
                  </Button>
                </Flex>
              </form>
            </CardBody>
          </Card>
        </TabPanel>
        <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
          <Card>
            <CardBody>
              <Text fontSize="2xl">Reportes</Text>
              <Flex>
                <FormControl my={4}>
                  <FormLabel htmlFor="idSelect">Seleccione reporte</FormLabel>
                  <Select
                    id="idSelect"
                    placeholder="Seleccione un reporte"
                    value={selectForm}
                    onChange={(e) => setSelectForm(e.target.value)}
                  >
                    <option value="ROTACION_DEL_PERSONAL">
                      ROTACION DEL PERSONAL
                    </option>
                    <option value="AUSENTISMO_LABORAL">
                      AUSENTISMO LABORAL
                    </option>
                    {/* <option value="option3">RETORNO ARL</option>
                    <option value="option4">
                      PARTICIPACION LABORAL CAPACITACIONES
                    </option> */}
                  </Select>
                </FormControl>
              </Flex>

              <Flex direction="column" w="100%">
                <Flex justify="space-between">
                  <Button
                    variant="no-effects"
                    bg={bgPrevButton}
                    alignSelf="flex-end"
                    mt="24px"
                    w={{ sm: "75px", lg: "100px" }}
                    h="35px"
                    onClick={() => aboutTab?.current?.click()}
                  >
                    <Text fontSize="xs" color="gray.700" fontWeight="bold">
                      Atrás
                    </Text>
                  </Button>
                  <Button
                    // variant="dark"
                    variant="solid"
                    bg="black"
                    _hover={{ backgroundColor: "#222" }}
                    alignSelf="flex-end"
                    mt="24px"
                    w={{ sm: "75px", lg: "100px" }}
                    h="35px"
                    onClick={() => addressTab?.current?.click()}
                    isDisabled={!selectForm}
                  >
                    <Text fontSize="xs" color="#fff" fontWeight="bold">
                      Siguiente
                    </Text>
                  </Button>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </TabPanel>
        <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
          <Card>
            <CardBody>
              <form onSubmit={formikUser.handleSubmit}>
                <Flex flexDirection="column" w="100%" gap={4}>
                  <FormControl
                    id="name"
                    isInvalid={Boolean(
                      formikUser.errors.name && formikUser.touched.name
                    )}
                  >
                    <FormLabel>Nombres</FormLabel>
                    <Input type="text" {...formikUser.getFieldProps("name")} />
                    <FormErrorMessage>
                      {formikUser.errors.name}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    id="surname"
                    isInvalid={Boolean(
                      formikUser.errors.surname && formikUser.touched.surname
                    )}
                  >
                    <FormLabel>Apellidos</FormLabel>
                    <Input
                      type="text"
                      {...formikUser.getFieldProps("surname")}
                    />
                    <FormErrorMessage>
                      {formikUser.errors.surname}
                    </FormErrorMessage>
                  </FormControl>
                  <Flex
                    flexDirection={{ sm: "column", lg: "row", base: "column" }}
                    gap={3}
                  >
                    <FormControl
                      id="phoneNumberUser"
                      isInvalid={Boolean(
                        formikUser.errors.phoneNumberUser &&
                          formikUser.touched.phoneNumberUser
                      )}
                    >
                      <FormLabel>Teléfono</FormLabel>
                      <Input
                        type="text"
                        {...formikUser.getFieldProps("phoneNumberUser")}
                      />
                      <FormErrorMessage>
                        {formikUser.errors.phoneNumberUser}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      id="email"
                      isInvalid={Boolean(
                        formikUser.errors.email && formikUser.touched.email
                      )}
                    >
                      <FormLabel>Correo</FormLabel>
                      <Input
                        type="email"
                        {...formikUser.getFieldProps("email")}
                      />
                      <FormErrorMessage>
                        {formikUser.errors.email}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex
                    flexDirection={{ sm: "column", lg: "row", base: "column" }}
                    gap={3}
                  >
                    <FormControl
                      id="password"
                      isInvalid={Boolean(
                        formikUser.errors.password &&
                          formikUser.touched.password
                      )}
                    >
                      <FormLabel>Contraseña</FormLabel>
                      <Input
                        type="password"
                        {...formikUser.getFieldProps("password")}
                      />
                      <FormErrorMessage>
                        {formikUser.errors.password}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      id="confirmPassword"
                      isInvalid={Boolean(
                        formikUser.errors.confirmPassword &&
                          formikUser.touched.confirmPassword
                      )}
                    >
                      <FormLabel>Confirmar contraseña</FormLabel>
                      <Input
                        type="password"
                        {...formikUser.getFieldProps("confirmPassword")}
                      />
                      <FormErrorMessage>
                        {formikUser.errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex justify="space-between">
                    <Button
                      variant="no-effects"
                      bg={bgPrevButton}
                      alignSelf="flex-end"
                      mt="24px"
                      w={{ sm: "75px", lg: "100px" }}
                      h="35px"
                      onClick={() => accountTab?.current?.click()}
                    >
                      <Text fontSize="xs" color="gray.700" fontWeight="bold">
                        Atrás
                      </Text>
                    </Button>
                    <Button
                      // onClick={handleClickReservar}
                      type="submit"
                      colorScheme="green"
                      // variant="primary"
                      w="100px"
                      h="35px"
                      alignSelf={{ sm: "flex-start", md: "flex-end" }}
                      mt={{ sm: "16px", md: "0px" }}
                      isDisabled={loadingCreate}
                      isLoading={loadingCreate}
                      loadingText="Guardando"
                    >
                      Guardar
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </CardBody>
          </Card>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

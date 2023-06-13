import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  // Button,
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  // TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
// import { FaEye } from "react-icons/fa";
// import { useLazyQuery } from "@apollo/client";
// import {
//   IDataListPersons,
//   LIST_PERSON,
// } from "../../../graphql/queries/listPerson";
import { useDebounce } from "../../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

interface ISearchBarProps extends InputGroupProps {
  children?: React.ReactNode;
}

export function SearchBar(props: ISearchBarProps) {
  /*   const [searchPerson, { data, loading, error }] =
    useLazyQuery<IDataListPersons>(LIST_PERSON); */

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [typing, setTyping] = useState<"" | "Esperando...">("");

  const debounceValue = useDebounce<string>(search, 900, () => {
    setTyping("");
  });

  const inputBg = useColorModeValue("white", "navy.800");
  const searchIconColor = useColorModeValue("gray.700", "gray.200");

  useEffect(() => {
    setIsOpen(search.length > 0);
    /*     if(inputRef.current && search.length > 0) {
      console.log('inputRef.current', inputRef.current)
      inputRef.current.focus();
    } */
  }, [search]);

  useEffect(() => {
    if (debounceValue.length > 3) {
      searchApi(debounceValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  const onClose = () => {
    setIsOpen(false);
  };

  const renderContent = useCallback(() => {
    if (typing === "Esperando...") {
      return (
        <TableContainer>
          <Table variant="striped" colorScheme="gray" mb={4}>
            <Thead>
              <Tr>
                <Th>Resultados</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{typing}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      );
    }

    // if (loading) {
    return (
      <TableContainer>
        <Table variant="striped" colorScheme="gray" mb={4}>
          <Thead>
            <Tr>
              <Th>Resultados</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Box>
                  Cargando resultados <Spinner ml={3} size="sm" />
                </Box>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
    // }

    /* if (error) {
      return (
        <TableContainer>
          <Table variant="striped" colorScheme="red" mb={4}>
            <Thead>
              <Tr>
                <Th>Resultados</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{error?.message || "No se pudo cargar información"}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      );
    }

    if (data && data.listPersons.edges.length === 0) {
      return (
        <TableContainer>
          <Table variant="striped" colorScheme="gray" mb={4}>
            <TableCaption>
              <Button
                variant="solid"
                bg="green.500"
                color="white"
                _hover={{ backgroundColor: "green.400" }}
                onClick={handleClick}
              >
                Crear usuario
              </Button>
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Resultados</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>No se encontró resultados para {debounceValue}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      );
    }

    if (data && data.listPersons.edges.length > 0) {
      return (
        <TableContainer>
          <Table variant="striped" colorScheme="gray" mb={4}>
            <Thead>
              <Tr>
                <Th>Resultados</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.listPersons.edges.map(({ node }) => (
                <Tr key={node.id+node.identificationNumber}>
                  <Td>{node.names} {node.lastNames} </Td>
                  <Td>{node.identificationNumber}</Td>
                  <Td>
                    <IconButton
                      aria-label="search user"
                      icon={<FaEye />}
                      onClick={() => {
                        handleClickSeach(node.identificationNumber);
                      }}
                    >
                      Ver
                    </IconButton>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      );
    }

    return (
      <TableContainer>
        <Table variant="striped" colorScheme="gray" mb={4}>
          <Thead>
            <Tr>
              <Th>Resultados</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Número debe ser mayor a 3 caracteres</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    ); */
  }, [typing]);

  const searchApi = (identificationNumber: string) => {
    /* searchPerson({
      variables: { identificationNumber },
    }); */
    console.log("identificationNumber", identificationNumber);
  };

  /* const handleClickSeach = (idNumber: string) => {
    if (Number(idNumber)) {
      navigate(`/user-settings/${idNumber}`);
      setSearch("");
      setIsOpen(false);
    }
  }; */

  const handleClick = () => {
    if (Number(search)) {
      navigate(`/new-user?id=${search}`);
      setIsOpen(false);
    }
  };

  return (
    <>
      <InputGroup borderRadius="8px" w="200px" {...props}>
        <InputLeftElement
          onClick={handleClick}
          children={
            <IconButton
              aria-label="search icon"
              bg="inherit"
              borderRadius="inherit"
              _hover={{}}
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
            ></IconButton>
          }
        />
        <Input
          variant="search"
          fontSize="xs"
          bg={inputBg}
          placeholder="Cédula"
          type="number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={inputRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div>
              <InputGroup
                borderRadius="8px"
                w="90%"
                {...props}
                border="1px solid #ccc"
              >
                <InputLeftElement
                  children={
                    <IconButton
                      aria-label="search icon"
                      bg="inherit"
                      borderRadius="inherit"
                      _hover={{}}
                      _active={{
                        bg: "inherit",
                        transform: "none",
                        borderColor: "transparent",
                      }}
                      _focus={{
                        boxShadow: "none",
                      }}
                      icon={
                        <SearchIcon color={searchIconColor} w="15px" h="15px" />
                      }
                    ></IconButton>
                  }
                />
                <Input
                  ref={inputRef}
                  variant="search"
                  fontSize="xs"
                  bg={inputBg}
                  placeholder="Cédula"
                  type="number"
                  value={search}
                  onChange={(e) => {
                    setTyping("Esperando...");
                    setSearch(e.target.value);
                  }}
                />
              </InputGroup>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderContent()}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

import { Flex } from "@chakra-ui/react";
import { WizardOwn } from "../components/WirzardAddCompany";

const AddCompanyPage = () => {
  return (
    <Flex direction="column" pt={{ sm: "120px", md: "75px" }}>
      <WizardOwn />
    </Flex>
  );
};

export default AddCompanyPage;

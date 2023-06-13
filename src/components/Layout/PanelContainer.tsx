import { Box, useStyleConfig } from "@chakra-ui/react";
import { IMainPanelProps } from "./MainPanel";
function PanelContainer(props: IMainPanelProps) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("PanelContainer", { variant });
  return (
    <Box __css={styles} minH="100vh" {...rest}>
      {children}
    </Box>
  );
}

export default PanelContainer;

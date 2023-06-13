import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";

export interface IMainPanelProps extends BoxProps {
  variant?: string;
  children: React.ReactNode;
}

function MainPanel(props: IMainPanelProps) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("MainPanel", { variant });
  return (
    <Box __css={styles} minH="100vh" {...rest}>
      {children}
    </Box>
  );
}

export default MainPanel;

import * as React from "react";
import { ChakraProvider, Button } from "@chakra-ui/react";
import theme from "./styles/theme";

const App: React.FC<Record<string, never>> = () => (
  <ChakraProvider theme={theme}>
    <Button>테스트 버튼</Button>
  </ChakraProvider>
);

export default App;

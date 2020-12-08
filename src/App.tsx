import * as React from "react";
import { Button, ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";

const App: React.FC<Record<string, never>> = () => (
  <ChakraProvider theme={theme}>
    <Button width={100}>커스텀버튼</Button>
  </ChakraProvider>
);

export default App;

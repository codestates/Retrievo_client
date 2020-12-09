import React from "react";
import { ChakraProvider, Button } from "@chakra-ui/react";
import theme from "./styles/theme";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Button>다른가?</Button>
      </ChakraProvider>
    </>
  );
};

export default App;

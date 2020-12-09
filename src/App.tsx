import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>앱</ChakraProvider>
    </>
  );
};

export default App;

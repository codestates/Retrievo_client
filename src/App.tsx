import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import Button from "./components/Button/Button";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>테스트</ChakraProvider>
    </>
  );
};

export default App;

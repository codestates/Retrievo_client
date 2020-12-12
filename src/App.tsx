import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <p>이거 밀리는지 확인</p>
      </ChakraProvider>
    </>
  );
};

export default App;

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import Landing from "./pages/Landing";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Landing />
      </ChakraProvider>
    </>
  );
};

export default App;

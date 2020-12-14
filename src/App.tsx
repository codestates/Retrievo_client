import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";

import Landing from "./pages/Landing";
import Landing2 from "./pages/Landing/last";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Landing />
        <Landing2 />
      </ChakraProvider>
    </>
  );
};

export default App;

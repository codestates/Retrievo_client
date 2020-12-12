import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
// import Button from "./components/Button";
// import Heading, { headingStyle } from "./components/Heading";
import Dashboard from "./pages/Dashboard";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Dashboard />
      </ChakraProvider>
    </>
  );
};

export default App;

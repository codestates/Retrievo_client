import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
// import Button from "./components/Button";
// import Heading, { headingStyle } from "./components/Heading";
import ActivityStream from "./pages/Dashboard/ActivityStream";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ActivityStream />
      </ChakraProvider>
    </>
  );
};

export default App;

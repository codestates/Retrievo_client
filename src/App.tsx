import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./styles/theme";
// import Button from "./components/Button";
// import Heading, { headingStyle } from "./components/Heading";
import ProjectSetting from "./pages/ProjectSetting";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ProjectSetting />
      </ChakraProvider>
    </>
  );
};

export default App;

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
// import Button from "./components/Button";
// import Heading, { headingStyle } from "./components/Heading";
// import ProjectSetting from "./pages/ProjectSetting";
// import Dashboard from "./pages/Dashboard";
import Sprint from "./pages/Sprint";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        {/* <ProjectSetting /> */}
        <Sprint />
        {/* <Dashboard /> */}
      </ChakraProvider>
    </>
  );
};

export default App;

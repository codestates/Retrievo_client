import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./styles/theme";
// import Button from "./components/Button";
// import Heading, { headingStyle } from "./components/Heading";
import MyProfile from "./pages/MyProfile";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <MyProfile />
      </ChakraProvider>
    </>
  );
};

export default App;

import React from "react";
import { ChakraProvider, Text } from "@chakra-ui/react";
import theme from "./styles/theme";
// import Button from "./components/Button";
// import Heading from "./components/Heading";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Text>hello</Text>
        <p>World</p>
      </ChakraProvider>
    </>
  );
};

export default App;

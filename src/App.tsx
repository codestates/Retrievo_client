import * as React from "react";
import { ChakraProvider, Button } from "@chakra-ui/react";
// import { DragDropContext, Draggable } from "react-beautiful-dnd";
import theme from "./styles/theme";

const App: React.FC<Record<string, never>> = () => (
  <ChakraProvider theme={theme}>
    <Button>ㅠ.ㅠ</Button>
  </ChakraProvider>
);

export default App;

// Type 'Element' is not assignable to type 'DraggableChildrenFn & ReactPortal'.

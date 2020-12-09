import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { addDecorator } from "@storybook/react";
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import theme from "../src/styles/theme";

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <Story />
    </ChakraProvider>
  ),
  withKnobs,
];

// addDecorator((storyFn) => (
//   <ChakraProvider>
//     <ThemeProvider theme={theme}>
//       {console.log(theme)}
//       {storyFn()}
//     </ThemeProvider>
//   </ChakraProvider>
// ));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};

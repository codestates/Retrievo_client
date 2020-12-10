import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../src/styles/theme";

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Story />
    </ChakraProvider>
  ),
  withKnobs,
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      html: {
        fontSize: "62.5%",
      },
      body: {
        fontSize: "1.6rem",
      },
    },
  },
});

export default theme;

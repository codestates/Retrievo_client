import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      html: {
        fontSize: "62.5%",
      },
      body: {
        fontSize: "1.6rem",
      },
      // styles for the `a`
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
});
export default theme;

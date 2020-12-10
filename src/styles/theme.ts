import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    colors: {
      primary: {
        black: "#003434",
        normal: "#31D5BF",
        normalLight: "#41E1CC",
        light: "#CDF1EC",
      },
      achromatic: {
        black: "#343434",
        gray900: "#4F4F4F",
        gray800: "#828282",
        gray700: "#C4C4C4",
        gray600: "#D0D0D0",
        gray500: "#E9E9E9",
        gray400: "#F5F5F5",
        white: "#FFFFFF",
      },
      palette: {
        labelYellow: "#FFE81D",
        labelOrange: "#FD5C02",
        labelGreen: "#76B515",
        labelViolet: "#933183",
        labelPurple: "#9F7AEA",
        labelPink: "#B83280",
        labelTeal: "#38B2AC",
        labelCyan: "#0987A0",
        violetLight: "#C4C9E7",
        blueLight: "#E7F5FF",
        warning: "#EE8030",
        fail: "#FF6262",
        failDark: "#DE5B5B",
      },
    },
    global: () => ({
      "html, body": {
        fontSize: "sm",
        color: "#343434",
      },
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "none",
        },
      },
    }),
  },
});
export default theme;

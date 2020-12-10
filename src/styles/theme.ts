import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "Open Sans, sans-serif",
    heading: "Open Sans, sans-serif",
    title: "Righteous, cursive",
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 600,
    bold: 700,
  },
  colors: {
    primary: {
      100: "#003434",
      200: "#31D5BF",
      300: "#41E1CC",
      400: "#CDF1EC",
    },
    achromatic: {
      100: "#FFFFFF",
      200: "#F5F5F5",
      300: "#E9E9E9",
      400: "#D0D0D0",
      500: "#C4C4C4",
      600: "#828282",
      700: "#4F4F4F",
      800: "#343434",
    },
    labelYellow: "#FFE81D",
    labelOrange: "#FD5C02",
    labelGreen: "#76B515",
    labelViolet: "#933183",
    labelPurple: "#9F7AEA",
    labelPink: "#B83280",
    labelTeal: "#38B2AC",
    labelCyan: "#0987A0",
    violet: "#3949AB",
    violetBg: "#E6E9FA",
    violetLight: "#C4C9E7",
    blueLight: "#E7F5FF",
    warning: "#EE8030",
    danger: "#EE8030",
    fail: "#FF6262",
    failDark: "#DE5B5B",
  },
  styles: {
    global: () => ({
      "html, body": {
        fontFamily: "body",
        color: "#343434",
        fontSize: "md",
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

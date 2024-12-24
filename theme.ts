import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      primary: "#3182ce", // blue.500
      secondary: "#2d3748", // gray.700
      accent: "#38b2ac", // teal.400
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
});

export default theme;

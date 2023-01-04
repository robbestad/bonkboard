import { ComponentStyleConfig } from "@chakra-ui/react";

export const HeroSection: ComponentStyleConfig = {
  parts: ["box", "headline", "subheadline"],
  baseStyle: {
    box: {
      mt: 8,
      alignItems: "center",
    },
    headline: {
      textAlign: "center",
      fontSize: "7xl",
      fontWeight: "bold",
      color: "primary.300",
    },
    subheadline: {
      fontSize: "xl",
      fontWeight: "bold",
    },
  },
};

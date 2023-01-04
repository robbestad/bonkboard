import { ComponentStyleConfig } from "@chakra-ui/react";

export const LandingSection: ComponentStyleConfig = {
  parts: ["box", "title", "heading", "subheading"],
  baseStyle: {
    box: {
      mt: 16,
      experimental_spaceY: 3,
      textAlign: "center",
    },
    title: {
      color: "typography.subdued",
      lineHeight: "shorter",
      fontSize: "xs",
      fontWeight: 700,
      textTransform: "uppercase",
    },
    heading: {
      fontSize: { base: "2xl", sm: "3xl" },
      fontWeight: 700,
    },
    subheading: {
      lineHeight: "short",
      color: "typography.subdued",
    },
  },
};

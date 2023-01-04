import { ComponentStyleConfig } from "@chakra-ui/react";

export const Badge: ComponentStyleConfig = {
  baseStyle: {
    py: 0.5,
    px: 2,
    borderRadius: "full",
  },
  sizes: {},
  variants: {
    default: {
      bgColor: "#22392f",
      color: "#17ff9e",
    },
    success: {
      bgColor: "#22392f",
      color: "#17ff9e",
    },
  },
  defaultProps: {
    size: "xs",
  },
};

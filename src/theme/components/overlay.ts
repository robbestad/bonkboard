import { ComponentStyleConfig } from "@chakra-ui/react";

export const Overlay: ComponentStyleConfig = {
  parts: ["back", "icon", "title", "description", "link", "button"],
  baseStyle: {
    back: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      position: "absolute",
      top: "0",
      zIndex: "9",
      w: "full",
      h: "full",
      p: 6,
      backdropFilter: "auto",
      backdropBlur: "10px",
      bg: "rgba(35, 35, 35, 0.7)",
      textAlign: "center",
    },
    icon: {
      w: 14,
      h: 14,
    },
    title: {
      fontSize: "2xl",
      lineHeight: "shorter",
      fontWeight: 600,
    },
    description: {
      color: "typography.secondary",
      fontSize: "md",
      lineHeight: "short",
    },
    button: {
      colorScheme: "primary",
      py: 4,
      w: "full",
      mt: 3,
    },
    actions: {
      experimental_spaceX: 4,
      mt: 4,
      w: "full",
    },
    secondaryButton: {
      fontSize: "lg",
      lineHeight: "shorter",
      fontWeight: 600,
      border: "1px",
      borderColor: "typography.disabled",
      bg: "button.secondary.default",
      color: "typography.default",
      w: "full",
      _active: {
        bg: "button.secondary.hover",
      },
      _focus: {
        bg: "button.secondary.hover",
      },
      _hover: {
        bg: "button.secondary.hover",
      },
      _disabled: {
        bg: "button.secondary.disabled",
      },
    },
  },
};

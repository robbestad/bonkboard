import { ComponentStyleConfig } from "@chakra-ui/react";

export const Snackbar: ComponentStyleConfig = {
  parts: ["box", "title", "icons", "description", "link"],
  baseStyle: {
    box: {
      border: "0.5px solid",
      borderRadius: { base: "xl", sm: "2xl" },
      p: 3,
      minWidth: { xs: 96 },
    },
    title: {
      fontSize: "lg",
      fontWeight: 600,
    },
    description: {
      fontSize: "sm",
    },
    link: {
      fontSize: "sm",
      color: "main.white",
      display: "inline",
    },
  },
  variants: {
    // SnackbarVariants
    standard: {
      box: {
        bgColor: "card.top",
        color: "main.white",
        borderColor: "main.white",
      },
    },
    success: {
      box: {
        bgColor: "surface.success",
        color: "main.lowRisk",
        borderColor: "main.lowRisk",
      },
    },
    warning: {
      box: {
        bgColor: "surface.warning",
        color: "main.mediumRisk",
        borderColor: "main.mediumRisk",
      },
    },
    critical: {
      box: {
        bgColor: "surface.critical",
        color: "main.highRisk",
        borderColor: "main.highRisk",
      },
    },
  },
};

import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const UnstakeOptions: ComponentStyleConfig = {
  parts: ["option", "check"],
  baseStyle: {
    option: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 4,
      px: 6,
      border: "1px",
      borderRadius: "xl",
      backgroundColor: "#333",
      borderColor: "transparent",
      transitionDuration: "150ms",
      transitionProperty: "background-color, border",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
      _hover: {
        backgroundColor: "#38272D",
        borderColor: "#C3456E",
      },
      _checked: {
        backgroundColor: "#38272D",
        borderColor: "#C3456E",
      },
      _disabled: {
        border: "none",
        bg: "card.textBg",
        cursor: "not-allowed",
        p: { color: "#5C5C5C" },
        ".check": {
          display: "none",
        },
      },
    },
    check: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 8,
      height: 8,
      border: "1.5px solid",
      borderColor: "typography.secondary",
      borderRadius: "full",
      flexShrink: 0,
      transitionDuration: "150ms",
      transitionProperty: "background-color, border",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    comingSoon: {
      borderRadius: "full",
      fontSize: "xs",
      lineHeight: "shorter",
      opacity: 0.6,
      py: "6px",
      px: "10px",
      textTransform: "none",
      color: "typography.disabled",
      bg: "card.top",
    },
  },
};

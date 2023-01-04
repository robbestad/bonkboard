import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const ActionCard: ComponentStyleConfig = {
  parts: ["card", "tab", "form", "inputIcon", "texts", "button"],
  baseStyle: {
    card: {
      bgColor: "card.top",
      borderRadius: "2xl",
      overflow: "hidden",
    },
    tab: {
      px: 6,
      py: 4,
      justifyContent: "flex-start",
      fontWeight: 600,
      fontSize: {
        base: "sm",
        sm: "md",
      },
      _focus: { outline: "none" },
      sx: {
        "&:first-of-type": {
          borderBottomRightRadius: "lg",
        },
        "&:last-of-type": {
          borderBottomLeftRadius: "lg",
        },
      },
    },
    form: {
      alignItems: "stretch",
      experimental_spaceY: 6,
    },
    inputIcon: {
      h: { base: 6, md: 8 },
      w: { base: 6, md: 8 },
    },
    texts: {
      justifyContent: "space-between",
      "p, span": {
        fontSize: { base: "md", md: "lg" },
        fontWeight: 600,
      },
    },
    button: {
      colorScheme: "primary",
      py: 4,
      height: "full",
      width: "full",
    },
  },
  variants: {
    stake: {
      card: {
        border: "2px",
        borderColor: "card.borderLine",
      },
    },
    "lev-stake": {
      card: {
        position: "relative",
        sx: { "&&": { md: { mt: 0 } } },
      },
    },
  },
};

import { ComponentStyleConfig } from "@chakra-ui/react";

export const VaultDisplayCard: ComponentStyleConfig = {
  parts: ["back", "tag", "title", "description", "yield", "footer"],
  variants: {
    "scnsol-lev-stake": {
      back: {
        backgroundImage:
          "linear-gradient(180deg, #FF6798 -120%, #F8437E00 35%)",
        "&::after": {
          boxShadow: "0 0 40px rgba(242, 79, 131, 0.8)",
        },
        "&:hover": {
          borderColor: "main.primary",
        },
      },
      tag: {
        bgColor: "#7C3149",
      },
    },
    "msol-lev-stake": {
      back: {
        backgroundImage:
          "linear-gradient(180deg, #1A4746 -120%, #192E2D00 35%)",
        "&::after": {
          boxShadow: "0 0 40px rgba(91, 191, 156, 0.8)",
        },
        "&:hover": {
          borderColor: "#CFEBE1",
        },
      },
      tag: {
        bgColor: "#294745",
      },
    },
  },
  baseStyle: {
    back: {
      position: "relative",
      border: "solid 2px",
      borderColor: "card.borderLine",
      borderRadius: { base: "xl", sm: "2xl" },
      transition: "border 0.3s ease-in-out",
      bgColor: "card.bottom",
      color: "main.white",
      height: "26rem",
      "&::after": {
        content: "''",
        borderRadius: { base: "xl", sm: "2xl" },
        opacity: 0,
        transition: "opacity 0.3s ease-in-out",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      "&:hover::after": {
        opacity: 1,
      },
    },
    tag: {
      textTransform: "uppercase",
      letterSpacing: 1,
      fontSize: "xs",
      fontWeight: 600,
      borderRadius: 10,
      px: 3,
      py: 1,
    },
    title: {
      ".title-text": {
        fontSize: "3xl",
        fontWeight: 600,
      },
    },
    description: {
      color: "typography.secondary",
      fontSize: "sm",
      fontWeight: 400,
      letterSpacing: 0.5,
      lineHeight: "140%",
    },
    yield: {
      ".yield-title": {
        fontSize: "sm",
        fontWeight: 600,
        color: "typography.subdued",
        textTransform: "uppercase",
      },
      ".yield-value": {
        fontSize: "3xl",
        fontWeight: 600,
      },
      ".yield-desc": {
        fontSize: 14,
        lineHeight: "140%",
        color: "typography.subdued",
      },
    },
    footer: {
      padding: 4,
      width: "100%",
      justifyContent: "space-between",
      borderRadius: 10,
      border: "solid 1px",
      borderColor: "card.borderLine",
      bgColor: "card.top",
      ".position-title": {
        fontSize: "sm",
        fontWeight: 600,
        color: "typography.subdued",
        textTransform: "uppercase",
      },
      ".position-value": {
        fontSize: "sm",
        fontWeight: 600,
      },
    },
  },
};

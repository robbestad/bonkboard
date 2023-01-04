import { ComponentStyleConfig } from "@chakra-ui/react";

export const StrategyCard: ComponentStyleConfig = {
  parts: ["back", "title", "description", "risk", "tokens", "footer"],
  variants: {
    Saber: {
      back: {
        bg: "linear-gradient(180deg, #272561 0%, rgba(21, 20, 50, 0) 100%) border-box",
        borderColor: "#6764FB66",
      },
      footer: { bg: "#6764FB", color: "#fff", svg: { path: { fill: "#fff" } } },
    },
    Orca: {
      back: {
        bg: "linear-gradient(180deg, #4B3E1A 0%, rgba(51, 42, 18, 0) 100%) border-box",
        borderColor: "#FFD15C66",
      },
      footer: { bg: "#FFD15C", color: "#000", svg: { path: { fill: "#000" } } },
    },
    Atrix: {
      back: {
        bg: "linear-gradient(180deg, #383838 0%, rgba(24, 24, 24, 0) 100%) border-box",
        borderColor: "#7E7E7E",
      },
      footer: { bg: "#F1F1F1", color: "#000", svg: { path: { fill: "#000" } } },
    },
    Saros: {
      back: {
        bg: "linear-gradient(180deg, #143326 0%, rgba(13, 34, 25, 0) 100%) border-box",
        borderColor: "#1F6347",
      },
      footer: { bg: "#40A67C", color: "#fff", svg: { path: { fill: "#fff" } } },
    },
    Solend: {
      back: {
        bg: "linear-gradient(180deg, #461B0B 0%, rgba(41, 16, 7, 0) 100%) border-box",
        borderColor: "#72321B",
      },
      footer: { bg: "#FF6730", color: "#000", svg: { path: { fill: "#000" } } },
    },
    Friktion: {
      back: {
        bg: "linear-gradient(180deg, #3F1E38 0%, rgba(39, 18, 35, 0) 100%) border-box",
        borderColor: "#6D3662",
      },
      footer: { bg: "#F077D8", color: "#fff", svg: { path: { fill: "#fff" } } },
    },
    PsyOptions: {
      back: {
        bg: "linear-gradient(180deg, #0C1F50 0%, rgba(8, 21, 54, 0) 100%) border-box",
        borderColor: "#15378F",
      },
      footer: { bg: "#1D4DC9", color: "#fff", svg: { path: { fill: "#fff" } } },
    },
    Apricot: {
      back: {
        bg: "linear-gradient(180deg, #026B5f 0%, rgba(13, 34, 25, 0) 100%) border-box",
        borderColor: "#02A895",
      },
      footer: { bg: "#00dbc0", color: "#000", svg: { path: { fill: "#000" } } },
    },
    Larix: {
      back: {
        bg: "linear-gradient(180deg, #462A68 0%, rgba(70, 42, 104, 0) 100%) border-box",
        borderColor: "#5D358E",
      },
      footer: { bg: "#AB64FF", color: "#fff", svg: { path: { fill: "#fff" } } },
    },
  },
  baseStyle: {
    back: {
      flexDir: "column",
      justifyContent: "space-between",
      borderRadius: "2xl",
      border: "1px",
      pt: 4,
    },
    title: {
      mb: 4,
      px: 4,
      experimental_spaceX: 4,
      img: {
        borderRadius: "full",
      },
      p: {
        fontSize: { base: "xl", sm: "lg" },
        lineHeight: "shorter",
        fontWeight: 600,
      },
    },
    tokens: {
      mb: 4,
      px: 4,
      experimental_spaceY: 2,
      div: {
        justifyContent: "space-between",
        alignItems: "flex-start",
        experimental_spaceX: 2,
        "p:first-of-type": {
          fontSize: "xs",
          lineHeight: "short",
        },
        "p:nth-of-type(2)": {
          fontSize: "xs",
          lineHeight: "shorter",
          fontWeight: 600,
          whiteSpace: "nowrap",
        },
      },
    },
    footer: {
      py: 3,
      px: 4,
      borderBottomRadius: "15px",
      p: {
        fontWeight: { base: 400, sm: 600 },
        fontSize: "sm",
        lineHeight: "short",
      },
      div: {
        justifyContent: "space-between",
      },
    },
  },
};

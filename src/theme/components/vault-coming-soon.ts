import { ComponentStyleConfig } from "@chakra-ui/react";
import { PartsStyleInterpolation } from "@chakra-ui/theme-tools";

import { VaultDisplayCard } from "@/theme/components/vault-display-card";

export const VaultComingSoon: ComponentStyleConfig = {
  parts: ["back", "tag", "title", "description", "yield", "footer", "overlay"],
  variants: {
    "scnsol-lev-stake": {
      back: {
        backgroundImage:
          "linear-gradient(180deg, #FF6798 -120%, #F8437E00 35%)",
      },
      tag: {
        bgColor: "#7C3149",
      },
    },
    "msol-lev-stake": {
      back: {
        backgroundImage:
          "linear-gradient(180deg, #1A4746 -120%, #192E2D00 35%)",
      },
      tag: {
        bgColor: "#294745",
      },
    },
    "jsol-lev-stake": {
      back: {
        backgroundImage:
          "linear-gradient(180deg, #CDAE4E -120%, #3F392800 35%)",
      },
      tag: {
        bgColor: "#715D1D",
      },
    },
    "stsol-lev-stake": {
      back: {
        backgroundImage:
          "linear-gradient(180deg, #015883 -120%, #0E384D00 35%)",
      },
      tag: {
        bgColor: "#015883",
      },
    },
  },
  baseStyle: {
    overlay: {
      position: "absolute",
      borderRadius: { base: "xl", sm: "2xl" },
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(18,18,18,0.7)",
    },
    ...(VaultDisplayCard.baseStyle as PartsStyleInterpolation<any> | undefined),
  },
};

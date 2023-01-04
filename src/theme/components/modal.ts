import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import type { ComponentStyleConfig } from "@chakra-ui/theme";
import type { PartsStyleObject } from "@chakra-ui/theme-tools";

export const Modal: ComponentStyleConfig & {
  baseStyle: PartsStyleObject<typeof parts>;
} = {
  parts: parts.keys,
  baseStyle: (props) => {
    const isFull = props.size === "full";

    return {
      overlay: {
        backdropFilter: "auto",
        backdropBlur: "10px",
      },
      closeButton: {
        fontSize: "16px",
        top: { base: "24px", sm: "48px" },
        right: { base: "16px", sm: "48px" },
      },
      body: {
        px: { base: 4, sm: 12 },
        pt: { base: 3, sm: 10 },
        pb: { base: 6, sm: 12 },
      },
      dialog: {
        bg: "card.bottom",
        ...(isFull
          ? {}
          : {
              borderTopRadius: { base: "20px", sm: "24px" },
              borderBottomRadius: { base: "20px", sm: "24px" },
              mx: { base: 4, sm: 0 },
            }),
      },
      header: {
        px: { base: 4, sm: 12 },
        pt: { base: 6, sm: 12 },
        pb: { base: 3, sm: 10 },
        borderBottomWidth: { sm: "1.5px" },
        borderBottomStyle: "solid",
        borderBottomColor: { sm: "card.dividerLine" },
      },
    };
  },
};

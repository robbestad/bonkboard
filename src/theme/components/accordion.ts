import { accordionAnatomy as parts } from "@chakra-ui/anatomy";
import type { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyleRoot: SystemStyleObject = {
  borderRadius: "6px",
  border: "1px",
  borderColor: "card.borderLine",
  mx: "auto",
  textAlign: "left",
};

const baseStyleContainer: SystemStyleObject = {
  _first: {
    borderTop: 0,
  },
  _last: {
    borderBottom: 0,
  },
};

const baseStyleButton: SystemStyleObject = {
  fontWeight: 500,
  _focus: {
    boxShadow: "outline",
  },
  textAlign: "left",
  py: 3,
  px: 4,
};

const baseStylePanel: SystemStyleObject = {
  py: 3,
  px: 4,
};

const baseStyleIcon: SystemStyleObject = {
  fontSize: "1.5em",
};

export default {
  parts: parts.keys,
  variants: {
    FAQ: {
      root: baseStyleRoot,
      container: baseStyleContainer,
      button: baseStyleButton,
      panel: baseStylePanel,
      icon: baseStyleIcon,
    },
  },
};

import type { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  fontSize: "xs",
  color: "main.highRisk",
};

export default {
  baseStyle: {
    text: baseStyle,
    icon: baseStyle,
  },
};

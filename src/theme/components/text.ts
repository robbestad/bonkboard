import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  fontFamily: "body",
  fontWeight: "medium",
  lineHeight: 1.4,
};
/**
 * the comments under the object key shows the pixel value for (mobile | desktop)
 */
const sizes: Record<string, SystemStyleObject> = {
  lg: {
    //  Body large (14px | 16px)
    fontSize: ["sm", null, "md"],
  },
  md: {
    //  Heading (12px | 14px)
    fontSize: ["xs", null, "sm"],
  },
  sm: {
    // Subheading (12px | 12px)
    fontSize: "xs",
    fontWeight: "normal",
  },
};

const defaultProps = {
  size: "lg",
};

export default {
  baseStyle,
  sizes,
  defaultProps,
};

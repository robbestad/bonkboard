import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  fontFamily: "heading",
  fontWeight: "semibold",
};
/**
 * the comments under the object key shows the pixel value for (mobile | desktop)
 */
const sizes: Record<string, SystemStyleObject> = {
  "3xl": {
    // Display X Large (38px | 72px)
    fontSize: ["4xl", null, "6xl"],
    fontWeight: [700, null, 600],
    lineHeight: [1, null, 0.95],
  },
  "2xl": {
    // Display Large (24px | 48px)
    fontSize: ["2xl", null, "5xl"],
    fontWeight: [700, null, 600],
    lineHeight: [1.2, null, 0.95],
  },
  xl: {
    // Display Medium (20px | 36px)
    fontSize: ["xl", null, "3xl"],
    lineHeight: [1.2, null, 1],
  },
  lg: {
    //  Display Small (16px | 24px)
    fontSize: ["md", null, "2xl"],
    lineHeight: [1.2, null, 1.2],
  },
  md: {
    //  Heading (14px | 18px)
    fontSize: ["sm", null, "lg"],
    lineHeight: 1.2,
  },
  sm: {
    // Subheading (10px | 14px)
    fontSize: ["xxs", null, "sm"],
    lineHeight: 1,
    textTransform: "uppercase",
    letterSpacing: "1%",
  },
};

const defaultProps = {
  size: "xl",
};

export default {
  baseStyle,
  sizes,
  defaultProps,
};

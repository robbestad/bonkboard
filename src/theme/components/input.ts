import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import { PartsStyleFunction } from "@chakra-ui/theme-tools";

const variantFilled: PartsStyleFunction<typeof parts> = () => ({
  field: {
    px: 5,
    borderWidth: "1.5px",
    borderColor: "card.borderLine",
    borderRadius: "8px",
  },
  addon: {
    px: 5,
    border: "1.5px solid",
    borderColor: "transparent",
  },
});

const variantBlend: PartsStyleFunction<typeof parts> = (props) => {
  const filled = variantFilled(props);
  /* eslint-disable no-underscore-dangle */
  return {
    field: {
      ...filled.field,
      bg: "transparent",
      borderColor: "transparent",
      _disabled: {
        // @ts-ignore
        ...filled.field!._disabled,
        borderColor: "transparent",
      },
      _hover: {
        // @ts-ignore
        ...filled.field!._hover,
        bg: "transparent",
      },
      _focus: {
        // @ts-ignore
        ...filled.field!._focus,
        bg: "transparent",
      },
    },
  };
  /* eslint-enable no-underscore-dangle */
};

const defaultProps = {
  size: "md",
  variant: "filled",
};

export default {
  parts: parts.keys,
  variants: {
    filled: variantFilled,
    blend: variantBlend,
  },
  defaultProps,
};

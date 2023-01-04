import {
  SystemStyleFunction,
  SystemStyleObject,
  transparentize,
} from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  borderRadius: { base: "2xl", sm: "xl" },
  outlineOffset: 0,
};

const sizes: Record<string, SystemStyleObject> = {
  lg: {
    fontSize: "lg",
    height: 14,
    minW: 14,
    px: 6,
  },
  md: {
    fontSize: "lg",
    height: 12,
    minW: 12,
    px: 6,
  },
  sm: {
    fontSize: "sm",
    height: 10,
    minW: 10,
    px: 6,
  },
  xs: {
    fontSize: "sm",
    height: 7,
    minW: 7,
    px: 6,
  },
};

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c, isDisabled } = props;

  const baseFocus = { boxShadow: "none", outline: "2px solid" };

  if (c === "tertiary") {
    const overAlpha50 = transparentize(
      "button.tertiary.over",
      0.5
    )(props.theme);

    const gradients = {
      default:
        "linear(to-r, button.tertiary.start 0%, button.tertiary.over 60%, button.tertiary.end 100%)",
      hover: `linear(to-r, ${transparentize(
        "button.tertiary.start",
        0.8
      )(props.theme)} 0%, ${transparentize(
        "button.tertiary.over",
        0.8
      )(props.theme)} 60%, ${transparentize(
        "button.tertiary.end",
        0.8
      )(props.theme)} 100%)`,
      disabled: `linear(to-r, ${transparentize(
        "button.tertiary.start",
        0.5
      )(props.theme)} 0%, ${overAlpha50} 60%, ${transparentize(
        "button.tertiary.end",
        0.5
      )(props.theme)} 100%)`,
    };

    const disabled = {
      bgColor: "button.tertiary.start",
      color: "typography.disabled",
      bgGradient: gradients.disabled,
    };

    return {
      bg: "transparent",
      bgGradient: gradients.default,
      color: "typography.inverted",
      _hover: {
        bgGradient: gradients.hover,
        _disabled: disabled,
      },
      _disabled: disabled,
      _active: {
        outlineColor: overAlpha50,
      },
      _focus: {
        ...baseFocus,
        outlineColor: overAlpha50,
      },
    };
  }

  const disabled = {
    bgColor: `button.${c}.disabled`,
    color: "typography.disabled",
  };

  return {
    bg: `button.${c}.default`,
    color: "main.white",
    _hover: {
      bg: `button.${c}.hover`,
      _disabled: disabled,
    },
    _disabled: disabled,
    _active: isDisabled
      ? {}
      : {
          outlineColor: `button.${c}.disabled`,
          bg: `button.${c}.active`,
        },
    _focus: {
      ...baseFocus,
      outlineColor: `button.${c}.disabled`,
      bg: `button.${c}.focus`,
    },
  };
};

const variantPlain: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;

  const baseFocus = { boxShadow: "none", outline: "none" };

  const variantSizes = {
    fontSize: "sm",
    fontWeight: 400,
    height: 10,
    minW: 10,
    px: 6,
  };

  if (c === "primary") {
    const disabled = {
      bgColor: `transparent`,
      color: `button.primary.disabled`,
    };

    return {
      ...variantSizes,
      bg: `transparent`,
      color: `button.primary.default`,
      _hover: {
        color: `button.primary.hover`,
        _disabled: disabled,
      },
      _disabled: disabled,
      _active: {
        color: `button.primary.hover`,
      },
      _focus: {
        ...baseFocus,
        color: `button.primary.hover`,
      },
    };
  }

  return {
    ...variantSizes,
    bg: `transparent`,
    color: `typography.default`,
    _hover: {
      color: `typography.subdued`,
      _disabled: {
        color: `typography.disabled`,
      },
    },
    _disabled: {
      color: `typography.disabled`,
    },
    _active: {
      color: `typography.default`,
    },
    _focus: {
      ...baseFocus,
      color: `typography.default`,
    },
  };
};

const variants = {
  solid: variantSolid,
  plain: variantPlain,
};

const defaultProps = {
  size: "md",
  variant: "solid",
  colorScheme: "primary",
};

export default {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

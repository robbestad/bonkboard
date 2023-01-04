const styles = {
  global: {
    body: {
      height: "100%",
      bg: "main.white",
      color: "main.black",
    },
    ".chakra-button__icon": {
      "&&": {
        marginInlineStart: "0",
      },
    },
    "#__next ": {
      width: "100%",
      height: "100%",
      position: "relative",
    },
    // Solana Wallet Adapter Modal
    ".wallet-adapter-modal-wrapper": {
      bg: "surface.default",
      borderRadius: "3xl",
      border: "1.5px",
      borderStyle: "solid",
      borderColor: "card.borderLine",
      p: 6,
      fontFamily: "var(--font-pixel), system-ui, sans-serif",
    },
    ".wallet-adapter-modal-button-close": {
      bg: "none",
      svg: {
        fill: "typography.subdued",
      },
    },
    ".wallet-adapter-modal-title": {
      fontWeight: 600,
      fontSize: "2xl",
      lineHeight: "7",
      px: 0,
      py: 10,
      maxWidth: "250px",
    },
    ".wallet-adapter-modal-list": {
      mb: 4,
      li: {
        mb: 2.5,
      },
      ".wallet-adapter-button": {
        p: 4,
        fontSize: "lg",
        fontWeight: 600,
        lineHeight: "short",
        bgColor: "button.secondary.default",
        borderRadius: "2xl",
        ":not([disabled]):hover": {
          bgColor: "button.secondary.hover",
        },
        ".wallet-adapter-button-start-icon": {
          mr: 2,
        },
        span: {
          fontSize: "sm",
          lineHeight: "shorter",
          fontWeight: 400,
          color: "typography.subdued",
          opacity: 1,
        },
      },
    },
    ".wallet-adapter-modal-list-more": {
      p: 0,
      span: {
        fontSize: "sm",
        lineHeight: "shorter",
      },
    },
  },
};

export default styles;

export const BREAKPOINT = {
  XS: 480,
  SM: 768,
  MD: 992,
  LG: 1280,
  XL: 1440,
};

export const mediaQuery = {
  min: {
    xs: `(min-width: ${BREAKPOINT.XS}px)`,
    sm: `(min-width: ${BREAKPOINT.SM}px)`,
    md: `(min-width: ${BREAKPOINT.MD}px)`,
    lg: `(min-width: ${BREAKPOINT.LG}px)`,
    xl: `(min-width: ${BREAKPOINT.XL}px)`,
  },
  max: {
    xs: `(max-width: ${BREAKPOINT.XS - 1}px)`,
    sm: `(max-width: ${BREAKPOINT.SM - 1}px)`,
    md: `(max-width: ${BREAKPOINT.MD - 1}px)`,
    lg: `(max-width: ${BREAKPOINT.LG - 1}px)`,
    xl: `(max-width: ${BREAKPOINT.XL - 1}px)`,
  },
};

const breakpoints = {
  xs: `${BREAKPOINT.XS}px`,
  sm: `${BREAKPOINT.SM}px`,
  md: `${BREAKPOINT.MD}px`,
  lg: `${BREAKPOINT.LG}px`,
  xl: `${BREAKPOINT.XL}px`,
};

export default breakpoints;

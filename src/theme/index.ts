import { extendTheme, ThemeConfig } from "@chakra-ui/react";

import * as components from "@/theme/components";
import foundations from "@/theme/foundations";
import styles from "@/theme/styles";

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "light",
  cssVarPrefix: "unstake",
};

const theme = extendTheme({
  ...foundations,
  components: {
    ...components,
  },
  styles,
  config,
});

export default theme;

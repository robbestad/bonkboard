import { Box } from "@chakra-ui/react";

export function Board() {
  return (
    <Box>
      Wow such board! gg
      <Box as="canvas" width="500" height="500" border="1px" />
    </Box>
  );
}

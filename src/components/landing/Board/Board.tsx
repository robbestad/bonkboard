import { useEffect, useRef } from "react";
import { Box, Flex } from "@chakra-ui/react";

export function Board() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        // draw something on canvas on load
      }
    }
  }, []);

  return (
    <Flex direction="column" align="center" justify="center">
      Wow such board! gg
      <Box
        // @ts-ignore
        ref={canvasRef}
        as="canvas"
        width="500px"
        height="500px"
        border="1px"
        mt={8}
      />
    </Flex>
  );
}

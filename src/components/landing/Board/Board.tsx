import { useEffect, useRef, useState } from "react";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import { Box, Flex, Text } from "@chakra-ui/react";

const CANVAS_SIZE = {
  width: 500,
  height: 500,
};

export function Board() {
  const [color, setColor] = useState<RgbaColor>({ r: 0, g: 0, b: 0, a: 1 });

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
    <Flex direction="column" align="center" justify="center" gap={8}>
      <Text>Wow such board! gg</Text>

      <RgbaColorPicker color={color} onChange={setColor} />

      <Box
        // @ts-ignore
        ref={canvasRef}
        as="canvas"
        width={`${CANVAS_SIZE.width}px`}
        height={`${CANVAS_SIZE.height}px`}
        border="1px"
      />
    </Flex>
  );
}

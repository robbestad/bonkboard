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
        // TODO get attr from Box, no magic numbers
        const imageData = context.createImageData(500, 500);
        const {data} = imageData;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255; // red
          data[i + 1] = 0; // green
          data[i + 2] = 0; // blue
          data[i + 3] = 255; // alpha channel
        }
        context.putImageData(imageData, 0, 0);
      }
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      // const canvas = canvasRef.current;
      // canvas.addEventListener("mousemove", (event) => pick(event, hoveredColor));
      // canvas.addEventListener("click", (event) => pick(event, selectedColor));
    }
  });

  /*
  function pick(event, destination) {
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;
    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;
  }
  */

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

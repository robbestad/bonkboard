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

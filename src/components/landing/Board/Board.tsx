import { useEffect, useRef, useState } from "react";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import { Flex, Text } from "@chakra-ui/react";

const CANVAS_SIZE = {
  width: 500,
  height: 500,
};

const SCALE = 3;

export function Board() {
  const [color, setColor] = useState<RgbaColor>({ r: 0, g: 0, b: 0, a: 1 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // draw something on canvas on load
        // TODO get attr from Box, no magic numbers
        const imageData = context.createImageData(
          CANVAS_SIZE.width,
          CANVAS_SIZE.height
        );
        const { data } = imageData;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255; // red
          data[i + 1] = 255; // green
          data[i + 2] = 255; // blue
          data[i + 3] = 255; // alpha channel
        }
        context.putImageData(imageData, 0, 0);
      }
    }
  }, []);

  function showZoom(e: any) {
    const canvas = canvasRef.current;
    const zoomCanvas = zoomCanvasRef.current;
    const [x, y] = getCursorPosition(e);
    if (canvas && zoomCanvas) {
      const zoomContext = zoomCanvas.getContext("2d");
      if (zoomContext) {
        zoomContext.imageSmoothingEnabled = false;
        zoomContext.drawImage(
          canvas,
          Math.min(Math.max(0, x - 5), CANVAS_SIZE.width - 10),
          Math.min(Math.max(0, y - 5), CANVAS_SIZE.height - 10),
          11,
          11,
          0,
          0,
          500,
          500
        );
        zoomContext.strokeStyle = "yellow";
        zoomContext.lineWidth = 3;
        zoomContext.strokeRect(250 - 23, 250 - 23, 46, 46);
      }
    }
  }

  function paint(e: any) {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const [x, y] = getCursorPosition(e);
        context.fillStyle = "black";
        context?.fillRect(x, y, 1, 1);
      }
    }
  }

  function getCursorPosition(event: any) {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((event.clientX - rect.left) / SCALE);
      const y = Math.floor((event.clientY - rect.top) / SCALE);
      return [x, y];
    }
    return [-1, -1];
  }

  return (
    <Flex direction="column" align="center" justify="center" gap={8}>
      <Text>Wow such board! gg</Text>

      <RgbaColorPicker color={color} onChange={setColor} />

      <Flex direction="row">
        <div>
          <canvas
            // @ts-ignore
            ref={canvasRef}
            width={CANVAS_SIZE.width}
            height={CANVAS_SIZE.height}
            style={{
              imageRendering: "pixelated",
              border: "1px solid black",
              transform: `scale(${SCALE})`,
            }}
            onMouseMove={(e) => {
              showZoom(e);
            }}
            onClick={(e) => {
              paint(e);
              showZoom(e);
            }}
          />
        </div>
        <div>
          <canvas
            // @ts-ignore
            ref={zoomCanvasRef}
            width={CANVAS_SIZE.width}
            height={CANVAS_SIZE.height}
            style={{
              imageRendering: "pixelated",
              border: "1px solid black",
              transform: "scale(1)",
            }}
          />
        </div>
      </Flex>
    </Flex>
  );
}

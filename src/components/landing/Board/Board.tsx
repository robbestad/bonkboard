import { useEffect, useRef, useState } from "react";
import { RgbStringColorPicker } from "react-colorful";
import { Button, ButtonGroup, Flex, Grid, GridItem , Text } from "@chakra-ui/react";

const CANVAS_SIZE = {
  width: 500,
  height: 500,
};

export function Board() {
  const [color, setColor] = useState<string>('rgba(0,0,0,1)');
  const [scale, setScale] = useState<number>(1);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [actions, setActions] = useState<Array>([])
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [actionMode, setActionMode] = useState<string>("normal");

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

  function uint8torgb(u: Uint8ClampedArray) {
    return `rgba(${u[0]}, ${u[1]}, ${u[2]}, ${u[3]})`
  }

  function performActionOnCanvas(e: any) {
    // Eyedropper mode
    if (actionMode === "eyedropper") {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        if (context) {
          const [x, y] = getCursorPosition(e);
          const pixel = context.getImageData(x, y, 1, 1);
          setColor(uint8torgb(pixel.data))
        }
      }
    }
    else {
      paint(e)
    }
  }

  function paint(e: any) {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const [x, y] = getCursorPosition(e);
        const pixel = context.getImageData(x, y, 1, 1);
        const [r,g,b] = color.slice(
          color.indexOf("(") + 1,
          color.indexOf(")")
        ).split(", ");
        const newPixel = [x, y, new Uint8ClampedArray([r, g, b, 255])];

        // Do a very quick and dirty dedupe

        if (actions.length >= 1 && 
          JSON.stringify(actions.slice(-1)[0][1]) === JSON.stringify(newPixel)
          ) {
          // pass don't do anything
        }

        else {
          setActions([...actions, [
            [x, y, pixel.data], 
            newPixel
          ]])
        }

      }
    }
  }

  // Update Canvas every time a pixel is changed
  useEffect(() => {
    function paintOnCanvas(){
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        if (context) {
          actions.forEach((action) => {
            const lastAction = action[1]
            context.fillStyle = `rgba(${lastAction[2][0]}, ${lastAction[2][1]}, ${lastAction[2][2]}, ${lastAction[2][3] / 255})`
            context?.fillRect(lastAction[0], lastAction[1], 1, 1);
          })
        }
      }
    }

    paintOnCanvas()
  }, [actions])


  // Update Zoom view everytime a pixel is changed or the mouse moves
  // FIXME this is not working
  useEffect(() => {
  function paintOnZoomCanvas() {
    const canvas = canvasRef.current;
    const zoomCanvas = zoomCanvasRef.current;
    if (canvas && zoomCanvas) {
      const zoomContext = zoomCanvas.getContext("2d");
      if (zoomContext) {
        zoomContext.imageSmoothingEnabled = false;
        zoomContext.drawImage(
          canvas,
          Math.min(Math.max(0, mouseX - 5), CANVAS_SIZE.width - 10),
          Math.min(Math.max(0, mouseY - 5), CANVAS_SIZE.height - 10),
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
    paintOnZoomCanvas();
  }, [mouseX, mouseY, actions])


  function undo() {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const [x, y, prevColour] = actions[actions.length-1][0]
        context.fillStyle = `rgba(${prevColour[0]}, ${prevColour[1]}, ${prevColour[2]}, ${prevColour[3] / 255})`
        context?.fillRect(x, y, 1, 1);
        // Pop out the last element of the array
        if (actions.length > 0) {
          setActions(actions.slice(0, -1))
        }
      }
    }
  }

  function getCursorPosition(event: any) {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((event.clientX - rect.left) / scale) - 1;
      const y = Math.floor((event.clientY - rect.top) / scale) - 1;
      return [x, y];
    }
    return [-1, -1];
  }

  function zoomIn() {
    const canvas = canvasRef.current;
    if (canvas) {
      setScale(scale + 1)
    }
  }

  function zoomOut() {
    const canvas = canvasRef.current;
    if (canvas) {
      setScale(Math.max(scale - 1, 1))
    }
  }

  function panLeft() {
    setTranslateX(translateX + 40)
  }

  function panRight() {
    setTranslateX(translateX - 40)
  }

  function panUp() {
    setTranslateY(translateY + 40)
  }

  function panDown() {
    setTranslateY(translateY - 40)
  }

  function parse(a: Array) {
    return `Pixels changed: ${a.length}. BONK cost: ${a.length * 10000}`
    // return a.reduce((acc, val) => `${acc  }\n\n x: ${val[0][0]}, y: ${val[0][1]}: ${val[0][2]} --> ${val[1][2]}`, '')
  }

  return (
    // <Flex direction="column" align="center" justify="center" gap={8}>

      <Grid templateColumns="3fr 1fr" gap={10} minHeight="100%">

        <GridItem backgroundColor="rgba(255,230,220)">
          <div
            style = {{
              translate: `${translateX}px ${translateY}px`,
            }}
          >
            <canvas
              // @ts-ignore
              ref={canvasRef}
              width={CANVAS_SIZE.width}
              height={CANVAS_SIZE.height}
              style={{
                imageRendering: "pixelated",
                border: "1px solid black",
                transform: `scale(${scale})`,
                cursor: "crosshair",
              }}
              onMouseMove={(e) => {
                const [x, y] = getCursorPosition(e);
                setMouseX(x);
                setMouseY(y);
                if (e.buttons === 1) {
                  paint(e);
                }
              }}
              onClick={(e) => {
                performActionOnCanvas(e);
              }}
            />
          </div>
        </GridItem>

        <GridItem>
            <Button variant='outline' onClick={(e) => {zoomIn()}}>Zoom In</Button>
            <Button variant='outline' onClick={(e) => {zoomOut()}}>Zoom Out</Button>
            <Button variant='outline' onClick={(e) => {panLeft()}}>Pan Left</Button>
            <Button variant='outline' onClick={(e) => {panRight()}}>Pan Right</Button>
            <Button variant='outline' onClick={(e) => {panUp()}}>Pan Up</Button>
            <Button variant='outline' onClick={(e) => {panDown()}}>Pan Down</Button>
            <Button variant='outline' onClick={() => {undo()}}>Undo</Button>
            <Button variant='outline' onClick={() => {}}>Refresh Image</Button>
            <Button 
              variant={actionMode !== "eyedropper" ? 'outline' : 'solid'}
              onClick={() => {
                if (actionMode === "eyedropper") {
                  setActionMode("normal")
                }
                else {
                  setActionMode("eyedropper")
                }}}>
                Eyedropper Mode
            </Button>

          <Button size="lg" onClick={() => {}}>Submit!</Button>
          <Text>
            {parse(actions)}
          </Text>
          <RgbStringColorPicker color={color} onChange={setColor} />
          <input type="text" value={color}/>
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
        </GridItem>
      </Grid>
    //  </Flex>
  );
}

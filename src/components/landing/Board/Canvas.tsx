import { useState } from "react";
import { Box } from "@chakra-ui/react";

import colors from "@/components/Landing/Board/colors";
import { Pixel } from "@/components/Landing/Board/Pixel";

type CanvasProps = {
  currentColor: string;
};

type Board = [number[]];

const defaultBoard = Array(512).fill(Array(512).fill(0)) as Board;

export function Canvas({ currentColor }: CanvasProps) {
  const [board, setBoard] = useState<Board>(defaultBoard);

  const changeColor = (rowIndex: number, index: number) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    if (currentColor !== newBoard[rowIndex][index]) {
      newBoard[rowIndex][index] = currentColor;
    } else {
      newBoard[rowIndex][index] = 0;
    }

    setBoard(newBoard);
    localStorage.clear();
    try {
      localStorage.setItem("board", JSON.stringify(newBoard));
    } catch (domException) {
      if (
        domException instanceof DOMException &&
        ["QuotaExceededError", "NS_ERROR_DOM_QUOTA_REACHED"].includes(
          domException.name
        )
      ) {
        // handle quota limit exceeded error
        console.log(domException);
      }
    }
  };

  return (
    <Box>
      {board.map((row, rowIndex) =>
        row.map((_, index) => (
          <Pixel
            key={`${rowIndex}-${index}`}
            background={colors[board[rowIndex][index]]}
            onClick={() => changeColor(rowIndex, index)}
          />
        ))
      )}
    </Box>
  );
}

import { createContext, ReactNode, useContext, useMemo } from "react";
import { Program } from "@project-serum/anchor";

import { useSolana } from "@/contexts/SolanaContext";
import { useBoardProgram } from "@/hooks/useBoardProgram";
import { BonkBoardProgram } from "@/lib/bonk_board_program";

export type BoardProgramContextType = {
  boardProgram: Program<BonkBoardProgram>;
};

const BoardProgramContext = createContext<BoardProgramContextType | null>(null);

type BoardProgramProviderProps = {
  children: ReactNode;
};

export function BoardProgramProvider({ children }: BoardProgramProviderProps) {
  const {
    cluster: { network },
  } = useSolana();
  const boardProgram = useBoardProgram(network);

  const value = useMemo(() => ({ boardProgram }), [boardProgram]);

  return (
    <BoardProgramContext.Provider value={value}>
      {children}
    </BoardProgramContext.Provider>
  );
}

export function useBoardProgramContext(): BoardProgramContextType {
  const ctx = useContext(BoardProgramContext);
  if (ctx === null) {
    throw new Error("BoardProgram context not available");
  }
  return ctx;
}

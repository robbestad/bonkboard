import { Program } from "@project-serum/anchor";
import { ClusterType } from "@soceanfi/stake-pool-sdk";
import { useConnection } from "@solana/wallet-adapter-react";
import useSWR from "swr";

import { useBoardProgramContext } from "@/contexts/BoardProgramContext";
import { useSolana } from "@/contexts/SolanaContext";
import { BOARD_ACCOUNT, BOARD_DATA_ACCOUNT } from "@/hooks/useBoardProgram";
import { BonkBoardProgram } from "@/lib/bonk_board_program";

// interface Pixel {
//   x: number;
//   y: number;
//   color: string;
// }

export type BoardPixels = number[];

const fetcher = async (
  boardProgram: Program<BonkBoardProgram>,
  cluster: ClusterType | "localnet"
): Promise<BoardPixels> => {
  const board = await boardProgram.account.board.fetch(BOARD_ACCOUNT[cluster]);

  console.log({ board });

  const boardData = await boardProgram.account.boardData.fetch(
    BOARD_DATA_ACCOUNT[cluster]
  );

  console.log({ boardData });

  return boardData.data;
};

interface UseBoardPixels {
  pixels: BoardPixels | undefined;
  loading: boolean;
  error: Error | undefined;
}

export function useBoardPixels(): UseBoardPixels {
  const { connection } = useConnection();
  const {
    cluster: { network },
  } = useSolana();
  const { boardProgram } = useBoardProgramContext();

  const { data, error } = useSWR<BoardPixels, Error>(
    [connection.rpcEndpoint, "pixels"],
    () => fetcher(boardProgram, network),
    { refreshInterval: 60_000, revalidateOnFocus: false }
  );

  if (error) {
    console.log(error);
  }

  return {
    pixels: data,
    loading: !data && !error,
    error,
  };
}

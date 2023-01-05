import { Program } from "@project-serum/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import useSWR from "swr";

import {
  BonkBoardProgram,
  IDL,
} from "@/hooks/useBoardPixels/bonk_board_program";

interface Pixel {
  x: number;
  y: number;
  color: string;
}

export interface BoardPixels {
  pixels: Pixel[];
}

// Change this when we go live
const PROG_ID = new PublicKey("GG26rKD3RoP2dDcEufYUoNvVzkh1eYRpiF4p5SVC1bni");
const BOARD_ACC = new PublicKey("DREm2VkXSRPoQEgUJJagekoZsmWQ29wA4cLNPBQMzsjp");
const BOARD_DATA_ACC = new PublicKey(
  "EL1435o4t9cCc8yWRiizKjz4Ln8NnWuYkpF9g2gkTdzr"
);

const fetcher = async (connection: Connection): Promise<BoardPixels> => {
  const BONK_PROGRAM: Program<BonkBoardProgram> = new Program(
    IDL as BonkBoardProgram,
    PROG_ID,
    { connection }
  );

  const board = await BONK_PROGRAM.account.board.fetch(BOARD_ACC);

  console.log({ board });

  const boardData = await BONK_PROGRAM.account.boardData.fetch(BOARD_DATA_ACC);

  console.log({ boardData });

  const pixels: Pixel[] = [];

  return {
    pixels,
  };
};

interface UseBoardPixels {
  pixels: BoardPixels | undefined;
  loading: boolean;
  error: Error | undefined;
}

export function useBoardPixels(): UseBoardPixels {
  const { connection } = useConnection();

  const { data, error } = useSWR<BoardPixels, Error>(
    [connection.rpcEndpoint, "pixels"],
    () => fetcher(connection),
    { refreshInterval: 60_000, revalidateOnFocus: false }
  );

  return {
    pixels: data,
    loading: !data && !error,
    error,
  };
}

import { useMemo } from "react";
import { Address, AnchorProvider, Program } from "@project-serum/anchor";
import type { ClusterType } from "@soceanfi/stake-pool-sdk";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

import { BonkBoardProgram, IDL } from "@/lib/bonk_board_program";

// TODO: update!!!
export const BOARD_PROGRAM: { [networkName: string]: PublicKey } = {
  "mainnet-beta": new PublicKey("GG26rKD3RoP2dDcEufYUoNvVzkh1eYRpiF4p5SVC1bni"),
  testnet: new PublicKey("GG26rKD3RoP2dDcEufYUoNvVzkh1eYRpiF4p5SVC1bni"),
  devnet: new PublicKey("ALz1fjGZ2YeBdD5dJLo3HRTWcs7fAZzHxqsyz28fVGA9"),
  localnet: new PublicKey("GG26rKD3RoP2dDcEufYUoNvVzkh1eYRpiF4p5SVC1bni"),
};

// TODO: update!!!
export const BOARD_ACCOUNT: { [networkName: string]: Address } = {
  "mainnet-beta": "DREm2VkXSRPoQEgUJJagekoZsmWQ29wA4cLNPBQMzsjp",
  testnet: "DREm2VkXSRPoQEgUJJagekoZsmWQ29wA4cLNPBQMzsjp",
  devnet: "DyQE5BSB22NzGUzqbscVBci2oh5hjRMbHSpznuYjhi5r",
  localnet:
    process.env.NEXT_PUBLIC_BOARD_ACCOUNT_LOCALNET ||
    "DREm2VkXSRPoQEgUJJagekoZsmWQ29wA4cLNPBQMzsjp",
};

// TODO: update!!!
export const BOARD_DATA_ACCOUNT: { [networkName: string]: Address } = {
  "mainnet-beta": "EL1435o4t9cCc8yWRiizKjz4Ln8NnWuYkpF9g2gkTdzr",
  testnet: "EL1435o4t9cCc8yWRiizKjz4Ln8NnWuYkpF9g2gkTdzr",
  devnet: "GwLmCgymWQPQ3QL2adMgM8ot9DyD3kGJ2MPZ5US9Mqdc",
  localnet:
    process.env.NEXT_PUBLIC_BOARD_DATA_ACCOUNT_LOCALNET ||
    "EL1435o4t9cCc8yWRiizKjz4Ln8NnWuYkpF9g2gkTdzr",
};

/**
 * NOTE: program.provider DOES NOT HAVE WALLET CONNECTED
 * DO NOT USE ANY .rpc CALLS WITH IT
 * @param network
 * @returns
 */
export function useBoardProgram(
  network: ClusterType | "localnet" // TODO: remove localnet when stake pool sdk supports it,
): Program<BonkBoardProgram> {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  return useMemo(() => {
    let provider = { connection };
    if (wallet) {
      provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
      });
    }
    return new Program(IDL, BOARD_PROGRAM[network], provider);
  }, [network, connection, wallet]);
}

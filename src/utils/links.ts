import { ClusterType } from "@soceanfi/stake-pool-sdk";
import { Transaction } from "@solana/web3.js";
import base58 from "bs58";

// TODO: remove localnet when stake pool sdk supports it
export function txToSolScanLink(
  txSig: string,
  cluster: ClusterType | "localnet"
): string {
  return `https://solscan.io/tx/${txSig}?cluster=${cluster}`;
}

const SOLANA_FM_NETWORK_TO_CLUSTER_QUERY: {
  [c in ClusterType | "localnet"]: string;
} = {
  localnet: "localnet",
  "mainnet-beta": "mainnet-qn1",
  devnet: "devnet-solana",
  testnet: "testnet-solana",
};

export function txToSolanaFMLink(
  txSig: string,
  cluster: ClusterType | "localnet"
): string {
  return `https://solana.fm/tx/${txSig}?cluster=${SOLANA_FM_NETWORK_TO_CLUSTER_QUERY[cluster]}`;
}

/**
 * Adapted from https://github.com/solana-labs/governance-ui/blob/f583e7d57e67233615880a32e966e42ac437bb58/components/explorer/tools.ts
 * @param tx
 */
// TODO: remove localnet when stake pool sdk supports it
export function txToSimulationLink(
  transaction: Transaction,
  cluster: ClusterType | "localnet"
): string {
  const SIGNATURE_LENGTH = 64;
  const explorerUrl = new URL(
    `https://explorer.solana.com/tx/inspector?cluster=${cluster}`
  );
  const signatures = transaction.signatures.map((s) =>
    base58.encode(s.signature ?? Buffer.alloc(SIGNATURE_LENGTH))
  );
  explorerUrl.searchParams.append("signatures", JSON.stringify(signatures));

  const message = transaction.serializeMessage();
  explorerUrl.searchParams.append("message", message.toString("base64"));
  return explorerUrl.toString();
}

export const HELLO_NEXT_LINK = "https://unstake.hellonext.co/b/feedback";

export const NEW_STREAMS_APP = "https://streams.so/app/streams";

export const OLD_COLLECTIBLES_APP = "https://old.socean.fi/app/collectibles";

export const UNSTAKE_PROGRAM_SOLANA_FM_LINK =
  "https://solana.fm/address/unpXTU2Ndrc7WWNyEhQWe4udTzSibLPi25SXv2xbCHQ";

export const EXAMPLE_UNSTAKE_TX_LINK =
  "https://solana.fm/tx/312dyQQoSTKwRJSsUyLUYC2Fy2DcjBmavNxuZukAKSedsjYFTBfW7ni479v5SZs3kVwU69UBnYxvKhEhJz2tw8gs";
export const TWITTER_LINK = "https://twitter.com/unstakeit";

export const SUBSTACK_LINK = "https://unstakeit.substack.com/";

export const UNSTAKE_SDK = "https://www.npmjs.com/package/@unstake-it/sol";

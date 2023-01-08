import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";

/**
 * Socean DAO's wrapped SOL spl token account
 */
export const SOCEAN_SOL_TREASURY = new PublicKey(
  "3Gdk8hMa76JF8p5jonMP7vYPZuXRTJDtLmysYabB6WEE"
);

export const SOL_DECIMALS = 9;
export const SCN_SOL_DECIMALS = 9;
export const SCN_SOL_MINT = new PublicKey(
  "5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm"
);

export const ZERO_BN = new BN(0);
/**
 * The min. amount of lamports a user must have remaining in his wallet
 * = 0.05 SOL
 */
export const MIN_LAMPORTS_USER_WALLET = 0.05 * 10 ** SOL_DECIMALS;

export const TOKEN_TO_MINT = {
  scnSOL: new PublicKey("5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm"),
  JSOL: new PublicKey("7Q2afV64in6N6SeZsAAB81TJzwDoD6zpqmHkzi9Dcavn"),
  bSOL: new PublicKey("bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1"),
  daoSOL: new PublicKey("GEJpt3Wjmr628FqXxTgxMce1pLntcPV4uFi8ksxMyPQh"),
  mSOL: new PublicKey("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"),
  stSOL: new PublicKey("7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj"),
  eSOL: new PublicKey("Hg35Vd8K3BS2pLB3xwC2WqQV8pmpCm3oNRGYP1PEpmCM"),
  laineSOL: new PublicKey("LAinEtNLgpmCP9Rvsf5Hn8W6EhNiKLZQti1xfWMLy6X"),
  jitoSOL: new PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"),
};

export type UnstakeableToken = keyof typeof TOKEN_TO_MINT;

// Maximum number of pixels that can be sent in a transaction
export const MAX_PIXELS = 100;

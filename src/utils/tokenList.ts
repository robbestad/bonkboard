import { PublicKey } from "@solana/web3.js";

const KNOWN_TOKEN_NAMES: { [mint: string]: string } = {
  "5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm": "scnSOL",
  "7Q2afV64in6N6SeZsAAB81TJzwDoD6zpqmHkzi9Dcavn": "JSOL",
  bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1: "bSOL",
  GEJpt3Wjmr628FqXxTgxMce1pLntcPV4uFi8ksxMyPQh: "daoSOL",
  mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So: "mSOL",
  "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj": "stSOL",
  Hg35Vd8K3BS2pLB3xwC2WqQV8pmpCm3oNRGYP1PEpmCM: "eSOL",
};

export function getKnownTokenName(
  mint: string | PublicKey
): string | undefined {
  return KNOWN_TOKEN_NAMES[mint.toString()];
}

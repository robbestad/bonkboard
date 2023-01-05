import { PublicKey } from "@solana/web3.js";

// PDA
export function findFeeAccount(
  bonkBoardProgramId: PublicKey,
  boardAccount: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [boardAccount.toBuffer()],
    bonkBoardProgramId
  );
}

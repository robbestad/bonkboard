import {
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from "@solana/spl-token";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

/**
 * Check if the ATA for a token exists, and add the instruction for creating it to the start of `tx` if it does not
 * @param connection
 * @param tx - the tx to mutate and add the create instruction to if the ATA doesnt exist
 * @param token
 * @param user
 */
export async function unshiftCreateATA(
  connection: Connection,
  tx: Transaction,
  token: PublicKey,
  user: PublicKey
): Promise<void> {
  const ata = await getAssociatedTokenAddress(token, user, true);
  try {
    await getAccount(connection, ata);
  } catch (e) {
    if (
      e instanceof TokenAccountNotFoundError ||
      e instanceof TokenInvalidAccountOwnerError
    ) {
      tx.instructions.unshift(
        createAssociatedTokenAccountInstruction(user, ata, user, token)
      );
    } else {
      // unexpected rpc error
      throw e;
    }
  }
}

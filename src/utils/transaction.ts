import {
  TransactionSequence,
  TransactionSequenceSignatures,
  TransactionWithSigners,
  WalletAdapter,
} from "@soceanfi/stake-pool-sdk";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  ConfirmOptions,
  Connection,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";

/**
 * Signs and sends an array of transactions in parallel,
 * and confirm all of them
 * @param txs
 * @param connection
 * @param confirmOptions
 * @returns
 */
export async function signSendConfirm(
  walletAdapter: WalletAdapter,
  txs: TransactionWithSigners[],
  connection: Connection,
  confirmOptions?: ConfirmOptions
): Promise<string[]> {
  const walletPubkey = walletAdapter.publicKey;
  if (!walletPubkey) throw new WalletNotConnectedError();
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
  const partialSignedTxs = txs.map((txWithSigners) => {
    // eslint-disable-next-line no-param-reassign
    txWithSigners.tx.feePayer = walletPubkey;
    // eslint-disable-next-line no-param-reassign
    txWithSigners.tx.recentBlockhash = blockhash;
    if (txWithSigners.signers.length > 0) {
      txWithSigners.tx.partialSign(...txWithSigners.signers);
    }
    return txWithSigners.tx;
  });
  const signedTxs = await walletAdapter.signAllTransactions(partialSignedTxs);
  const sigs = await Promise.all(
    signedTxs.map((tx) =>
      connection.sendRawTransaction(tx.serialize(), confirmOptions)
    )
  );

  const confirmResults = await Promise.all(
    sigs.map((signature) =>
      connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      })
    )
  );

  confirmResults.forEach(({ value: { err } }) => {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (err) throw err;
  });

  return sigs;
}

/**
 * Signs and sends a transaction sequence in sequence
 * @param walletAdapter
 * @param txSeq
 * @param connection
 * @param confirmOptions
 */
export async function signSendConfirmTxSeq(
  walletAdapter: WalletAdapter,
  txSeq: TransactionSequence,
  connection: Connection,
  confirmOptions?: ConfirmOptions
): Promise<TransactionSequenceSignatures> {
  const res = [];
  /* eslint-disable no-await-in-loop */
  for (const txs of txSeq) {
    res.push(
      await signSendConfirm(walletAdapter, txs, connection, confirmOptions)
    );
  }
  /* eslint-enable no-await-in-loop */
  return res;
}

export function withEmptySigners(tx: Transaction): TransactionWithSigners {
  return { tx, signers: [] };
}

export function deserializeVersionedTx(tx: string): VersionedTransaction {
  const txBuf = Buffer.from(tx, "base64");
  const versionedTx = VersionedTransaction.deserialize(txBuf);
  return versionedTx;
}

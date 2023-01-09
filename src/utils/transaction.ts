import {
  TransactionSequence,
  TransactionSequenceSignatures,
  TransactionWithSigners,
  WalletAdapter,
} from "@soceanfi/stake-pool-sdk";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  BlockheightBasedTransactionConfirmationStrategy,
  Commitment,
  ConfirmOptions,
  Connection,
  SignatureResult,
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
      confirmTransactionReinforced(connection, {
        signature,
        blockhash,
        lastValidBlockHeight,
      })
    )
  );

  confirmResults.forEach(({ err }) => {
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

export async function confirmTransactionReinforced(
  connection: Connection,
  strategy: BlockheightBasedTransactionConfirmationStrategy,
  commitment?: Commitment
): Promise<SignatureResult> {
  const GET_SIGNATURE_STATUS_POLL_INTERVAL_MS = 1500;
  let interval: ReturnType<typeof setInterval> | undefined;
  // periodically poll getSignatureStatus()
  const getSignatureStatusPromise: Promise<SignatureResult> = new Promise(
    (resolve) => {
      const selectedCommitment =
        commitment ?? connection.commitment ?? "confirmed";
      // idk how to differentiate between "processed" and "confirmed"
      let confirmationsRequired = 1;
      if (selectedCommitment === "finalized") {
        confirmationsRequired = 32;
      }
      interval = setInterval(async () => {
        const { value } = await connection.getSignatureStatus(
          strategy.signature
        );
        // should theoretically be confirmationStatus >= selectedCommitment ("finalized" > "confirmed")
        if (
          value &&
          ((value.confirmations !== null &&
            value.confirmations >= confirmationsRequired) ||
            (value.confirmationStatus !== undefined &&
              value.confirmationStatus === selectedCommitment))
        ) {
          resolve(value);
        }
      }, GET_SIGNATURE_STATUS_POLL_INTERVAL_MS);
    }
  );
  const res = await Promise.race([
    /*
    // disable confirmTransaction for now,
    // spams RPC with getLatestBlockhash every 1s for no reason
    // since websocket isnt working
    connection
      .confirmTransaction(strategy, commitment)
      .then(({ value }) => value),
    */
    getSignatureStatusPromise,
  ]);
  if (interval !== undefined) {
    clearInterval(interval);
  }
  return res;
}

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
  TransactionExpiredBlockheightExceededError,
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
      confirmTransactionPoll(
        connection,
        {
          signature,
          blockhash,
          lastValidBlockHeight,
        },
        confirmOptions?.commitment
      )
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

export async function confirmTransactionPoll(
  connection: Connection,
  strategy: BlockheightBasedTransactionConfirmationStrategy,
  commitment?: Commitment
): Promise<SignatureResult> {
  const GET_SIGNATURE_STATUS_POLL_INTERVAL_MS = 1500;
  const GET_LATEST_BLOCKHEIGHT_POLL_INTERVAL_MS = 1500;

  const selectedCommitment = commitment ?? connection.commitment ?? "confirmed";
  // idk how to differentiate between "processed" and "confirmed"
  let confirmationsRequired = 1;
  if (selectedCommitment === "finalized") {
    confirmationsRequired = 32;
  }

  let getSignatureTimeout: ReturnType<typeof setTimeout> | undefined;
  const getSignatureCbChain = async (
    resolve: (value: SignatureResult) => void
  ) => {
    getSignatureTimeout = setTimeout(async () => {
      const { value } = await connection.getSignatureStatus(strategy.signature);
      // should theoretically be confirmationStatus >= selectedCommitment ("finalized" > "confirmed")
      if (
        value &&
        ((value.confirmations !== null &&
          value.confirmations >= confirmationsRequired) ||
          (value.confirmationStatus !== undefined &&
            value.confirmationStatus === selectedCommitment))
      ) {
        resolve(value);
        return;
      }
      if (getSignatureTimeout !== undefined) {
        getSignatureCbChain(resolve);
      }
    }, GET_SIGNATURE_STATUS_POLL_INTERVAL_MS);
  };
  const getSignatureStatusPromise: Promise<SignatureResult> = new Promise(
    (resolve) => {
      getSignatureCbChain(resolve);
    }
  );

  let checkTxExpiredTimeout: ReturnType<typeof setTimeout> | undefined;
  const checkTxExpiredCbChain = async (
    resolve: (value: SignatureResult) => void
  ) => {
    checkTxExpiredTimeout = setTimeout(async () => {
      const blockheight = await connection.getBlockHeight(selectedCommitment);
      if (blockheight > strategy.lastValidBlockHeight) {
        resolve({
          err: new TransactionExpiredBlockheightExceededError(
            strategy.signature
          ),
        });
        return;
      }
      if (checkTxExpiredTimeout !== undefined) {
        checkTxExpiredCbChain(resolve);
      }
    }, GET_LATEST_BLOCKHEIGHT_POLL_INTERVAL_MS);
  };
  const checkTxExpiredPromise: Promise<SignatureResult> = new Promise(
    (resolve) => {
      checkTxExpiredCbChain(resolve);
    }
  );

  const res = await Promise.race([
    getSignatureStatusPromise,
    checkTxExpiredPromise,
  ]);

  if (getSignatureTimeout !== undefined) {
    clearTimeout(getSignatureTimeout);
    getSignatureTimeout = undefined;
  }
  if (checkTxExpiredTimeout !== undefined) {
    clearTimeout(checkTxExpiredTimeout);
    checkTxExpiredTimeout = undefined;
  }

  return res;
}

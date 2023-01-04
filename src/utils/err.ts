export const TX_CONFIRM_TIMEOUT_MS = 45 * 1000;

/**
 * Extract the transaction signature from the error message:
 * ```
 * Transaction was not confirmed in X seconds. It is unknown if it succeeded or failed.
 * Check signature X using the Solana Explorer or CLI tools
 * ```
 * @param err
 * @returns signature if found, null if error is of the incorrect type
 */
export function extractTxSigFromErr(err: Error): string | null {
  // Note: trailing space
  const PREFIX_STRING = "Check signature ";
  // Note: leading space
  const SUFFIX_STRING = " using the Solana Explorer or CLI tools";

  const msg = err.message;
  const prefixStart = msg.indexOf(PREFIX_STRING);
  if (prefixStart === -1) return null;
  const suffixStart = msg.indexOf(SUFFIX_STRING);
  if (suffixStart === -1) return null;
  return msg.substring(prefixStart + PREFIX_STRING.length, suffixStart);
}

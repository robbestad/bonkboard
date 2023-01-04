import { useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import useSWR, { KeyedMutator } from "swr";

async function fetcher(
  owner: PublicKey,
  connection: Connection
): Promise<number> {
  const balance = await connection.getBalance(owner, "confirmed");
  return balance;
}

interface UseBalanceLamportsReturnType {
  balance: number | undefined;
  loading: boolean;
  error: any;
  mutate: KeyedMutator<number>;
}

export function useBalanceLamports(
  owner: PublicKey | null
): UseBalanceLamportsReturnType {
  const { connection } = useConnection();

  const keys = [owner, connection.rpcEndpoint];

  const {
    data: balance,
    error,
    mutate,
  } = useSWR(owner ? keys : null, () => fetcher(owner!, connection), {
    revalidateOnFocus: false,
    refreshInterval: 20000,
  });

  const loading = !balance && !error;

  return {
    balance,
    loading,
    error,
    mutate,
  };
}

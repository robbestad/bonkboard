import { useConnection } from "@solana/wallet-adapter-react";
import {
  Connection,
  ParsedAccountData,
  SYSVAR_CLOCK_PUBKEY,
} from "@solana/web3.js";
import useSWR from "swr";

type SolanaClock = {
  unixTimestamp: number;
  epoch: number;
};

const fetcher = async (connection: Connection): Promise<SolanaClock> => {
  const clockAccount = await connection.getParsedAccountInfo(
    SYSVAR_CLOCK_PUBKEY
  );

  if (!clockAccount?.value) {
    const error = new Error(
      "An error occured while fetching the clock from Solana."
    );
    throw error;
  }

  const { unixTimestamp, epoch } = (
    clockAccount.value.data as ParsedAccountData
  ).parsed.info;

  return {
    unixTimestamp,
    epoch,
  };
};

export const useSolanaClock = () => {
  const { connection } = useConnection();

  const { data, error } = useSWR<SolanaClock, Error>(
    [connection, "clock"],
    fetcher
  );

  return {
    clock: data,
    loading: !data && !error,
    error,
  };
};

import { useConnection } from "@solana/wallet-adapter-react";
import { Connection, EpochInfo } from "@solana/web3.js";
import useSWR from "swr";

export interface DashboardEpochInfo {
  epochInfo: EpochInfo;
  // in percentage 0-1.0
  epochProgress: number;
  // in milliseconds
  epochTimeRemainingMs: number;
}

const fetcher = async (connection: Connection): Promise<DashboardEpochInfo> => {
  const epochInfo = await connection.getEpochInfo("finalized");

  // Inspired from old frontend which is inspired from explorer.solana.com DashboardInfo
  const { slotIndex, slotsInEpoch } = epochInfo;

  const epochProgress = slotIndex / slotsInEpoch;

  const samples = await connection.getRecentPerformanceSamples(360);
  const timePerSlotSamples = samples
    .filter((sample) => sample.numSlots !== 0)
    .slice(0, 60)
    .map((sample) => sample.samplePeriodSecs / sample.numSlots);

  const samplesInHour =
    timePerSlotSamples.length < 60 ? timePerSlotSamples.length : 60;
  const avgSlotTime1h =
    timePerSlotSamples.reduce((sum: number, cur: number) => sum + cur, 0) /
    samplesInHour;

  const hourlySlotTime = Math.round(1000 * avgSlotTime1h);
  const epochTimeRemainingMs = (slotsInEpoch - slotIndex) * hourlySlotTime;

  return {
    epochInfo,
    epochProgress,
    epochTimeRemainingMs,
  };
};

interface UseEpochReturnType {
  epoch: DashboardEpochInfo | undefined;
  loading: boolean;
  error: Error | undefined;
}

export function useEpoch(): UseEpochReturnType {
  const { connection } = useConnection();

  const { data, error } = useSWR<DashboardEpochInfo, Error>(
    [connection.rpcEndpoint, "epoch"],
    () => fetcher(connection),
    { refreshInterval: 60_000, revalidateOnFocus: false }
  );

  return {
    epoch: data,
    loading: !data && !error,
    error,
  };
}

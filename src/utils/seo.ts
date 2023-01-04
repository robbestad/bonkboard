import {
  EXAMPLE_UNSTAKE_TX_LINK,
  UNSTAKE_PROGRAM_SOLANA_FM_LINK,
} from "@/utils/links";

export function formatForSEO(str: string): string {
  return str
    .replaceAll("<programLink>", `<a href=${UNSTAKE_PROGRAM_SOLANA_FM_LINK}>`)
    .replaceAll("</programLink>", "</a>")
    .replaceAll("<exampleUnstakeLink>", `<a href=${EXAMPLE_UNSTAKE_TX_LINK}>`)
    .replaceAll("</exampleUnstakeLink>", "</a>");
}

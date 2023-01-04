import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import cloneDeepWith from "lodash.clonedeepwith";
import { State } from "swr";

export const SWR_KEY = {
  GLOBAL_VALIDATORS: "global-validators",
  UNSTAKEABLE_STAKE_ACCOUNTS: "stake-accounts",
  UNSTAKEABLE_TOKEN_ACCOUNTS: "token-accounts",
};

// Here we specify the SWR keys we want to cache in LocalStorage.
const KEYS_TO_CACHE_SUFFIX = Object.values(SWR_KEY).map(keyToCachedString);

export function keysToString(params: (string | number | undefined | null)[]) {
  return `@${params.map((key) => `"${key}"`)},`;
}

// Format key string to SWR key format.
function keyToCachedString(cachedString: string) {
  return `"${cachedString}",`;
}

export function localStorageProvider() {
  if (typeof window === "undefined") {
    return new Map([]) as Map<string, State<any, any>>;
  }

  // When initializing, we restore the data from `localStorage` into a map.
  const storedAppCache = localStorage.getItem("app-cache");

  // Find BN and PK by pointers and convert them to the actual BN and PK data types.
  const cachedData = storedAppCache
    ? cloneDeepWith(JSON.parse(storedAppCache), (x) => {
        if (x !== null && typeof x === "object") {
          if ("isBN" in x) {
            return new BN(x.value);
          }

          if ("isPK" in x) {
            return new PublicKey(x.value);
          }

          return undefined;
        }

        return undefined;
      })
    : [];

  const map = new Map(cachedData);

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener("beforeunload", () => {
    // Only cache the data for specified SWR keys (also excluding objects that only have `isValidating` in it).
    const cachedEntries = (Array.from(map.entries()) as [string, any]).filter(
      (entry) =>
        !("isValidating" in entry[1]) &&
        KEYS_TO_CACHE_SUFFIX.some((key) => entry[0].endsWith(key))
    );

    // BN and PK lose their values when JSON stringified so we convert them to strings and add pointers to convert them back into BN and PK on initialization.
    const appCache = cloneDeepWith(cachedEntries, (x) => {
      if (x !== null && typeof x === "object") {
        if ("_bn" in x) {
          return { value: x.toString(), isPK: true };
        }

        if (BN.isBN(x)) {
          return { value: x.toString(), isBN: true };
        }

        return undefined;
      }

      return undefined;
    });

    if (appCache) {
      localStorage.setItem("app-cache", JSON.stringify(appCache));
    }
  });

  // We still use the map for write & read for performance.
  return map;
}

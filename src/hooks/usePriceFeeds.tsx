import useSWR, { useSWRConfig } from "swr";

export type PriceFeeds = {
  "SOL/USD"?: number;
  "ORCA/USD"?: number;
};

export function usePriceFeeds(): PriceFeeds {
  const res = useCoingeckoPrices();

  return res;
}

const ALL_COINGECKO_PRICEFEEDS = ["solana", "orca"] as const;

type CoingeckoPriceFeedCurrency = typeof ALL_COINGECKO_PRICEFEEDS[number];

type CoingeckoPriceFeed = keyof PriceFeeds;

const PRICE_FEED_TO_COINGECKO_CURRENCY: {
  [k in CoingeckoPriceFeed]: CoingeckoPriceFeedCurrency;
} = {
  "SOL/USD": "solana",
  "ORCA/USD": "orca",
};

async function getPricesFromCoinGecko(): Promise<PriceFeeds | undefined> {
  let res: PriceFeeds | undefined = DEFAULT_PRICE_FEED;
  const ids = ALL_COINGECKO_PRICEFEEDS.join(",");
  const resp = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );

  const coingeckoPrices = await resp.json();
  // convert to map of CoingeckoCurrency to its USD price (number)
  for (const k of Object.keys(coingeckoPrices)) {
    coingeckoPrices[k] = coingeckoPrices[k]?.usd;
  }
  for (const priceFeed of Object.entries(PRICE_FEED_TO_COINGECKO_CURRENCY)) {
    const [key, value] = priceFeed as [
      CoingeckoPriceFeed,
      CoingeckoPriceFeedCurrency
    ];
    const price = coingeckoPrices[value];
    if (price) {
      res = { ...(res || {}), [key]: price };
    }
  }
  return res;
}

export const PRICE_UPDATE_INTERVAL = 60_000;

function useCoingeckoPrices(): PriceFeeds {
  const swrKey = "CoingeckoPrices";
  const { cache } = useSWRConfig();
  const isCached = !!cache.get(swrKey);
  const { data } = useSWR(swrKey, getPricesFromCoinGecko, {
    refreshInterval: PRICE_UPDATE_INTERVAL,
    revalidateOnFocus: false,
    revalidateOnMount: !isCached,
  });
  return data ?? DEFAULT_PRICE_FEED;
}

const DEFAULT_PRICE_FEED = {};

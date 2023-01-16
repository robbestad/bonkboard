import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import { VT323 } from "@next/font/google";

import { Header } from "@/components/common/Header";
import { BoardProgramProvider } from "@/contexts/BoardProgramContext";
import { SolanaProvider } from "@/contexts/SolanaContext";

const dotGothic16 = VT323({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-pixel",
});

type LayoutProps = {
  /**
   * The page title
   */
  title?: string;
  /**
   * Child nodes
   */
  children: React.ReactNode;
};

const SEO = {
  title: "bonkboard.gg",
  url: "https://bonkboard.gg",
  description:
    "The first pixel grafitti board powered by $BONK. A social experiment for $SOL.",
};

export function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title ? `${title} – Bonkboard.gg` : "Bonkboard.gg"}</title>

        <meta name="title" content={SEO.title} />
        <meta name="description" content={SEO.description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={SEO.url} />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:image" content={`${SEO.url}/meta_og.jpeg`} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={SEO.url} />
        <meta property="twitter:title" content={SEO.title} />
        <meta property="twitter:description" content={SEO.description} />
        <meta property="twitter:image" content={`${SEO.url}/meta_og.jpeg`} />
      </Head>

      <Flex
        position="relative"
        flex={1}
        flexDirection="column"
        h="100vh"
        className={dotGothic16.className}

        // overflow="hidden"
      >
        <Flex
          position="relative"
          flexGrow={1}
          flexDirection="column"

          // overflowY="auto"
        >
          <Header />

          {children}
        </Flex>
      </Flex>
    </>
  );
}

export const getLayout = (page: React.ReactNode, title?: string) => (
  <SolanaProvider>
    <BoardProgramProvider>
      <Layout title={title}>{page}</Layout>
    </BoardProgramProvider>
  </SolanaProvider>
);

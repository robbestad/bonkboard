import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import { VT323 } from "@next/font/google";

import { Header } from "@/components/common/Header";
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

export function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title ? `${title} – Bonkboard.gg` : "Bonkboard.gg"}</title>
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
    <Layout title={title}>{page}</Layout>
  </SolanaProvider>
);

import Image from "next/image";
import { Box, HStack } from "@chakra-ui/react";

import { ConnectionSelector } from "@/components/common/ConnectionSelector";
import { NextLink } from "@/components/common/NextLink";
import { WalletButton } from "@/components/common/WalletButton";
import logo from "@/public/logo.png";

export function Header() {
  return (
    <Box
      position={{ sm: "sticky" }}
      top={0}
      zIndex={{ sm: "docked" }}
      backgroundColor="main.white"
      borderBottom="1px"
      borderBottomColor="card.dividerLine"
    >
      <HStack
        px={{ base: 4, sm: 16 }}
        py={{ base: 4, sm: 6 }}
        mx="auto"
        justifyContent="space-between"
      >
        <HStack experimental_spaceX={{ base: 4, sm: 8 }}>
          <NextLink
            href="/"
            display="flex"
            alignItems="center"
            experimental_spaceX={2}
          >
            <Image src={logo} height={48} priority alt="" />
            {/* <Text fontSize="2xl" fontWeight={700}>
              Bonkboard.gg
            </Text> */}
          </NextLink>
        </HStack>

        <HStack experimental_spaceX={{ base: 4, sm: 6 }} height={12}>
          <ConnectionSelector />
          <WalletButton isResponsive />
        </HStack>
      </HStack>
    </Box>
  );
}

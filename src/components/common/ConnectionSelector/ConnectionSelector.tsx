import {
  Box,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { isProduction } from "src/config/constants";

import { ThreeDotsIcon } from "@/components/icons";
import { CLUSTERS, MAINNET_NETWORK, useSolana } from "@/contexts/SolanaContext";

export function ConnectionSelector() {
  const { cluster, setCluster } = useSolana();

  const clusters = isProduction
    ? CLUSTERS.filter(
        (c) => c.network === MAINNET_NETWORK || c.network === "devnet"
      )
    : CLUSTERS;

  return (
    <Box fontSize="sm" lineHeight="1.4rem">
      <Menu isLazy placement="bottom-end">
        <MenuButton
          p={2.5}
          borderRadius="full"
          border="1px"
          borderColor="card.borderLine"
          h={10}
          w={10}
          sx={{
            span: {
              display: "flex",
              justifyContent: "center",
            },
          }}
          _hover={{
            opacity: 0.8,
          }}
        >
          <ThreeDotsIcon />
        </MenuButton>
        <MenuList
          experimental_spaceY={2}
          bgColor="main.white"
          zIndex="dropdown"
        >
          <MenuOptionGroup type="radio" defaultValue={cluster.label}>
            {clusters.map((c) => (
              <MenuItemOption
                key={c.label}
                value={c.label}
                onClick={() => setCluster(c)}
              >
                {c.label}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}

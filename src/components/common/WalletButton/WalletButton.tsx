import { useMemo } from "react";
import {
  Box,
  Button as ChakraButton,
  ButtonProps,
  CSSObject,
  forwardRef,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { ExpandMoreIcon, WalletIcon } from "@/components/icons";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { useProvider } from "@/hooks/useProvider";
import { mediaQuery } from "@/theme/foundations/breakpoints";

type ChakraButtonProps = ButtonProps & {
  isResponsive: boolean;
};

type WalletButtonProps = ButtonProps & {
  /**
   * Flag to responsively show `WalletIcon` on mobile
   */
  isResponsive?: boolean;

  /**
   * Text to be displayed on the button.
   * @default "Connect"
   */
  text?: "short" | "full";
};

export function WalletButton({
  isResponsive,
  text = "short",
  ...props
}: WalletButtonProps) {
  const { wallet } = useProvider();
  const { setVisible, visible } = useWalletModal();

  const { enqueueSnackbar } = useSnackbarContext();

  const disconnectWallet = async () => {
    try {
      await wallet.disconnect();
    } catch (err) {
      if (err instanceof Error) {
        enqueueSnackbar({
          variant: "critical",
          options: {
            duration: null,
          },
          title: "Error",
          description: err.message,
        });
      }
    }
  };

  const getSx = useMemo((): CSSObject | undefined => {
    if (isResponsive)
      return {
        "span:first-of-type": {
          display: "none",
        },
        [`@media ${mediaQuery.min.sm}`]: {
          "span:first-of-type": {
            display: "initial",
          },
        },
      };
    return undefined;
  }, [isResponsive]);

  const pubkey = wallet.publicKey?.toString();

  const connectWalletText = text === "short" ? "Connect" : "Connect wallet";

  return (
    <Box>
      <Menu isLazy placement="bottom-end">
        <MenuButton
          as={Button}
          isResponsive={isResponsive}
          rightIcon={
            isResponsive && (
              <>
                <WalletIcon display={{ base: "initial", sm: "none" }} />
                {wallet.connected ? (
                  <ExpandMoreIcon
                    display={{ base: "none", sm: "initial" }}
                    ml={4}
                  />
                ) : null}
              </>
            )
          }
          pr={{ sm: wallet.connected ? 3 : "auto" }}
          onClick={() => !wallet.connected && setVisible(!visible)}
          sx={getSx}
          {...props}
        >
          {pubkey
            ? `${pubkey.slice(0, 4)}...${pubkey.slice(-4)}`
            : connectWalletText}
        </MenuButton>
        {wallet.connected ? (
          <MenuList
            experimental_spaceY={2}
            bgColor="main.white"
            zIndex="dropdown"
          >
            <MenuItem onClick={disconnectWallet}>Disconnect</MenuItem>
          </MenuList>
        ) : null}
      </Menu>
    </Box>
  );
}
const Button = forwardRef<ChakraButtonProps, "button">((props, ref) => {
  const { children, isResponsive, size, ...rest } = props;

  return (
    <ChakraButton
      colorScheme="primary"
      borderRadius="full"
      py="2.5"
      px={{ base: isResponsive ? 2.5 : 12, sm: 12 }}
      height="full"
      fontSize="sm"
      minWidth={0}
      ref={ref}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
});

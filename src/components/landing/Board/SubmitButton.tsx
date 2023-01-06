import { Button } from "@chakra-ui/react";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import BN from "bn.js";

import { useBoardProgramContext } from "@/contexts/BoardProgramContext";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { useSolana } from "@/contexts/SolanaContext";
import {
  BOARD_ACCOUNT,
  BOARD_DATA_ACCOUNT,
  MINT_TOKEN_ACCOUNT,
} from "@/hooks/useBoardProgram";
import { txToSimulationLink, txToSolanaFMLink } from "@/utils/links";
import { findFeeAccount } from "@/utils/token";
import { signSendConfirm } from "@/utils/transaction";

type ActionData = [number, number, Uint8ClampedArray];

type SubmitButtonProps = {
  actions: [ActionData, ActionData][];
  isPending: boolean;
  setIsPending: (isPending: boolean) => void;
};

export function SubmitButton({
  actions,
  isPending,
  setIsPending,
}: SubmitButtonProps) {
  const { boardProgram } = useBoardProgramContext();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const {
    cluster: { network },
  } = useSolana();

  const { enqueueSnackbar } = useSnackbarContext();

  const handleSubmit = async () => {
    if (!wallet?.publicKey || actions.length === 0 || isPending) return;

    setIsPending(true);

    let closeCurrentSnackbar: () => void | undefined;
    let tx: Transaction | undefined;

    try {
      const data = actions.map((action) => {
        const [x, y, color] = action[1];
        return [new BN(x), new BN(y), color] as [BN, BN, Uint8ClampedArray];
      });

      const feeAccount = findFeeAccount(
        boardProgram.programId,
        new PublicKey(BOARD_ACCOUNT[network])
      )[0];

      const payerTokenAccount = await getAssociatedTokenAddress(
        MINT_TOKEN_ACCOUNT[network],
        wallet.publicKey
      );

      const { feeDestination } = await boardProgram.account.fee.fetch(
        feeAccount
      );

      const [x, y, color] = data[0];
      const [r, g, b] = color;

      tx = await boardProgram.methods
        .draw(x, y, r, g, b)
        .accounts({
          boardAccount: BOARD_ACCOUNT[network],
          boardDataAccount: BOARD_DATA_ACCOUNT[network],
          payer: wallet.publicKey,
          payerTokenAccount,
          feeAccount,
          feeDestination,
        })
        .transaction();

      const { close: closeProgressSnackbar } = enqueueSnackbar({
        title: "Bonk in progress",
        description: `Bonking ${data.length} pixels...`,
        variant: "standard",
        options: {
          duration: null,
        },
      });
      closeCurrentSnackbar = closeProgressSnackbar;

      console.log(tx);

      const [sig] = await signSendConfirm(
        wallet,
        [{ tx, signers: [] }],
        connection
      );

      closeCurrentSnackbar();

      enqueueSnackbar({
        title: "Success",
        description: "Successfully bonked a pixel!",
        variant: "success",
        links: [
          {
            label: "View on explorer",
            href: txToSolanaFMLink(sig, network),
          },
        ],
      });
    } catch (err) {
      const links = [
        ...(tx
          ? [
              {
                label: "View on explorer",
                href: txToSimulationLink(tx, network),
              },
            ]
          : []),
      ];

      enqueueSnackbar({
        title: "Error",
        description: (err as Error).message,
        variant: "critical",
        links,
        options: {
          duration: null,
        },
      });
    } finally {
      // @ts-ignore
      if (closeCurrentSnackbar) {
        closeCurrentSnackbar();
      }
      setIsPending(false);
    }
  };

  return (
    <Button size="lg" onClick={handleSubmit} isLoading={isPending}>
      Submit!
    </Button>
  );
}

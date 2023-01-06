import { Button } from "@chakra-ui/react";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import BN from "bn.js";

import { useBoardProgramContext } from "@/contexts/BoardProgramContext";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
import { useSolana } from "@/contexts/SolanaContext";
import { useBoardPixels } from "@/hooks/useBoardPixels";
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
  resetDrawnPixels: () => void;
};

export function SubmitButton({
  actions,
  isPending,
  setIsPending,
  resetDrawnPixels,
}: SubmitButtonProps) {
  const { boardProgram } = useBoardProgramContext();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const {
    cluster: { network },
  } = useSolana();

  const { enqueueSnackbar } = useSnackbarContext();

  const { mutate } = useBoardPixels();

  const handleSubmit = async () => {
    if (!wallet?.publicKey || actions.length === 0 || isPending) return;

    setIsPending(true);

    let closeCurrentSnackbar: () => void | undefined;
    let tx: Transaction | undefined;

    try {
      const tmp: Record<string, any> = {};
      actions.forEach(([, action]) => {
        const [r, g, b] = action[2];

        // @ts-ignore
        tmp[[action[0], action[1]]] = [r, g, b];
      });

      const toSend: {
        coord: { x: BN; y: BN };
        color: { r: number; g: number; b: number };
      }[] = [];
      Object.entries(tmp).forEach(([key, value]) => {
        const [x, y] = key.split(",").map((num) => new BN(num));
        const [r, g, b] = value;
        toSend.push({ coord: { x, y }, color: { r, g, b } });
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

      tx = await boardProgram.methods
        .draw(toSend)
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
        description: `Bonking ${toSend.length} pixels...`,
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

      await mutate();

      resetDrawnPixels();

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
      console.error(err);
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

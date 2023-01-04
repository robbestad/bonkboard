import { useCopyToClipboard } from "react-use";

import { useSnackbarContext } from "@/contexts/SnackbarContext";

interface UseCopyCallbackReturn {
  value?: string;
  error?: Error;
  handleCopy?: () => void;
}

export const useCopyCallback = (
  stringToCopy: string
): UseCopyCallbackReturn => {
  const [{ error, value }, copy] = useCopyToClipboard();

  const { enqueueSnackbar } = useSnackbarContext();

  const handleCopy = () => {
    try {
      copy(stringToCopy);
      enqueueSnackbar({
        title: "Success!",
        description: `${stringToCopy} is copied to your clipboard.`,
        variant: "success",
        options: { duration: 3000 },
      });
    } catch (err) {
      enqueueSnackbar({
        title: "Error",
        description: ((err as Error) || error).message,
        variant: "critical",
      });
    }
  };

  return { error, value, handleCopy };
};

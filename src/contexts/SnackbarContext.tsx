import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  createStandaloneToast,
  ToastId,
  UseToastOptions,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";

import Snackbar, {
  SnackbarLink,
  SnackbarVariants,
} from "@/components/common/Snackbar";
import { TX_CONFIRM_TIMEOUT_MS } from "@/utils/err";

type SnackbarOptions = Omit<
  UseToastOptions,
  "render" | "title" | "description"
>;

type EnqueueSnackbarProps = {
  variant: SnackbarVariants;
  title: string;
  description: string;
  links?: SnackbarLink[];
  options?: SnackbarOptions;
};

type EnqueueSnackbarReturn = {
  toastId?: ToastId;
  close: () => void;
};

type SnackbarContextType = {
  /**
   * display a snackbar with the mentioned variant
   * @param variant the variant of the snackbar
   * @param title the title for the snackbar
   * @param description the description for the snackbar
   * @param links optional array of labels and hrefs to redirect to another pages
   * @param options the options for the snackbar from ChakraUI
   */
  enqueueSnackbar: (
    enqueueSnackbarProps: EnqueueSnackbarProps
  ) => EnqueueSnackbarReturn;

  /**
   * Use the `render` property of `UseToast` to render a custom snackbar.
   */
  enqueueCustomSnackbar: (options?: UseToastOptions) => ToastId | undefined;
};

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  // Set default options for snackbars here.
  const theme = useTheme();
  const snackbar = createStandaloneToast({
    theme,
    defaultOptions: {
      duration: TX_CONFIRM_TIMEOUT_MS,
      position: "bottom-right",
    },
  });

  const enqueueSnackbar = useCallback(
    ({ variant, title, description, links, options }: EnqueueSnackbarProps) => {
      const toastId = snackbar.toast({
        render: ({ onClose }) => (
          <Snackbar
            variant={variant}
            title={title}
            description={description}
            links={links}
            onClose={onClose}
          />
        ),
        ...options,
      });

      return {
        toastId,
        close: toastId ? () => snackbar.toast.close(toastId) : () => null,
      };
    },
    [snackbar]
  );

  const enqueueCustomSnackbar = useCallback(
    (options?: UseToastOptions) => snackbar.toast({ ...options }),
    [snackbar]
  );

  const snackbarContext = useMemo(
    () => ({ enqueueSnackbar, enqueueCustomSnackbar }),
    [enqueueSnackbar, enqueueCustomSnackbar]
  );

  return (
    <>
      <snackbar.ToastContainer />
      <SnackbarContext.Provider value={snackbarContext}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
}

export function useSnackbarContext() {
  const snackbarContext = useContext(SnackbarContext);

  if (!snackbarContext)
    throw new Error("Make sure you wrap you app with SnackbarProvider");

  return snackbarContext;
}

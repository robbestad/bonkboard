import { useEffect } from "react";

/**
 * Show a confirmation dialog when leaving the page
 * @param shouldAlert whether to alert the user
 */
export function useLeavingPage(shouldAlert: boolean) {
  const handleAlert = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = true;
  };

  useEffect(() => {
    if (shouldAlert) {
      window.addEventListener("beforeunload", handleAlert);

      return () => {
        window.removeEventListener("beforeunload", handleAlert);
      };
    }

    return undefined;
  }, [shouldAlert]);
}

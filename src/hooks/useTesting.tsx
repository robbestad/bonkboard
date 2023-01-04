import { useEffect, useState } from "react";

import { canUseDOM } from "@/utils/dom";

export const useTesting = () => {
  const [isTesting, setIsTesting] = useState(false);

  // Need useEffect to run after DOM is ready
  // Was getting this error, https://github.com/vercel/next.js/discussions/17443
  useEffect(() => {
    setIsTesting(
      canUseDOM() &&
        (window.location.href.includes("localhost") ||
          window.location.href.includes("vercel"))
    );
  }, []);

  return isTesting;
};

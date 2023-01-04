import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const useCountdown = (timestamp: number): string => {
  const [countDown, setCountDown] = useState("");

  const endTime = useMemo(() => dayjs(+new Date() + timestamp), [timestamp]);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = endTime.diff(new Date());

      setCountDown(
        diff > 0 ? dayjs.duration(diff).format("D[d] H[h] m[m] s[s]") : ""
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return countDown;
};

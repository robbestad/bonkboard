import { useState } from "react";

export function useImage() {
  const [imageArr, setImageArr] = useState<number[]>([]);

  const fetchImage = () => {
    // make rpc to retrieve flat array
    // generating mock for now
    const temp = [];
    for (let i = 0; i < 750000; i++) {
      temp[i] = Math.random() * 255;
    }
    // on success, set to imageArr
    setImageArr(temp);
  };

  return { imageArr, fetchImage };
}

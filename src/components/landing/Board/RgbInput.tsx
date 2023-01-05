import { Dispatch, SetStateAction } from "react";
import { Flex, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

import { getColorStr, getRgb } from "@/utils/color";

type RgbInputProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

export function RgbInput({ color, setColor }: RgbInputProps) {
  const [r, g, b] = getRgb(color);

  return (
    <Flex gap={2} my={2}>
      <InputGroup>
        <InputLeftAddon>r</InputLeftAddon>
        <Input
          variant="outline"
          value={r}
          onChange={(e) => {
            let v = Number(e.target.value);
            if (!Number.isNaN(v)) {
              if (v > 255) {
                v = 255;
              }
              setColor(getColorStr(v.toString(), g, b));
            }
          }}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>g</InputLeftAddon>
        <Input
          variant="outline"
          value={g}
          onChange={(e) => {
            let v = Number(e.target.value);
            if (!Number.isNaN(v)) {
              if (v > 255) {
                v = 255;
              }
              setColor(getColorStr(r, v.toString(), b));
            }
          }}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>b</InputLeftAddon>
        <Input
          variant="outline"
          value={b}
          onChange={(e) => {
            let v = Number(e.target.value);
            if (!Number.isNaN(v)) {
              if (v > 255) {
                v = 255;
              }
              setColor(getColorStr(r, g, v.toString()));
            }
          }}
        />
      </InputGroup>
    </Flex>
  );
}

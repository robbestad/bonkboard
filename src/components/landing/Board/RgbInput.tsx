import { Flex, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

import { getColorStr, getRgb } from "@/utils/color";

type RgbInputProps = {
  color: string;
  handleRgbChange: (rgb: string) => void;
};

export function RgbInput({ color, handleRgbChange }: RgbInputProps) {
  const [r, g, b] = getRgb(color);

  return (
    <Flex direction="column" gap={2} mt={2}>
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
              handleRgbChange(getColorStr(v, g, b));
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
              handleRgbChange(getColorStr(r, v, b));
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
              handleRgbChange(getColorStr(r, g, v));
            }
          }}
        />
      </InputGroup>
    </Flex>
  );
}

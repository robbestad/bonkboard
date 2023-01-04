import { Box } from "@chakra-ui/react";

type PixelProps = {
  background: string;
  onClick: () => void;
};

export function Pixel({ background, onClick }: PixelProps) {
  return <Box bg={background} onClick={onClick} />;
}

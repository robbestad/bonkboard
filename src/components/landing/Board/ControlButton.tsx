import Image from "next/image";
import { Button } from "@chakra-ui/react";

type ControlButtonProps = {
  onClick: () => void;
  src: string;
  alt: string;
};

export default function ControlButton({
  onClick,
  src,
  alt,
}: ControlButtonProps) {
  return (
    <Button
      variant="outline"
      size={{ base: "xs", md: "sm" }}
      onClick={onClick}
      py={2}
    >
      <Image src={src} priority width={25} height={25} alt={alt} />
    </Button>
  );
}

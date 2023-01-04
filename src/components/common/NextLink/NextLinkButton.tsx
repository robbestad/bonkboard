import Link, { LinkProps } from "next/link";
import { Button, ButtonProps } from "@chakra-ui/react";

// `target` is part of `ButtonProps` but typescript doesn't detect that for some reason
type Props = ButtonProps & LinkProps & { target?: string };

export function NextLinkButton({ href, children, ...props }: Props) {
  return (
    <Button
      as={Link}
      href={href}
      _hover={{ bgColor: "button.secondary.hover" }}
      _active={{ bgColor: "button.secondary.hover" }}
      _focus={{
        boxShadow: "none",
        outline: "2px solid",
        outlineColor: "button.secondary.default",
      }}
      // destructure last to enable overriding of defaults above
      {...props}
    >
      {children}
    </Button>
  );
}

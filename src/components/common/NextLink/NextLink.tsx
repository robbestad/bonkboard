import Link, { LinkProps } from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

type Props = LinkProps & ChakraLinkProps;

export function NextLink({
  href,
  children,
  locale,
  scroll = true,
  ...props
}: Props) {
  return (
    <ChakraLink as={Link} href={href} scroll={scroll} {...props}>
      {children}
    </ChakraLink>
  );
}

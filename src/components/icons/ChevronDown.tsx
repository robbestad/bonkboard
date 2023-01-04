import { Icon, IconProps } from "@chakra-ui/react";

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon h={6} w={6} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 9L12 15L18 9"
        stroke="#A7A7A7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

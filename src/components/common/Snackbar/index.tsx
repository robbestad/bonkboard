import {
  Box,
  HStack,
  IconProps,
  Link,
  Text,
  useMultiStyleConfig,
  VStack,
} from "@chakra-ui/react";

import {
  AlertCircleIcon,
  CheckCircleIcon,
  CloseCircleIcon,
  CloseIcon,
  LoaderIcon,
  OpenNewIcon,
} from "@/components/icons";

export type SnackbarVariants = "standard" | "success" | "warning" | "critical";

type SnackbarIconProps = {
  variant: SnackbarVariants;
} & IconProps;

function SnackbarIcon({ variant, ...iconProps }: SnackbarIconProps) {
  switch (variant) {
    case "standard":
      return <LoaderIcon {...iconProps} />;
    case "critical":
      return <CloseCircleIcon {...iconProps} />;
    case "success":
      return <CheckCircleIcon {...iconProps} />;
    case "warning":
      return <AlertCircleIcon {...iconProps} />;
    // no default
  }
}

export type SnackbarLink = {
  label?: string;
  href: string;
};

type SnackbarProps = {
  variant: SnackbarVariants;
  title: string;
  description: string;
  links?: SnackbarLink[];
  onClose?: () => void;
};

function Snackbar({
  variant,
  title,
  description,
  links,
  onClose,
}: SnackbarProps) {
  const styles = useMultiStyleConfig("Snackbar", { variant });

  return (
    <HStack sx={styles.box} alignItems="flex-start" spacing={3}>
      <Box>
        <SnackbarIcon variant={variant} __css={styles.icon} />
      </Box>
      <VStack
        alignItems="flex-start"
        spacing={1}
        flex={1}
        wordBreak="break-word"
      >
        <Text sx={styles.title}>{title}</Text>
        <Text sx={styles.description}>{description}</Text>
        {links?.length ? (
          <VStack align="flex-start" spacing={1}>
            {links.map(({ label, href }) => (
              <Link key={label + href} href={href} isExternal>
                <HStack spacing={2}>
                  <Text sx={styles.link}>{label ?? "Open link"}</Text>
                  <OpenNewIcon __css={styles.link} />
                </HStack>
              </Link>
            ))}
          </VStack>
        ) : null}
      </VStack>
      {onClose ? (
        <Box>
          <CloseIcon __css={styles.icon} onClick={onClose} cursor="pointer" />
        </Box>
      ) : null}
    </HStack>
  );
}

export default Snackbar;

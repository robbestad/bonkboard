import Image from "next/image";
import { IconProps } from "@chakra-ui/react";

import { SOLIcon } from "@/components/icons/SOL";
import { UnstakeableToken } from "@/utils/consts";

type XSOLIconProps = IconProps & {
  token: UnstakeableToken;
};

export function XSOLIcon({ token, ...props }: XSOLIconProps) {
  let imgSrc: string | undefined;

  switch (token) {
    case "daoSOL": {
      imgSrc = "/landing/tokens/daoSOL.png";
      break;
    }
    case "JSOL": {
      imgSrc = "/landing/tokens/JSOL.png";
      break;
    }
    case "mSOL": {
      imgSrc = "/landing/tokens/mSOL.png";
      break;
    }
    case "scnSOL": {
      imgSrc = "/landing/tokens/scnSOL.png";
      break;
    }
    case "stSOL": {
      imgSrc = "/landing/tokens/stSOL.webp";
      break;
    }
    case "laineSOL": {
      imgSrc = "/landing/tokens/laineSOL.webp";
      break;
    }
    case "jitoSOL": {
      imgSrc = "/landing/tokens/jitoSOL.svg";
      break;
    }
    case "bSOL": {
      imgSrc = "/landing/tokens/bSOL.png";
      break;
    }
    default:
      break;
  }

  if (imgSrc) {
    return (
      <Image
        src={imgSrc}
        alt={token}
        height={+props.h! * 4}
        width={+props.w! * 4}
      />
    );
  }

  return <SOLIcon {...props} />;
}

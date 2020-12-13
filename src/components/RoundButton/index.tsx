import React, { ButtonHTMLAttributes } from "react";
import {
  IconButton as ChakraRoundButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaPlus } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";

export enum RoundButtonColor {
  yellow = "yellow",
  red = "red",
  primary = "primary",
  white = "white",
  black = "black",
}

export enum IconType {
  google = "google",
  github = "github",
  plus = "plus",
  camera = "camera",
  none = "none",
}

export enum SizeType {
  xxs = "2xs",
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
  xxl = "2xl",
}

export enum ShadowType {
  xs = "xs",
  sm = "sm",
  base = "Base",
  md = "md",
  lg = "lg",
  xl = "xl",
  xxl = "2xl",
}

export type roundButtonProps = IconButtonProps & {
  buttonColor?: RoundButtonColor;
  iconType: string | undefined;
  shadowType?: ShadowType;
};

const RoundButton: React.FC<roundButtonProps> = ({
  buttonColor,
  iconType,
  shadowType,
  ...props
}) => {
  const roundBtnConfig = { buttonColor, shadowType };

  const renderBgColors = (): string => {
    if (buttonColor === RoundButtonColor.yellow) return "yellow.300";
    if (buttonColor === RoundButtonColor.red) return "red.500";
    if (buttonColor === RoundButtonColor.primary) return "primary.200";
    if (buttonColor === RoundButtonColor.white) return "achromatic.100";
    if (buttonColor === RoundButtonColor.black) return "achromatic.800";

    return "primary.200";
  };
  const renderIcon = (): React.ReactElement => {
    if (iconType === IconType.google) return <FcGoogle />;
    if (iconType === IconType.github) return <FaGithub />;
    if (iconType === IconType.plus) return <FaPlus />;
    if (iconType === IconType.camera) return <FiCamera />;
    return <FcGoogle />;
  };

  return (
    <>
      {iconType ? (
        <ChakraRoundButton
          bgColor={renderBgColors()}
          borderRadius="full"
          icon={renderIcon()}
          {...props}
          {...roundBtnConfig}
        />
      ) : (
        <ChakraRoundButton
          bgColor={renderBgColors()}
          borderRadius="full"
          {...props}
          {...roundBtnConfig}
        />
      )}
    </>
  );
};

export default RoundButton;

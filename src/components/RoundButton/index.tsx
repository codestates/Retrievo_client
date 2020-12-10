import React, { ButtonHTMLAttributes } from "react";
import { Button as ChakraButton } from "@chakra-ui/react";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
export enum roundBtnColors {
  yellow = "yellow",
  red = "red",
  // google = "google",
  // github = "github",
}

export type roundButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType: roundBtnColors;
};

const RoundButton: React.FC<roundButtonProps> = ({ buttonType, ...props }) => {
  const roundBtnConfig = { buttonType };
  const renderBgColors = (): string => {
    if (buttonType === roundBtnColors.yellow) return "yellow.300";
    if (buttonType === roundBtnColors.red) return "red.500";
    // if (buttonType === buttonColor.google) return "achromatic.100";
    // if (buttonType === buttonColor.github) return "achromatic.500";
    return "primary.200";
  };

  // const renderSocialBtn = (): => {
  //   if (buttonType === buttonColor.google) return <FcGoogle />;
  //   if (buttonType === buttonColor.github) return <FaGithub />;
  // }

  return (
    <>
      <ChakraButton
        bgColor={renderBgColors()}
        borderRadius="full"
        {...props}
        {...roundBtnConfig}
      />
    </>
  );
};

export default RoundButton;

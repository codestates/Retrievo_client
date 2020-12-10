import React, { ButtonHTMLAttributes } from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

export enum roundBtnColors {
  yellow = "yellow",
  red = "red",
}

export type roundButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType: roundBtnColors;
};

const RoundButton: React.FC<roundButtonProps> = ({ buttonType, ...props }) => {
  const roundBtnConfig = { buttonType };
  const renderBgColors = (): string => {
    if (buttonType === roundBtnColors.yellow) return "yellow.300";
    if (buttonType === roundBtnColors.red) return "red.500";
    return "primary.200";
  };

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

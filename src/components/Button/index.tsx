/* eslint-disable no-unused-vars */
import React from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

export enum buttonColor {
  primary = "primary",
  danger = "danger",
  white = "white",
  gray = "gray",
}

export type buttonProps = ChakraButtonProps & {
  buttontype: buttonColor;
  children: React.ReactNode;
};

const Button: React.FC<buttonProps> = ({ buttontype, children, ...props }) => {
  const buttonConfig = { buttontype };
  const renderBgColors = (): string => {
    if (buttontype === buttonColor.primary) return "primary.200";
    if (buttontype === buttonColor.danger) return "fail";
    if (buttontype === buttonColor.white) return "achromatic.100";
    if (buttontype === buttonColor.gray) return "achromatic.500";
    return "primary.200";
  };

  const renderColors = () => {
    if (buttontype === buttonColor.white) return "achromatic.800";
    return "achromatic.100";
  };

  return (
    <>
      <ChakraButton
        bgColor={renderBgColors()}
        color={renderColors()}
        borderRadius="full"
        {...buttonConfig}
        {...props}
      >
        {children}
      </ChakraButton>
    </>
  );
};

export default Button;

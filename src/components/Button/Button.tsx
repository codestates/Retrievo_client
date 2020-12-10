import React, { ButtonHTMLAttributes } from "react";
import { Button as ChakraButton, Text, Heading } from "@chakra-ui/react";

export enum buttonColor {
  primary = "primary",
  danger = "danger",
  white = "white",
  gray = "gray",
}

export type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType: buttonColor;
};

const Button: React.FC<buttonProps> = ({ buttonType, ...props }) => {
  const buttonConfig = { buttonType };
  const renderBgColors = (): string => {
    if (buttonType === buttonColor.primary) return "primary.200";
    if (buttonType === buttonColor.danger) return "fail";
    if (buttonType === buttonColor.white) return "achromatic.100";
    if (buttonType === buttonColor.gray) return "achromatic.500";
    return "primary.200";
  };

  const renderColors = () => {
    if (buttonType === buttonColor.white) return "achromatic.800";
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
        text
      </ChakraButton>
      <Text>text</Text>
      <Heading fontFamily="title">Retrievo</Heading>
    </>
  );
};

export default Button;

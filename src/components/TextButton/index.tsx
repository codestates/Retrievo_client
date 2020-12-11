import React, { ButtonHTMLAttributes } from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

export enum txtColor {
  primary = "primary",
  fail = "fail",
  white = "white",
  gray = "gray",
  black = "black",
  teal = "teal",
}

export type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  textColorType: txtColor;
  children: React.ReactNode;
};

const TextButton: React.FC<buttonProps> = ({
  textColorType,
  children,
  ...props
}) => {
  const buttonConfig = { textColorType };
  const renderTxtColors = (): string => {
    console.log(textColorType, txtColor);
    if (textColorType === txtColor.primary) return "primary.200";
    if (textColorType === txtColor.fail) return "fail";
    if (textColorType === txtColor.white) return "achromatic.100";
    if (textColorType === txtColor.gray) return "achromatic.500";
    if (textColorType === txtColor.teal) return "labelTeal";
    if (textColorType === txtColor.black) return "achromatic.800";

    return "primary.200";
  };

  return (
    <>
      <ChakraButton
        bgColor="transparent"
        textColor={renderTxtColors()}
        _hover={{
          background: "transparent",
        }}
        _active={{
          background: "transparent",
          border: "none",
        }}
        {...buttonConfig}
        {...props}
      >
        {children}
      </ChakraButton>
    </>
  );
};

export default TextButton;

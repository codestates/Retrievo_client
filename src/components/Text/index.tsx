import React from "react";
import {
  Text as ChakraText,
  TextProps as ChakraTextPropsType,
} from "@chakra-ui/react";

export type TextProps = ChakraTextPropsType & {
  color?: string;
  fontSize?: string;
  children: string;
};

const Text: React.FC<TextProps> = ({ color, children, ...props }) => {
  const fontColor = color || "achromatic.700";
  const textConfig = { color: fontColor };
  return (
    <ChakraText {...textConfig} {...props}>
      {children}
    </ChakraText>
  );
};

export default Text;

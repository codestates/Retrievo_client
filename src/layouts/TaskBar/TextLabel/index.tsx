import React from "react";
import { Text } from "@chakra-ui/react";

interface textLabelPropsType {
  children: string;
}

export const TextLabel: React.FC<textLabelPropsType> = ({ children }) => {
  return (
    <Text fontSize="sm" color="achromatic.600" mb="1">
      {children}
    </Text>
  );
};

export default TextLabel;

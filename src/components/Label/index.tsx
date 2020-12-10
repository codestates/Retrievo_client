import React, { ReactElement } from "react";
import { Tag as ChakraTag, TagRightIcon } from "@chakra-ui/react";
import { FaCaretDown } from "react-icons/fa";

export type LabelProps = {
  color?: string;
  bgColor?: string;
  hasDropdown?: boolean;
  children: string | ReactElement;
};

const Label: React.FC<LabelProps> = ({
  color,
  bgColor,
  hasDropdown = false,
  children,
  ...props
}) => {
  const fontColor = color || "achromatic.100";
  const backgroundColor = bgColor || "primary.300";
  const hover = hasDropdown ? { cursor: "pointer" } : { cursor: "none" };
  const labelConfig = {
    color: fontColor,
    bgColor: backgroundColor,
    _hover: hover,
  };
  if (hasDropdown) {
    return (
      <ChakraTag {...labelConfig} {...props}>
        {children}
        <TagRightIcon as={FaCaretDown} />
      </ChakraTag>
    );
  }

  return (
    <ChakraTag {...labelConfig} {...props}>
      {children}
    </ChakraTag>
  );
};

export default Label;

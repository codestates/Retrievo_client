import React, { ReactElement } from "react";
import {
  Tag as ChakraTag,
  TagLabel,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";
import { FaCaretDown } from "react-icons/fa";

export type LabelProps = {
  color?: string;
  bgColor?: string;
  // labelId: string;
  hasDropdown?: boolean;
  hasCloseButton?: boolean;
  onClose?: () => void;
  children: string | ReactElement;
};

const Label: React.FC<LabelProps> = ({
  color,
  bgColor,
  hasDropdown = false,
  hasCloseButton = false,
  children,
  // labelId,
  onClose,
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

  if (hasCloseButton) {
    return (
      <ChakraTag {...labelConfig} {...props}>
        <TagLabel>{children}</TagLabel>
        <TagCloseButton onClick={onClose} />
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

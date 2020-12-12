import React, { ReactElement, useState } from "react";
import {
  Tag as ChakraTag,
  TagLabel,
  TagCloseButton,
  Select,
  TagProps as ChakraLabelPropsType,
} from "@chakra-ui/react";

export type option = {
  id: string;
  name: string;
  color: string;
};

export type LabelProps = ChakraLabelPropsType & {
  color?: string;
  bgColor?: string;
  hasDropdown?: boolean;
  hasCloseButton?: boolean;
  onClose?: () => void;
  children: string | ReactElement;
  options?: option[];
  defaultValue?: option;
};

const Label: React.FC<LabelProps> = ({
  color,
  bgColor,
  hasDropdown = false,
  hasCloseButton = false,
  children,
  onClose,
  options,
  defaultValue,
  ...props
}) => {
  const [selectedColor, setSelectedColor] = useState(
    defaultValue?.color || "primary.300"
  );
  const fontColor = color || "achromatic.100";
  const backgroundColor = bgColor || "primary.300";
  const hover = hasDropdown ? { cursor: "pointer" } : { cursor: "none" };
  const labelConfig = {
    color: fontColor,
    bgColor: backgroundColor,
    _hover: hover,
  };
  const renderOptions = () => {
    return options?.map((option: option) => {
      return (
        <option
          key={option.id}
          value={option.color}
          selected={defaultValue?.id === option.id}
        >
          {option.name}
        </option>
      );
    });
  };

  if (hasDropdown) {
    return (
      <Select
        onChange={(e) => setSelectedColor(e.target.value)}
        bg={selectedColor}
        color="white"
        fontSize="sm"
        height={6}
        maxW={150}
      >
        {renderOptions()}
      </Select>
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

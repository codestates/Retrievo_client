import React, { ReactElement, useState } from "react";
import {
  Tag as ChakraTag,
  TagLabel,
  TagCloseButton,
  Select,
  TagProps as ChakraLabelPropsType,
} from "@chakra-ui/react";

export type label = {
  id: string | undefined;
  name: string | undefined;
  color: string | undefined;
};

export type LabelProps = ChakraLabelPropsType & {
  color?: string;
  bgColor?: string;
  hasDropdown?: boolean;
  hasCloseButton?: boolean;
  onClose?: () => void;
  children?: string | ReactElement;
  labels?: label[];
  defaultValues?: label;
  onOptionClick?: (labelId: string) => void;
};

const Label: React.FC<LabelProps> = ({
  color,
  bgColor,
  hasDropdown = false,
  hasCloseButton = false,
  children,
  onClose,
  labels,
  defaultValues,
  onOptionClick,
  ...props
}) => {
  const [selectedColor, setSelectedColor] = useState(
    defaultValues?.color || "primary.300"
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
    return labels?.map((label: label) => {
      return (
        <option
          key={label.id}
          value={label.color}
          selected={defaultValues?.id === label.id}
        >
          {label.name}
        </option>
      );
    });
  };

  if (hasDropdown) {
    return (
      <Select
        onChange={(e) => {
          setSelectedColor(e.target.value);
          console.log(e.target);
        }}
        bg="primary.300"
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
    <ChakraTag fontSize="xs" py={0} {...labelConfig} {...props}>
      {children}
    </ChakraTag>
  );
};

export default Label;

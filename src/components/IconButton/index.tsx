/* eslint-disable no-unused-vars */
import React from "react";
import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from "@chakra-ui/react";
import { FiBell, FiUser, FiDelete, FiPlus } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  RiDeleteBin2Line,
  RiSave2Line,
  RiCloseFill,
  RiPencilLine,
} from "react-icons/ri";
import { BsPaperclip } from "react-icons/bs";

export enum SizeType {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum IconButtonType {
  notification = "notification",
  user = "user",
  delete = "delete",
  plus = "plus",
  calendar = "calendar",
  deleteBin = "deleteBin",
  save = "save",
  close = "close",
  pencil = "pencil",
  clip = "clip",
}

export enum IconButtonBgColors {
  yellow = "yellow",
  red = "red",
}

export type IconButtonProps = ChakraIconButtonProps & {
  iconButtonType?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  iconButtonType,
  ...props
}) => {
  const renderIcons = (): React.ReactElement => {
    if (iconButtonType === IconButtonType.notification) return <FiBell />;
    if (iconButtonType === IconButtonType.user) return <FiUser />;
    if (iconButtonType === IconButtonType.delete) return <FiDelete />;
    if (iconButtonType === IconButtonType.plus) return <FiPlus />;
    if (iconButtonType === IconButtonType.calendar) return <FaRegCalendarAlt />;
    if (iconButtonType === IconButtonType.deleteBin)
      return <RiDeleteBin2Line />;
    if (iconButtonType === IconButtonType.save) return <RiSave2Line />;
    if (iconButtonType === IconButtonType.close) return <RiCloseFill />;
    if (iconButtonType === IconButtonType.pencil) return <RiPencilLine />;
    if (iconButtonType === IconButtonType.clip) return <BsPaperclip />;
    return <FiBell />;
  };

  return (
    <>
      <ChakraIconButton
        icon={renderIcons()}
        bgColor="transparent"
        _hover={{
          background: "transparent",
        }}
        {...props}
      />
    </>
  );
};

export default IconButton;

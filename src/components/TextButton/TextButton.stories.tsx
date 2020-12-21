import React from "react";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import TextButton, { buttonProps, txtColor } from "./index";

export const BasicTextButton = ({
  children,
  ...args
}: buttonProps): React.ReactElement => (
  <TextButton {...args}>{children}</TextButton>
);
BasicTextButton.args = {
  textColorType: "fail",
  isFullWidth: true,
  children: "Remove",
};

export const LeftIconButton = ({
  children,
  ...args
}: buttonProps): React.ReactElement => (
  <TextButton {...args}>{children}</TextButton>
);
LeftIconButton.args = {
  textColorType: "teal",
  isFullWidth: true,
  leftIcon: <FiPlus />,
  children: "New Project",
};

export const RightIconButton = ({
  children,
  ...args
}: buttonProps): React.ReactElement => (
  <TextButton {...args}>{children}</TextButton>
);

RightIconButton.args = {
  textColorType: "black",
  rightIcon: <FiChevronDown />,
  isFullWidth: true,
  children: "See More",
};

const ButtonStories = {
  title: "components/TextButton",
  component: TextButton,
  argTypes: {
    textColorType: {
      control: {
        type: "select",
        options: Object.keys(txtColor),
      },
    },
  },
};

export default ButtonStories;

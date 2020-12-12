import React from "react";
import { FaBeer } from "react-icons/fa";
import Button, { buttonProps, buttonColor } from "./index";

export const BasicButton = ({
  children,
  ...args
}: buttonProps): React.ReactElement => <Button {...args}>{children}</Button>;
BasicButton.args = {
  buttontype: "primary",
  isFullWidth: true,
  children: "Are You Happy?",
};

export const IconButton = ({
  children,
  ...args
}: buttonProps): React.ReactElement => <Button {...args}>{children}</Button>;

IconButton.args = {
  buttontype: "primary",
  rightIcon: <FaBeer />,
  isFullWidth: true,
  children: "I'm happy!",
};

const ButtonStories = {
  title: "components/Button",
  component: Button,
  argTypes: {
    buttontype: {
      control: {
        type: "select",
        options: Object.keys(buttonColor),
      },
    },
  },
};

export default ButtonStories;

import React from "react";
import { FaBeer } from "react-icons/fa";
import Button, { buttonProps, buttonColor } from "./index";

export const BasicButton = (args: buttonProps): React.ReactElement => (
  <Button {...args} />
);
BasicButton.args = {
  buttonType: "primary",
  isFullWidth: true,
};

export const IconButton = (args: buttonProps): React.ReactElement => (
  <Button {...args} />
);

IconButton.args = {
  buttonType: "primary",
  rightIcon: <FaBeer />,
  isFullWidth: true,
};

const ButtonStories = {
  title: "components/Button",
  component: Button,
  argTypes: {
    buttonType: {
      control: {
        type: "select",
        options: Object.keys(buttonColor),
      },
    },
  },
};

export default ButtonStories;

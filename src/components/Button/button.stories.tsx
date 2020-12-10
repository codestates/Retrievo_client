import React from "react";
import { FaBeer } from "react-icons/fa";
import Button, { buttonProps } from ".";

export const basicButton = (args: buttonProps): React.ReactElement => (
  <Button {...args} />
);
basicButton.args = {
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
        options: ["primary", "danger", "white", "gray"],
      },
    },
  },
};

export default ButtonStories;

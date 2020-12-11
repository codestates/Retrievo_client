import React from "react";
import IconButton, { IconButtonType, IconButtonProps, SizeType } from "./index";

export const NormalButton = (args: IconButtonProps): React.ReactElement => (
  <IconButton {...args} />
);
NormalButton.args = {
  iconButtonType: "user",
};

const ButtonStories = {
  title: "components/IconButton",
  component: IconButton,
  argTypes: {
    iconButtonType: {
      control: {
        type: "select",
        options: Object.keys(IconButtonType),
      },
    },
    fontSize: {
      control: {
        type: "select",
        options: Object.keys(SizeType),
      },
    },
  },
};

export default ButtonStories;

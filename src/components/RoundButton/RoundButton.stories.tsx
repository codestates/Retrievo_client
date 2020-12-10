import React from "react";
import RoundButton, { roundButtonProps, roundBtnColors } from "./index";

export const NormalButton = (args: roundButtonProps): React.ReactElement => (
  <RoundButton {...args} />
);
NormalButton.args = {
  buttonType: "yellow",
};

const ButtonStories = {
  title: "components/RoundButton",
  component: RoundButton,
  argTypes: {
    buttonType: {
      control: {
        type: "select",
        options: Object.keys(roundBtnColors),
      },
    },
  },
};

export default ButtonStories;

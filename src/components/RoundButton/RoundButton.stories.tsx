import React from "react";
import RoundButton, { roundButtonProps, roundBtnColors } from "./index";

export const NormalButton = (args: roundButtonProps): React.ReactElement => (
  <RoundButton {...args} />
);
NormalButton.args = {
  buttonType: "yellow",
};
// export const SocialButton = (args: roundButtonProps): React.ReactElement => (
//   <RoundButton {...args} />
// );

// SocialButton.args = {
//   buttonType: "socialButton",
//   rightIcon: <FcGoogle />,
// };

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
    // socialButton: {
    //   control: {
    //     type: "select",
    //     options: Object.keys(socialButton),
    //   },
    // },
  },
};

export default ButtonStories;

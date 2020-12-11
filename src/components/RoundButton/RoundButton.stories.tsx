import React from "react";
import RoundButton, {
  roundButtonProps,
  RoundButtonColor,
  SizeType,
  IconType,
} from "./index";

export const NormalButton = (args: roundButtonProps): React.ReactElement => (
  <RoundButton {...args} />
);
NormalButton.args = {
  buttonColor: "primary",
};

export const RoundIconButton = (args: roundButtonProps): React.ReactElement => (
  <RoundButton {...args} />
);
RoundIconButton.args = {
  buttonColor: "primary",
};

export const GoogleButton = (args: roundButtonProps): React.ReactElement => (
  <RoundButton {...args} />
);
GoogleButton.args = {
  buttonColor: "white",
  bgColor: "white",
  iconType: "google",
  shadow: "xl",
  fontSize: "lg",
};

export const GithubButton = (args: roundButtonProps): React.ReactElement => (
  <RoundButton {...args} />
);
GithubButton.args = {
  buttonColor: "black",
  borderColor: "gray.200",
  iconType: "github",
  shadow: "xl",
  fontSize: "xl",
  color: "white",
};

export const PlusButton = (args: roundButtonProps): React.ReactElement => (
  <RoundButton {...args} />
);
PlusButton.args = {
  borderColor: "gray.200",
  iconType: "plus",
  shadow: "xl",
  fontSize: "xl",
  color: "white",
  bgColor: "gray.500",
};

export const ProfileUploadButton = (
  args: roundButtonProps
): React.ReactElement => <RoundButton {...args} />;
ProfileUploadButton.args = {
  buttonColor: "primary",
  iconType: "camera",
  shadow: "xl",
  fontSize: "xl",
  color: "white",
};

const ButtonStories = {
  title: "components/RoundButton",
  component: RoundButton,
  argTypes: {
    buttonColor: {
      control: {
        type: "select",
        options: Object.keys(RoundButtonColor),
      },
    },
    size: {
      control: {
        type: "select",
        options: Object.keys(SizeType),
      },
    },
    iconType: {
      control: {
        type: "select",
        options: Object.keys(IconType),
      },
    },
    fontSize: {
      control: {
        type: "select",
        options: Object.keys(SizeType),
      },
    },
    shadow: {
      control: {
        type: "select",
        options: Object.keys(SizeType),
      },
    },
  },
};

export default ButtonStories;

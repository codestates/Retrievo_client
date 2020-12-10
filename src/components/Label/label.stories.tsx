import React from "react";
import Label, { LabelProps } from "./index";
import theme from "../../styles/theme";

const { colors } = theme;

export const basicLabel = ({
  children,
  ...args
}: LabelProps): React.ReactElement => <Label {...args}>{children}</Label>;
basicLabel.args = {
  children: "TO DO",
};

export const dropdownLabel = ({
  children,
  ...args
}: LabelProps): React.ReactElement => (
  <>
    <p>cursor pointer와 onClick props 가능</p>
    <Label {...args}>{children}</Label>
  </>
);
dropdownLabel.args = {
  hasDropdown: true,
  children: "IN PROGRESS",
  onClick: () => console.log("click"),
};

const LabelStories = {
  title: "components/Label",
  component: Label,
  argTypes: {
    bgColor: {
      control: {
        type: "select",
        options: [
          "labelYellow",
          "labelOrange",
          "labelGreen",
          "labelViolet",
          "labelPurple",
          "labelPink",
          "labelTeal",
          "labelCyan",
        ],
      },
    },
  },
};

export default LabelStories;

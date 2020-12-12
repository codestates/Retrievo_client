/* eslint-disable no-unused-vars */
import React from "react";
import Label, { LabelProps } from "./index";

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
  labels: [
    { id: "1", name: "TO DO", color: "labelOrange" },
    { id: "2", name: "IN PROGRESS", color: "labelYellow" },
    { id: "3", name: "DONE", color: "labelTeal" },
  ],
  defaultValue: { id: "2", name: "IN PROGRESS", color: "labelYellow" },
};

export const closeButtonLabel = ({
  children,
  ...args
}: LabelProps): React.ReactElement => (
  <>
    <p>cursor pointer와 onClose props 가능</p>
    <Label {...args}>{children}</Label>
  </>
);
closeButtonLabel.args = {
  hasCloseButton: true,
  children: "DONE",
  onClose: () => console.log("close"),
};

const LabelStories = {
  title: "components/Label",
  component: Label,
  argTypes: {
    bgColor: {
      control: {
        type: "select",
        labels: [
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

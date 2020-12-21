/* eslint-disable no-unused-vars */
import React from "react";
import LabelSearchInput, { OptionsType } from "./index";

type item = { id: string; value: string; label: string; color: string };

const options = [
  { id: "1", value: "apple", label: "Apple", color: "labelOrange" },
  { id: "2", value: "banana", label: "Banana", color: "labelYellow" },
  { id: "3", value: "mango", label: "Mango", color: "warning" },
  { id: "4", value: "kiwi", label: "Kiwi", color: "labelGreen" },
  { id: "5", value: "치킨밸류", label: "치킨", color: "failDark" },
  { id: "6", value: "만두", label: "만두", color: "violet" },
  { id: "7", value: "탕수육", label: "탕수육", color: "labelPink" },
  { id: "8", value: "초밥", label: "초밥", color: "violet" },
];

export const BasicLabelSearchInput = ({
  ...args
}: OptionsType): React.ReactElement => <LabelSearchInput {...args} />;
BasicLabelSearchInput.args = {
  options,
  createTaskLabel: (item: item) => console.log(item),
  deleteTaskLabel: (item: item) => console.log(item),
};

export const DafaultLabelSearchInput = ({
  ...args
}: OptionsType): React.ReactElement => <LabelSearchInput {...args} />;
DafaultLabelSearchInput.args = {
  options,
  defaultValue: [
    { id: "1", value: "apple", label: "Apple", color: "labelOrange" },
    { id: "2", value: "banana", label: "Banana", color: "labelYellow" },
  ],
  createTaskLabel: (item: item) => console.log(item),
  deleteTaskLabel: (item: item) => console.log(item),
};

const LabelSearchInputStories = {
  title: "components/LabelSearchInput",
  component: LabelSearchInput,
  argTypes: {
    options,
  },
};

export default LabelSearchInputStories;

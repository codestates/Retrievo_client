import React from "react";
import Text, { TextProps } from "./index";

export const basicText = ({
  children,
  ...args
}: TextProps): React.ReactElement => <Text {...args}>{children}</Text>;
basicText.args = {
  children:
    "Dashboards automatically populate your project data into powerful, infographic powerhouse. Assign tasks or add custom fields to see the state of your team’s woirk in real-time and quickly pinpoint issues.",
};

export const grayText = ({
  children,
  ...args
}: TextProps): React.ReactElement => <Text {...args}>{children}</Text>;
grayText.args = {
  color: "achromatic.600",
  children: "Si Choi is Retriever and Paul Kim is mater",
};

export const mintText = ({
  children,
  ...args
}: TextProps): React.ReactElement => <Text {...args}>{children}</Text>;
mintText.args = {
  color: "primary.300",
  children: "Register",
};

export const BoldText = ({
  children,
  ...args
}: TextProps): React.ReactElement => <Text {...args}>{children}</Text>;
BoldText.args = {
  fontWeight: "bold",
  children: "Kje do someting",
};

const TextStories = {
  title: "components/Text",
  component: Text,
  argTypes: {
    headingType: {
      control: {
        type: "select",
        options: [""],
      },
    },
  },
};

export default TextStories;

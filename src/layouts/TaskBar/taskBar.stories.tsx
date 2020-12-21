import React from "react";
import CustomTaskBar, { taskProps } from "./index";

export const TaskBar = (arg: taskProps): React.ReactElement => (
  <CustomTaskBar {...arg} />
);

TaskBar.args = {
  // onTitleSubmit: (value: Record<string, string>) => console.log(value),
};

const taskBarStories = {
  title: "layouts/TaskBar",
  component: CustomTaskBar,
  argTypes: {},
};

export default taskBarStories;

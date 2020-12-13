// export {};
/* eslint-disable no-unused-vars */
import React, { ReactElement } from "react";
import SprintListDropdown, { SprintListDropdownPropsType } from ".";

export const sprintListDropdown = ({
  ...args
}: SprintListDropdownPropsType): ReactElement => (
  <SprintListDropdown {...args} />
);
sprintListDropdown.args = {
  sprints: [
    {
      id: "1",
      name: "sprint 1",
    },
    {
      id: "2",
      name: "sprint 2",
    },
    {
      id: "3",
      name: "sprint 3",
    },
    {
      id: "4",
      name: "sprint 4",
    },
  ],
  currentSprint: {
    id: "4",
    name: "sprint 4",
  },
  onSprintSelect: (id: string) => console.log(id),
};

const SprintListDropdownStories = {
  title: "layouts/TaskBar/SprintListDropdown",
  component: SprintListDropdown,
};

export default SprintListDropdownStories;

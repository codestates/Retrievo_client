import React, { ReactElement } from "react";
import TaskCard, { TaskCardProps } from "./index";

export const taskCard = ({ ...args }: TaskCardProps): ReactElement => (
  <TaskCard {...args} />
);
taskCard.args = {
  task: {
    id: "alsk32kdk",
    title: "Reading Books",
    startDate: "1584172961096",
    endDate: "1611017454633",
    taskIndex: 20,
    userTask: [
      {
        user: {
          id: "ak39vm3",
          username: "Hailey",
          avatar: null,
        },
      },
      {
        user: {
          id: "dkgkasd",
          username: "Dongoc",
          avatar: null,
        },
      },
    ],
    taskLabel: [
      {
        label: {
          id: "aksjakeo",
          name: "Apple",
          color: "labelOrange",
        },
      },
      {
        label: {
          id: "akasdgakeo",
          name: "Banana",
          color: "labelYellow",
        },
      },
    ],
  },
  handleTaskDelete: (id: string) => console.log(id),
};

export const dragPositionCard = ({ ...args }: TaskCardProps): ReactElement => (
  <TaskCard {...args} />
);
dragPositionCard.args = {
  isDragPositionCard: true,
  fromToBoardArr: ["In Progress", "Done"],
};

const TaskCardStories = {
  title: "layouts/TaskBoard/TaskCard",
  component: TaskCard,
};

export default TaskCardStories;

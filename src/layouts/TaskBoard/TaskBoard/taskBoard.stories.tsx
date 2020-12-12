import React, { ReactElement } from "react";
import TaskBoard, { TaskBoardProps } from "./index";

export const taskBoard = ({ ...args }: TaskBoardProps): ReactElement => (
  <TaskBoard {...args} />
);
taskBoard.args = {
  handleBoardCreate: () => console.log("create!"),
  handleBoardDelete: (id: string) => console.log(id),
  handleTaskClick: (id: string) => console.log(id),
  handleTaskCreate: () => console.log("create!"),
  handleTaskDelete: (id: string) => console.log(id),
  board: {
    id: "skasdkn",
    title: "TO DO",
    boardColumnIndex: 0,
    task: [
      {
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
      {
        id: "bmkadsvkn",
        title: "Washing Dishes",
        startDate: "1584172961096",
        endDate: null,
        taskIndex: 21,
        userTask: [
          {
            user: {
              id: "ak39vm3",
              username: "Hailey",
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
    ],
  },
};

export const skeletonTaskBoard = ({
  ...args
}: TaskBoardProps): ReactElement => <TaskBoard {...args} />;
skeletonTaskBoard.args = {
  isSkeletonBoard: true,
};

const TaskBoardStories = {
  title: "layouts/TaskBoard/TaskBoard",
  component: TaskBoard,
};

export default TaskBoardStories;

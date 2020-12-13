import React, { ReactElement } from "react";
import TaskBoardList, { TaskBoardListProps } from "./index";
import { boardType } from "../TaskBoard/SkeletonBoard";

export const taskBoardList = ({
  ...args
}: TaskBoardListProps): ReactElement => <TaskBoardList {...args} />;
taskBoardList.args = {
  projectId: "project1",
  handleBoardCreate: (value: boardType, projectId: string) =>
    console.log("create!", value, projectId),
  handleBoardDelete: (id: string) => console.log("delete", id),
  handleTaskClick: (id: string) => console.log("click", id),
  handleTaskCreate: () => console.log("create!"),
  handleTaskDelete: (id: string) => console.log("delete", id),
  boards: [
    {
      id: "board1",
      title: "TO DO",
      boardColumnIndex: 0,
      task: [
        {
          id: "task1",
          title: "Reading Books",
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 20,
          userTask: [
            {
              user: {
                id: "user1",
                username: "Hailey",
                avatar: null,
              },
            },
            {
              user: {
                id: "user2",
                username: "Dongoc",
                avatar: null,
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label1",
                name: "books",
                color: "fail",
              },
            },
            {
              label: {
                id: "label2",
                name: "science",
                color: "violet",
              },
            },
          ],
        },
        {
          id: "task2",
          title: "Washing Dishes",
          startDate: "1584172961096",
          endDate: null,
          taskIndex: 21,
          userTask: [],
          taskLabel: [
            {
              label: {
                id: "label3",
                name: "cleanup",
                color: "labelTeal",
              },
            },
          ],
        },
        {
          id: "task1",
          title: "Reading Books",
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 20,
          userTask: [
            {
              user: {
                id: "user1",
                username: "Hailey",
                avatar: null,
              },
            },
            {
              user: {
                id: "user2",
                username: "Dongoc",
                avatar: null,
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label1",
                name: "books",
                color: "fail",
              },
            },
            {
              label: {
                id: "label2",
                name: "science",
                color: "violet",
              },
            },
          ],
        },
        {
          id: "task2",
          title: "Washing Dishes",
          startDate: "1584172961096",
          endDate: null,
          taskIndex: 21,
          userTask: [],
          taskLabel: [
            {
              label: {
                id: "label3",
                name: "cleanup",
                color: "labelTeal",
              },
            },
          ],
        },
        {
          id: "task1",
          title: "Reading Books",
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 20,
          userTask: [
            {
              user: {
                id: "user1",
                username: "Hailey",
                avatar: null,
              },
            },
            {
              user: {
                id: "user2",
                username: "Dongoc",
                avatar: null,
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label1",
                name: "books",
                color: "fail",
              },
            },
            {
              label: {
                id: "label2",
                name: "science",
                color: "violet",
              },
            },
          ],
        },
        {
          id: "task2",
          title: "Washing Dishes",
          startDate: "1584172961096",
          endDate: null,
          taskIndex: 21,
          userTask: [],
          taskLabel: [
            {
              label: {
                id: "label3",
                name: "cleanup",
                color: "labelTeal",
              },
            },
          ],
        },
        {
          id: "task1",
          title: "Reading Books",
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 20,
          userTask: [
            {
              user: {
                id: "user1",
                username: "Hailey",
                avatar: null,
              },
            },
            {
              user: {
                id: "user2",
                username: "Dongoc",
                avatar: null,
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label1",
                name: "books",
                color: "fail",
              },
            },
            {
              label: {
                id: "label2",
                name: "science",
                color: "violet",
              },
            },
          ],
        },
        {
          id: "task2",
          title: "Washing Dishes",
          startDate: "1584172961096",
          endDate: null,
          taskIndex: 21,
          userTask: [],
          taskLabel: [
            {
              label: {
                id: "label3",
                name: "cleanup",
                color: "labelTeal",
              },
            },
          ],
        },
        {
          id: "task1",
          title: "Reading Books",
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 20,
          userTask: [
            {
              user: {
                id: "user1",
                username: "Hailey",
                avatar: null,
              },
            },
            {
              user: {
                id: "user2",
                username: "Dongoc",
                avatar: null,
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label1",
                name: "books",
                color: "fail",
              },
            },
            {
              label: {
                id: "label2",
                name: "science",
                color: "violet",
              },
            },
          ],
        },
        {
          id: "task2",
          title: "Washing Dishes",
          startDate: "1584172961096",
          endDate: null,
          taskIndex: 21,
          userTask: [],
          taskLabel: [
            {
              label: {
                id: "label3",
                name: "cleanup",
                color: "labelTeal",
              },
            },
          ],
        },
        {
          id: "task1",
          title: "Reading Books",
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 20,
          userTask: [
            {
              user: {
                id: "user1",
                username: "Hailey",
                avatar: null,
              },
            },
            {
              user: {
                id: "user2",
                username: "Dongoc",
                avatar: null,
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label1",
                name: "books",
                color: "fail",
              },
            },
            {
              label: {
                id: "label2",
                name: "science",
                color: "violet",
              },
            },
          ],
        },
        {
          id: "task2",
          title: "Washing Dishes",
          startDate: "1584172961096",
          endDate: null,
          taskIndex: 21,
          userTask: [],
          taskLabel: [
            {
              label: {
                id: "label3",
                name: "cleanup",
                color: "labelTeal",
              },
            },
          ],
        },
      ],
    },
    {
      id: "board2",
      title: "IN Progress",
      boardColumnIndex: 1,
      task: [
        {
          id: "task3",
          title: "Retrievo Server Dev",
          startDate: "1584172961096",
          endDate: "1611017454633",
          taskIndex: 301,
          userTask: [
            {
              user: {
                id: "user3",
                username: "Si Choi",
                avatar: null,
              },
            },
            {
              user: {
                id: "user2",
                username: "Dongoc",
                avatar: null,
              },
            },
            {
              user: {
                id: "user4",
                username: "dkje",
                avatar: null,
              },
            },
            {
              user: {
                id: "user5",
                username: "pbkim",
                avatar: null,
              },
            },
          ],
          taskLabel: [
            {
              label: {
                id: "label5",
                name: "Retrievo!",
                color: "labelCyan",
              },
            },
            {
              label: {
                id: "akasdgakeo",
                name: "Development",
                color: "labelViolet",
              },
            },
          ],
        },
      ],
    },
    {
      id: "board3",
      title: "DONE",
      boardColumnIndex: 0,
      task: [
        {
          id: "task5",
          title: "What's Dat Dev",
          startDate: null,
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
          taskLabel: [],
        },
      ],
    },
  ],
};

const TaskBoardContainerStories = {
  title: "layouts/TaskBoard/TaskBoardList",
  component: TaskBoardList,
};

export default TaskBoardContainerStories;

import React from "react";
import Chart from "../../../components/Chart";
import { chartVariant } from "../../../components/Chart/types";

const data = [
  {
    username: "Si Choi",
    avatar: null,
    incompleteTasksCount: 4,
    completedTasksCount: 9,
    overdueTasksCount: 3,
  },
  {
    username: "Hailey Song",
    avatar: null,
    incompleteTasksCount: 2,
    completedTasksCount: 12,
    overdueTasksCount: 0,
  },
  {
    username: "JungEun Kim",
    avatar: null,
    incompleteTasksCount: 8,
    completedTasksCount: 4,
    overdueTasksCount: 1,
  },
  {
    username: "Paul Kim",
    avatar: null,
    incompleteTasksCount: 12,
    completedTasksCount: 2,
    overdueTasksCount: 4,
  },
  {
    username: "멋쟁이 아저씨",
    avatar: null,
    incompleteTasksCount: 1,
    completedTasksCount: 12,
    overdueTasksCount: 0,
  },
];

export const TasksByAssignee: React.FC = () => {
  return (
    <>
      <Chart variant={chartVariant.tasksByAssignee} data={data} />
    </>
  );
};

export default TasksByAssignee;

import React from "react";
import Chart from "../../../components/Chart";
import { chartVariant } from "../../../components/Chart/types";

const data = {
  overdueTasksCount: 14,
  completedTasksCount: 15,
  incompleteTasksCount: 30,
};

export const TasksCountSummary: React.FC = () => {
  return (
    <>
      <Chart variant={chartVariant.taskCountSummary} data={data} />
    </>
  );
};

export default TasksCountSummary;

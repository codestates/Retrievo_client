import React from "react";
import Chart from "../../../components/Chart";
import { chartVariant } from "../../../components/Chart/types";

const data = {
  Todo: 7,
  Doing: 19,
  Review: 12,
  Testing: 5,
  Done: 6,
};

export const IncompleteTasks: React.FC = () => {
  return (
    <>
      <Chart variant={chartVariant.incompleteTaskStatus} data={data} />
    </>
  );
};

export default IncompleteTasks;

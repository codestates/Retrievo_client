import React from "react";
import Chart, { chartProps } from ".";

export const incompleteTaskStatus = (args: chartProps): React.ReactElement => {
  return (
    <div style={{ maxWidth: "968px" }}>
      <h2>Container 크기에 따라 차트가 크기가 반응적으로 달라짐</h2>
      <Chart {...args} />
    </div>
  );
};

incompleteTaskStatus.args = {
  variant: "incompleteTaskStatus",
  data: {
    Todo: 7,
    Doing: 19,
    Done: 12,
    dada: 5,
    qweq: 6,
    ca: 3,
  },
};

export const tasksByAssignee = (args: chartProps): React.ReactElement => {
  return (
    <div style={{ maxWidth: "968px" }}>
      <Chart {...args} />
    </div>
  );
};

tasksByAssignee.args = {
  variant: "tasksByAssignee",
  data: [
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
  ],
};

const chartStories = {
  title: "components/Chart",
  component: Chart,
  // argTypes: {
  //   size: {
  //     control: {
  //       type: "inline-radio",
  //       options: Object.keys(spinnerSize),
  //     },
  //   },
  //   thickness: {
  //     control: {
  //       type: "inline-radio",
  //       options: Object.keys(spinnerThickness),
  //     },
  //   },
  //   color: {
  //     control: {
  //       type: "color",
  //       options: Object.keys(spinnerColor),
  //     },
  //   },
  // },
};

export const taskCountSummary = (args: chartProps): React.ReactElement => {
  return (
    <div style={{ maxWidth: "968px" }}>
      <Chart {...args} />
    </div>
  );
};

taskCountSummary.args = {
  variant: "taskCountSummary",
  data: {
    overdueTasksCount: 14,
    completedTasksCount: 15,
    incompleteTasksCount: 30,
  },
};

export default chartStories;

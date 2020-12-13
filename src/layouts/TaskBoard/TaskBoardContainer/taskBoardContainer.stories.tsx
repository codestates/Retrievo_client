import React, { ReactElement } from "react";
import TaskBoardContainer from "./index";

export const taskBoardContainer = (): ReactElement => <TaskBoardContainer />;

const TaskBoardContainerStories = {
  title: "layouts/TaskBoard/TaskBoardContainer",
  component: TaskBoardContainer,
};

export default TaskBoardContainerStories;

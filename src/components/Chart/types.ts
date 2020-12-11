/* eslint-disable no-unused-vars */
export enum chartVariant {
  taskCountSummary = "taskCountSummary",
  tasksByAssignee = "tasksByAssignee",
  incompleteTaskStatus = "incompleteTaskStatus",
}

export type taskCountSummary = {
  overdueTasksCount?: number | null | undefined;
  completedTasksCount?: number | null | undefined;
  incompleteTasksCount?: number | null | undefined;
  totalTasksCount?: number | null | undefined;
};

export type assignee = {
  username: string | null | undefined;
  avatar: string | null | undefined;
  incompleteTasksCount: number;
  completedTasksCount: number;
  overdueTasksCount: number;
};

export type tasksByAssignee = assignee[];

export type incompleteTaskStatus = {
  [key: string]: number | null | undefined;
};

export type reportSummary = {
  taskCountSummary?: taskCountSummary;
  incompleteTaskStatus?: incompleteTaskStatus;
  tasksByAssignee?: tasksByAssignee;
};

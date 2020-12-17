import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: "Query";
  getMe: UserResponse;
  getUser: UserResponse;
  userSetting: UserResponse;
  projectsOfUser: ProjectListResponse;
  project: ProjectReturnType;
  reportSummary: ReportSummaryType;
  getBoards: BoardResponse;
  getSprint: SprintResponse;
  getSprints: SprintResponse;
  getStartedSprint: SprintResponse;
  getTask: TaskResponse;
  getLabels: LabelResponse;
};

export type QueryGetUserArgs = {
  id: Scalars["String"];
};

export type QueryProjectArgs = {
  projectId: Scalars["String"];
};

export type QueryReportSummaryArgs = {
  projectId: Scalars["String"];
};

export type QueryGetBoardsArgs = {
  projectId: Scalars["String"];
};

export type QueryGetSprintArgs = {
  id: Scalars["String"];
};

export type QueryGetSprintsArgs = {
  projectId: Scalars["String"];
};

export type QueryGetStartedSprintArgs = {
  projectId: Scalars["String"];
};

export type QueryGetTaskArgs = {
  projectId: Scalars["String"];
  id: Scalars["String"];
};

export type QueryGetLabelsArgs = {
  projectId: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  user?: Maybe<User>;
  error?: Maybe<FieldError>;
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  username: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  avatar?: Maybe<Scalars["String"]>;
  role?: Maybe<RoleTypes>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  projectPermissions: Array<ProjectPermission>;
  comment: Array<Comment>;
  userTask?: Maybe<Array<UserTask>>;
};

export enum RoleTypes {
  /** 일반 회원 */
  Member = "MEMBER",
  /** 데모 버전 - to be dep recated */
  Guest = "GUEST",
  /** 사내 관리자용 */
  Admin = "ADMIN",
}

export type ProjectPermission = {
  __typename?: "ProjectPermission";
  id?: Scalars["String"];
  isAdmin?: Maybe<Scalars["Boolean"]>;
  project?: Project;
  user?: User;
};

export type Project = {
  __typename?: "Project";
  id?: Scalars["String"];
  name?: Scalars["String"];
  logo?: Scalars["String"];
  createdAt?: Scalars["String"];
  updatedAt?: Scalars["String"];
  projectPermissions?: Maybe<Array<ProjectPermission>>;
  sprint?: Maybe<Array<Sprint>>;
  board?: Maybe<Array<Board>>;
  label?: Maybe<Array<Label>>;
  task?: Maybe<Array<Task>>;
};

export type Sprint = {
  __typename?: "Sprint";
  id: Scalars["String"];
  title: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  didStart?: Maybe<Scalars["Boolean"]>;
  isCompleted?: Maybe<Scalars["Boolean"]>;
  row: Scalars["Float"];
  dueDate?: Maybe<Scalars["String"]>;
  startedAt?: Maybe<Scalars["String"]>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  project: Project;
  sprintNotification: Array<SprintNotification>;
  task: Array<Task>;
};

export type SprintNotification = {
  __typename?: "SprintNotification";
  id: Scalars["String"];
  type: Description;
  isRead: Scalars["Boolean"];
  target?: Maybe<User>;
  project?: Maybe<Project>;
  sprint?: Maybe<Sprint>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export enum Description {
  /** notification for sprint START */
  SprintStart = "SPRINT_START",
  /** notification for sprint END */
  SprintEnd = "SPRINT_END",
}

export type Task = {
  __typename?: "Task";
  id: Scalars["String"];
  rootTaskId?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  taskIndex?: Scalars["Float"];
  boardRowIndex?: Maybe<Scalars["Float"]>;
  sprintRowIndex?: Scalars["Float"];
  completed?: Scalars["Boolean"];
  startDate?: Maybe<Scalars["String"]>;
  endDate?: Maybe<Scalars["String"]>;
  createdAt?: Scalars["String"];
  updatedAt?: Scalars["String"];
  comment?: Maybe<Array<Comment>>;
  file?: Maybe<Array<File>>;
  sprint?: Sprint;
  board?: Maybe<Board>;
  project?: Project;
  userTask?: Maybe<Array<UserTask>>;
  taskLabel?: Maybe<Array<TaskLabel>>;
};

export type Comment = {
  __typename?: "Comment";
  id: Scalars["String"];
  rootCommentId?: Maybe<Scalars["String"]>;
  task: Task;
  user?: Maybe<User>;
  content: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type File = {
  __typename?: "File";
  id: Scalars["String"];
  fileLink: Scalars["String"];
  task: Task;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Board = {
  __typename?: "Board";
  id: Scalars["String"];
  title: Scalars["String"];
  project?: Project;
  boardColumnIndex: Scalars["Float"];
  createdAt?: Scalars["String"];
  updatedAt?: Scalars["String"];
  task?: Maybe<Array<Task>>;
};

export type UserTask = {
  __typename?: "UserTask";
  id: Scalars["String"];
  task: Task;
  user: User;
};

export type TaskLabel = {
  __typename?: "TaskLabel";
  id: Scalars["String"];
  task: Task;
  label: Label;
};

export type Label = {
  __typename?: "Label";
  id: Scalars["String"];
  name: Scalars["String"];
  color: Scalars["String"];
  project: Project;
  taskLabel: Array<TaskLabel>;
};

export type FieldError = {
  __typename?: "FieldError";
  code: Scalars["String"];
  message: Scalars["String"];
  field?: Maybe<Scalars["String"]>;
};

export type ProjectListResponse = {
  __typename?: "ProjectListResponse";
  projects?: Maybe<Array<ProjectPermission>>;
  error?: Maybe<FieldError>;
};

export type ProjectReturnType = {
  __typename?: "ProjectReturnType";
  error?: Maybe<FieldError>;
  project?: Maybe<Project>;
  projects?: Maybe<Project>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type ReportSummaryType = {
  __typename?: "ReportSummaryType";
  taskCountSummary?: Maybe<TaskSummary>;
  tasksByAssignee?: Maybe<Array<TasksByAssignee>>;
  incompleteTaskStatus: Scalars["JSONObject"];
  error?: Maybe<FieldError>;
};

export type TaskSummary = {
  __typename?: "TaskSummary";
  totalTasksCount?: Maybe<Scalars["Int"]>;
  completedTasksCount?: Maybe<Scalars["Int"]>;
  incompleteTasksCount?: Maybe<Scalars["Int"]>;
  overdueTasksCount?: Maybe<Scalars["Int"]>;
  completedTasks?: Maybe<UserTask>;
  incompletedTasks?: Maybe<UserTask>;
  overdueTasks?: Maybe<UserTask>;
};

export type TasksByAssignee = {
  __typename?: "TasksByAssignee";
  totalTasksCount?: Maybe<Scalars["Int"]>;
  completedTasksCount?: Maybe<Scalars["Int"]>;
  incompleteTasksCount?: Maybe<Scalars["Int"]>;
  overdueTasksCount?: Maybe<Scalars["Int"]>;
  completedTasks?: Maybe<UserTask>;
  incompletedTasks?: Maybe<UserTask>;
  overdueTasks?: Maybe<UserTask>;
  userId?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  avatar?: Maybe<Scalars["String"]>;
};

export type BoardResponse = {
  __typename?: "BoardResponse";
  boards?: Maybe<Array<Board>>;
  error?: Maybe<FieldError>;
};

export type SprintResponse = {
  __typename?: "SprintResponse";
  sprint?: Maybe<Sprint>;
  sprints?: Maybe<Array<Sprint>>;
  error?: Maybe<FieldError>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type TaskResponse = {
  __typename?: "TaskResponse";
  task?: Maybe<Array<Task>>;
  error?: Maybe<FieldError>;
};

export type LabelResponse = {
  __typename?: "LabelResponse";
  label?: Maybe<Array<Label>>;
  error?: Maybe<FieldError>;
};

export type Mutation = {
  __typename?: "Mutation";
  createGuest: UserResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
  deleteAccount: DeleteResponse;
  updateUserSetting: UserResponse;
  createProject: ProjectReturnType;
  updateProjectName: ProjectReturnType;
  updateProjectPermission: ProjectPermissionReturnType;
  deleteProject: ProjectReturnType;
  inviteUser: ProjectReturnType;
  deleteMember: ProjectReturnType;
  routeInvitation: ProjectReturnType;
  createBoard: BoardResponse;
  updateBoard: BoardResponse;
  deleteBoard: BoardResponse;
  createSprint: SprintResponse;
  updateSprint: SprintResponse;
  deleteSprint: SprintResponse;
  readSprintNotification: SprintResponse;
  createTask: TaskResponse;
  updateTask: TaskResponse;
  deleteTask: TaskDeleteResponse;
  createTaskLabel: TaskLabelResponse;
  deleteTaskLabel: DeleteResponse;
  updateLabel: LabelResponse;
  deleteLabel: LabelDeleteResponse;
  createUserTask: UserTaskResponse;
  deleteUserTask: UserTaskDeleteResponse;
  createComment: CommentResponse;
  updateComment: CommentResponse;
  deleteComment: CommentDeleteResponse;
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationLoginArgs = {
  options: LoginInput;
};

export type MutationUpdateUserSettingArgs = {
  options: UserUpdateOptions;
};

export type MutationCreateProjectArgs = {
  name: Scalars["String"];
};

export type MutationUpdateProjectNameArgs = {
  projectId: Scalars["String"];
  name: Scalars["String"];
};

export type MutationUpdateProjectPermissionArgs = {
  projectId: Scalars["String"];
  isAdmin: Scalars["Boolean"];
  userId: Scalars["String"];
};

export type MutationDeleteProjectArgs = {
  projectId: Scalars["String"];
};

export type MutationInviteUserArgs = {
  projectId: Scalars["String"];
  emails: Array<Scalars["String"]>;
};

export type MutationDeleteMemberArgs = {
  projectId: Scalars["String"];
  userId: Scalars["String"];
};

export type MutationCreateBoardArgs = {
  projectId: Scalars["String"];
  title: Scalars["String"];
};

export type MutationUpdateBoardArgs = {
  projectId: Scalars["String"];
  options: BoardUpdateInput;
};

export type MutationDeleteBoardArgs = {
  projectId: Scalars["String"];
  newBoardId: Scalars["String"];
  id: Scalars["String"];
};

export type MutationCreateSprintArgs = {
  projectId: Scalars["String"];
  description: Scalars["String"];
  title: Scalars["String"];
};

export type MutationUpdateSprintArgs = {
  projectId: Scalars["String"];
  options: SprintOptionInput;
};

export type MutationDeleteSprintArgs = {
  id: Scalars["String"];
  projectId: Scalars["String"];
};

export type MutationReadSprintNotificationArgs = {
  id: Scalars["String"];
  projectId: Scalars["String"];
};

export type MutationCreateTaskArgs = {
  projectId: Scalars["String"];
  options: TaskCreateInput;
};

export type MutationUpdateTaskArgs = {
  projectId: Scalars["String"];
  options: TaskUpdateInput;
};

export type MutationDeleteTaskArgs = {
  projectId: Scalars["String"];
  id: Scalars["String"];
};

export type MutationCreateTaskLabelArgs = {
  projectId: Scalars["String"];
  color: Scalars["String"];
  name: Scalars["String"];
  taskId: Scalars["String"];
};

export type MutationDeleteTaskLabelArgs = {
  projectId: Scalars["String"];
  taskId: Scalars["String"];
  labelId: Scalars["String"];
};

export type MutationUpdateLabelArgs = {
  projectId: Scalars["String"];
  options: LabelUpdateInput;
  id: Scalars["String"];
};

export type MutationDeleteLabelArgs = {
  projectId: Scalars["String"];
  id: Scalars["String"];
};

export type MutationCreateUserTaskArgs = {
  projectId: Scalars["String"];
  taskId: Scalars["String"];
  userId: Scalars["String"];
};

export type MutationDeleteUserTaskArgs = {
  projectId: Scalars["String"];
  userId: Scalars["String"];
  taskId: Scalars["String"];
};

export type MutationCreateCommentArgs = {
  projectId: Scalars["String"];
  options: CommentCreateInput;
  taskId: Scalars["String"];
};

export type MutationUpdateCommentArgs = {
  projectId: Scalars["String"];
  content: Scalars["String"];
  id: Scalars["String"];
};

export type MutationDeleteCommentArgs = {
  projectId: Scalars["String"];
  id: Scalars["String"];
};

export type UsernamePasswordInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
  projectId?: Maybe<Scalars["String"]>;
};

export type LoginInput = {
  password: Scalars["String"];
  email: Scalars["String"];
  projectId?: Maybe<Scalars["String"]>;
};

export type DeleteResponse = {
  __typename?: "DeleteResponse";
  success?: Maybe<Scalars["Boolean"]>;
  error?: Maybe<FieldError>;
};

export type UserUpdateOptions = {
  username?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
};

export type ProjectPermissionReturnType = {
  __typename?: "ProjectPermissionReturnType";
  error?: Maybe<FieldError>;
  project?: Maybe<Project>;
  projects?: Maybe<Project>;
  success?: Maybe<Scalars["Boolean"]>;
  projectPermission?: Maybe<ProjectPermission>;
};

export type BoardUpdateInput = {
  id: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  boardColumnIndex?: Maybe<Scalars["Float"]>;
};

export type SprintOptionInput = {
  id: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  didStart?: Maybe<Scalars["Boolean"]>;
  isCompleted?: Maybe<Scalars["Boolean"]>;
  row?: Maybe<Scalars["Float"]>;
  dueDate?: Maybe<Scalars["DateTime"]>;
  startedAt?: Maybe<Scalars["DateTime"]>;
};

export type TaskCreateInput = {
  rootTaskId?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  sprintId: Scalars["String"];
  boardId?: Maybe<Scalars["String"]>;
};

export type TaskUpdateInput = {
  id: Scalars["String"];
  rootTaskId?: Maybe<Scalars["String"]>;
  boardRowIndex?: Maybe<Scalars["Float"]>;
  sprintRowIndex?: Maybe<Scalars["Float"]>;
  sprintId?: Maybe<Scalars["String"]>;
  boardId?: Maybe<Scalars["String"]>;
  newBoardRowIndex?: Maybe<Scalars["Float"]>;
  newSprintRowIndex?: Maybe<Scalars["Float"]>;
  basicOptions?: Maybe<TaskBasicOption>;
};

export type TaskBasicOption = {
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  startDate?: Maybe<Scalars["String"]>;
  endDate?: Maybe<Scalars["String"]>;
};

export type TaskDeleteResponse = {
  __typename?: "TaskDeleteResponse";
  success?: Maybe<Scalars["Boolean"]>;
  error?: Maybe<FieldError>;
};

export type TaskLabelResponse = {
  __typename?: "TaskLabelResponse";
  taskLabel?: Maybe<Array<TaskLabel>>;
  error?: Maybe<FieldError>;
};

export type LabelUpdateInput = {
  name?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["String"]>;
};

export type LabelDeleteResponse = {
  __typename?: "LabelDeleteResponse";
  success?: Maybe<Scalars["Boolean"]>;
  error?: Maybe<FieldError>;
};

export type UserTaskResponse = {
  __typename?: "UserTaskResponse";
  userTask?: Maybe<Array<UserTask>>;
  error?: Maybe<FieldError>;
};

export type UserTaskDeleteResponse = {
  __typename?: "UserTaskDeleteResponse";
  success?: Maybe<Scalars["Boolean"]>;
  error?: Maybe<FieldError>;
};

export type CommentResponse = {
  __typename?: "CommentResponse";
  comment?: Maybe<Array<Comment>>;
  error?: Maybe<FieldError>;
};

export type CommentCreateInput = {
  content: Scalars["String"];
  rootCommentId?: Maybe<Scalars["String"]>;
};

export type CommentDeleteResponse = {
  __typename?: "CommentDeleteResponse";
  success?: Maybe<Scalars["Boolean"]>;
  error?: Maybe<FieldError>;
};

export type RouteInvitationMutationVariables = Exact<{ [key: string]: never }>;

export type RouteInvitationMutation = { __typename?: "Mutation" } & {
  routeInvitation: { __typename?: "ProjectReturnType" } & Pick<
    ProjectReturnType,
    "success"
  > & {
      error?: Maybe<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "code">
      >;
    };
};

export type CreateBoardMutationVariables = Exact<{
  title: Scalars["String"];
  projectId: Scalars["String"];
}>;

export type CreateBoardMutation = { __typename?: "Mutation" } & {
  createBoard: { __typename?: "BoardResponse" } & {
    boards?: Maybe<
      Array<
        { __typename?: "Board" } & Pick<
          Board,
          "id" | "title" | "boardColumnIndex"
        > & {
            task?: Maybe<
              Array<
                { __typename?: "Task" } & Pick<
                  Task,
                  | "id"
                  | "title"
                  | "boardRowIndex"
                  | "sprintRowIndex"
                  | "taskIndex"
                  | "startDate"
                  | "endDate"
                > & {
                    userTask?: Maybe<
                      Array<
                        { __typename?: "UserTask" } & {
                          user: { __typename?: "User" } & Pick<
                            User,
                            "id" | "username" | "avatar"
                          >;
                        }
                      >
                    >;
                    taskLabel?: Maybe<
                      Array<
                        { __typename?: "TaskLabel" } & {
                          label: { __typename?: "Label" } & Pick<
                            Label,
                            "id" | "name" | "color"
                          >;
                        }
                      >
                    >;
                  }
              >
            >;
          }
      >
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "message" | "code" | "field"
      >
    >;
  };
};

export type CreateCommentMutationVariables = Exact<{
  taskId: Scalars["String"];
  options: CommentCreateInput;
  projectId: Scalars["String"];
}>;

export type CreateCommentMutation = { __typename?: "Mutation" } & {
  createComment: { __typename?: "CommentResponse" } & {
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "field" | "message" | "code"
      >
    >;
    comment?: Maybe<
      Array<
        { __typename?: "Comment" } & Pick<
          Comment,
          "id" | "rootCommentId" | "content" | "createdAt"
        > & {
            user?: Maybe<
              { __typename?: "User" } & Pick<User, "username" | "avatar" | "id">
            >;
            task: { __typename?: "Task" } & Pick<Task, "id" | "title">;
          }
      >
    >;
  };
};

export type CreateGuestMutationVariables = Exact<{ [key: string]: never }>;

export type CreateGuestMutation = { __typename?: "Mutation" } & {
  createGuest: { __typename?: "UserResponse" } & {
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "field" | "message" | "code"
      >
    >;
    user?: Maybe<
      { __typename?: "User" } & Pick<User, "id" | "username" | "role">
    >;
  };
};

export type CreateProjectMutationVariables = Exact<{
  name: Scalars["String"];
}>;

export type CreateProjectMutation = { __typename?: "Mutation" } & {
  createProject: { __typename?: "ProjectReturnType" } & {
    project?: Maybe<{ __typename?: "Project" } & Pick<Project, "id" | "name">>;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "code" | "message" | "field"
      >
    >;
  };
};

export type CreateSprintMutationVariables = Exact<{
  projectId: Scalars["String"];
  title: Scalars["String"];
  description: Scalars["String"];
}>;

export type CreateSprintMutation = { __typename?: "Mutation" } & {
  createSprint: { __typename?: "SprintResponse" } & {
    sprint?: Maybe<
      { __typename?: "Sprint" } & Pick<
        Sprint,
        "id" | "title" | "description" | "row"
      >
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "message" | "code" | "field"
      >
    >;
  };
};

export type CreateTaskMutationVariables = Exact<{
  options: TaskCreateInput;
  projectId: Scalars["String"];
}>;

export type CreateTaskMutation = { __typename?: "Mutation" } & {
  createTask: { __typename?: "TaskResponse" } & {
    task?: Maybe<
      Array<
        { __typename?: "Task" } & Pick<
          Task,
          | "id"
          | "title"
          | "description"
          | "startDate"
          | "endDate"
          | "taskIndex"
          | "completed"
        > & {
            board?: Maybe<
              { __typename?: "Board" } & Pick<Board, "id" | "title">
            >;
            sprint: { __typename?: "Sprint" } & Pick<Sprint, "id" | "title">;
            file?: Maybe<
              Array<{ __typename?: "File" } & Pick<File, "fileLink">>
            >;
            comment?: Maybe<
              Array<
                { __typename?: "Comment" } & Pick<Comment, "content"> & {
                    user?: Maybe<
                      { __typename?: "User" } & Pick<User, "id" | "username">
                    >;
                  }
              >
            >;
            taskLabel?: Maybe<
              Array<
                { __typename?: "TaskLabel" } & {
                  label: { __typename?: "Label" } & Pick<
                    Label,
                    "name" | "id" | "color"
                  >;
                }
              >
            >;
            userTask?: Maybe<
              Array<
                { __typename?: "UserTask" } & {
                  user: { __typename?: "User" } & Pick<User, "id" | "username">;
                }
              >
            >;
          }
      >
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "message" | "code" | "field"
      >
    >;
  };
};

export type CreateTaskLabelMutationVariables = Exact<{
  taskId: Scalars["String"];
  name: Scalars["String"];
  color: Scalars["String"];
  projectId: Scalars["String"];
}>;

export type CreateTaskLabelMutation = { __typename?: "Mutation" } & {
  createTaskLabel: { __typename?: "TaskLabelResponse" } & {
    taskLabel?: Maybe<
      Array<
        { __typename?: "TaskLabel" } & Pick<TaskLabel, "id"> & {
            task: { __typename?: "Task" } & Pick<Task, "id" | "title">;
            label: { __typename?: "Label" } & Pick<Label, "id" | "name">;
          }
      >
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "code" | "field" | "message"
      >
    >;
  };
};

export type CreateUserTaskMutationVariables = Exact<{
  userId: Scalars["String"];
  taskId: Scalars["String"];
  projectId: Scalars["String"];
}>;

export type CreateUserTaskMutation = { __typename?: "Mutation" } & {
  createUserTask: { __typename?: "UserTaskResponse" } & {
    userTask?: Maybe<
      Array<
        { __typename?: "UserTask" } & Pick<UserTask, "id"> & {
            user: { __typename?: "User" } & Pick<
              User,
              "username" | "avatar" | "id"
            >;
            task: { __typename?: "Task" } & Pick<Task, "id" | "title">;
          }
      >
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "code" | "field" | "message"
      >
    >;
  };
};

export type DeleteBoardMutationVariables = Exact<{
  id: Scalars["String"];
  newBoardId: Scalars["String"];
  projectId: Scalars["String"];
}>;

export type DeleteBoardMutation = { __typename?: "Mutation" } & {
  deleteBoard: { __typename?: "BoardResponse" } & {
    boards?: Maybe<
      Array<
        { __typename?: "Board" } & Pick<
          Board,
          "id" | "title" | "boardColumnIndex"
        > & {
            task?: Maybe<
              Array<
                { __typename?: "Task" } & Pick<
                  Task,
                  | "id"
                  | "title"
                  | "boardRowIndex"
                  | "sprintRowIndex"
                  | "taskIndex"
                  | "startDate"
                  | "endDate"
                > & {
                    userTask?: Maybe<
                      Array<
                        { __typename?: "UserTask" } & {
                          user: { __typename?: "User" } & Pick<
                            User,
                            "id" | "username" | "avatar"
                          >;
                        }
                      >
                    >;
                    taskLabel?: Maybe<
                      Array<
                        { __typename?: "TaskLabel" } & {
                          label: { __typename?: "Label" } & Pick<
                            Label,
                            "id" | "name" | "color"
                          >;
                        }
                      >
                    >;
                  }
              >
            >;
          }
      >
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "message" | "code" | "field"
      >
    >;
  };
};

export type DeleteCommentMutationVariables = Exact<{
  projectId: Scalars["String"];
  id: Scalars["String"];
}>;

export type DeleteCommentMutation = { __typename?: "Mutation" } & {
  deleteComment: { __typename?: "CommentDeleteResponse" } & Pick<
    CommentDeleteResponse,
    "success"
  > & {
      error?: Maybe<
        { __typename?: "FieldError" } & Pick<
          FieldError,
          "code" | "field" | "message"
        >
      >;
    };
};

export type DeleteLabelMutationVariables = Exact<{
  projectId: Scalars["String"];
  id: Scalars["String"];
}>;

export type DeleteLabelMutation = { __typename?: "Mutation" } & {
  deleteLabel: { __typename?: "LabelDeleteResponse" } & Pick<
    LabelDeleteResponse,
    "success"
  > & {
      error?: Maybe<
        { __typename?: "FieldError" } & Pick<
          FieldError,
          "code" | "field" | "message"
        >
      >;
    };
};

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars["String"];
}>;

export type DeleteProjectMutation = { __typename?: "Mutation" } & {
  deleteProject: { __typename?: "ProjectReturnType" } & Pick<
    ProjectReturnType,
    "success"
  > & {
      error?: Maybe<
        { __typename?: "FieldError" } & Pick<
          FieldError,
          "message" | "code" | "field"
        >
      >;
    };
};

export type DeleteSprintMutationVariables = Exact<{
  id: Scalars["String"];
  projectId: Scalars["String"];
}>;

export type DeleteSprintMutation = { __typename?: "Mutation" } & {
  deleteSprint: { __typename?: "SprintResponse" } & Pick<
    SprintResponse,
    "success"
  > & {
      error?: Maybe<
        { __typename?: "FieldError" } & Pick<
          FieldError,
          "code" | "field" | "message"
        >
      >;
    };
};

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars["String"];
  projectId: Scalars["String"];
}>;

export type DeleteTaskMutation = { __typename?: "Mutation" } & {
  deleteTask: { __typename?: "TaskDeleteResponse" } & Pick<
    TaskDeleteResponse,
    "success"
  > & {
      error?: Maybe<
        { __typename?: "FieldError" } & Pick<
          FieldError,
          "message" | "code" | "field"
        >
      >;
    };
};

export type DeleteUserTaskMutationVariables = Exact<{
  userId: Scalars["String"];
  taskId: Scalars["String"];
  projectId: Scalars["String"];
}>;

export type DeleteUserTaskMutation = { __typename?: "Mutation" } & {
  deleteUserTask: { __typename?: "UserTaskDeleteResponse" } & Pick<
    UserTaskDeleteResponse,
    "success"
  > & {
      error?: Maybe<
        { __typename?: "FieldError" } & Pick<
          FieldError,
          "message" | "code" | "field"
        >
      >;
    };
};

export type InviteUserMutationVariables = Exact<{
  projectId: Scalars["String"];
  emails: Array<Scalars["String"]>;
}>;

export type InviteUserMutation = { __typename?: "Mutation" } & {
  inviteUser: { __typename?: "ProjectReturnType" } & Pick<
    ProjectReturnType,
    "success"
  > & {
      error?: Maybe<
        { __typename?: "FieldError" } & Pick<
          FieldError,
          "code" | "message" | "field"
        >
      >;
    };
};

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & {
    user?: Maybe<{ __typename?: "User" } & Pick<User, "email" | "role">>;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "code" | "field" | "message"
      >
    >;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & {
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "message" | "field" | "code"
      >
    >;
    user?: Maybe<
      { __typename?: "User" } & Pick<User, "username" | "email" | "id">
    >;
  };
};

export type UpdateBoardMutationVariables = Exact<{
  options: BoardUpdateInput;
  projectId: Scalars["String"];
}>;

export type UpdateBoardMutation = { __typename?: "Mutation" } & {
  updateBoard: { __typename?: "BoardResponse" } & {
    boards?: Maybe<
      Array<
        { __typename?: "Board" } & Pick<
          Board,
          "id" | "title" | "boardColumnIndex"
        > & {
            task?: Maybe<
              Array<
                { __typename?: "Task" } & Pick<
                  Task,
                  | "id"
                  | "title"
                  | "boardRowIndex"
                  | "sprintRowIndex"
                  | "taskIndex"
                  | "startDate"
                  | "endDate"
                > & {
                    userTask?: Maybe<
                      Array<
                        { __typename?: "UserTask" } & {
                          user: { __typename?: "User" } & Pick<
                            User,
                            "id" | "username" | "avatar"
                          >;
                        }
                      >
                    >;
                    taskLabel?: Maybe<
                      Array<
                        { __typename?: "TaskLabel" } & {
                          label: { __typename?: "Label" } & Pick<
                            Label,
                            "id" | "name" | "color"
                          >;
                        }
                      >
                    >;
                  }
              >
            >;
          }
      >
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "message" | "code" | "field"
      >
    >;
  };
};

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars["String"];
  content: Scalars["String"];
  projectId: Scalars["String"];
}>;

export type UpdateCommentMutation = { __typename?: "Mutation" } & {
  updateComment: { __typename?: "CommentResponse" } & {
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "field" | "message" | "code"
      >
    >;
    comment?: Maybe<
      Array<
        { __typename?: "Comment" } & Pick<
          Comment,
          "id" | "rootCommentId" | "content" | "createdAt"
        > & {
            task: { __typename?: "Task" } & Pick<Task, "id" | "title">;
            user?: Maybe<
              { __typename?: "User" } & Pick<User, "id" | "username">
            >;
          }
      >
    >;
  };
};

export type UpdateLabelMutationVariables = Exact<{
  projectId: Scalars["String"];
  options: LabelUpdateInput;
  id: Scalars["String"];
}>;

export type UpdateLabelMutation = { __typename?: "Mutation" } & {
  updateLabel: { __typename?: "LabelResponse" } & {
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "code" | "field" | "message"
      >
    >;
    label?: Maybe<
      Array<{ __typename?: "Label" } & Pick<Label, "id" | "name" | "color">>
    >;
  };
};

export type UpdateProjectNameMutationVariables = Exact<{
  name: Scalars["String"];
  projectId: Scalars["String"];
}>;

export type UpdateProjectNameMutation = { __typename?: "Mutation" } & {
  updateProjectName: { __typename?: "ProjectReturnType" } & Pick<
    ProjectReturnType,
    "success"
  > & {
      project?: Maybe<
        { __typename?: "Project" } & Pick<Project, "id" | "name">
      >;
      error?: Maybe<
        { __typename?: "FieldError" } & Pick<
          FieldError,
          "code" | "message" | "field"
        >
      >;
    };
};

export type UpdateProjectPermissionMutationVariables = Exact<{
  userId: Scalars["String"];
  isAdmin: Scalars["Boolean"];
  projectId: Scalars["String"];
}>;

export type UpdateProjectPermissionMutation = { __typename?: "Mutation" } & {
  updateProjectPermission: {
    __typename?: "ProjectPermissionReturnType";
  } & Pick<ProjectPermissionReturnType, "success"> & {
      projectPermission?: Maybe<
        { __typename?: "ProjectPermission" } & Pick<ProjectPermission, "id"> & {
            project: { __typename?: "Project" } & Pick<Project, "id" | "name">;
          }
      >;
      error?: Maybe<
        { __typename?: "FieldError" } & Pick<
          FieldError,
          "code" | "message" | "field"
        >
      >;
    };
};

export type UpdateSprintMutationVariables = Exact<{
  projectId: Scalars["String"];
  options: SprintOptionInput;
}>;

export type UpdateSprintMutation = { __typename?: "Mutation" } & {
  updateSprint: { __typename?: "SprintResponse" } & Pick<
    SprintResponse,
    "success"
  > & {
      sprint?: Maybe<
        { __typename?: "Sprint" } & Pick<
          Sprint,
          | "title"
          | "description"
          | "didStart"
          | "isCompleted"
          | "row"
          | "dueDate"
          | "startedAt"
        >
      >;
      error?: Maybe<
        { __typename?: "FieldError" } & Pick<
          FieldError,
          "code" | "field" | "message"
        >
      >;
    };
};

export type UpdateTaskMutationVariables = Exact<{
  options: TaskUpdateInput;
  projectId: Scalars["String"];
}>;

export type UpdateTaskMutation = { __typename?: "Mutation" } & {
  updateTask: { __typename?: "TaskResponse" } & {
    task?: Maybe<
      Array<
        { __typename?: "Task" } & Pick<
          Task,
          | "id"
          | "title"
          | "description"
          | "startDate"
          | "endDate"
          | "taskIndex"
          | "completed"
        > & {
            board?: Maybe<
              { __typename?: "Board" } & Pick<Board, "id" | "title">
            >;
            sprint: { __typename?: "Sprint" } & Pick<Sprint, "id" | "title">;
            file?: Maybe<
              Array<{ __typename?: "File" } & Pick<File, "fileLink">>
            >;
            comment?: Maybe<
              Array<
                { __typename?: "Comment" } & Pick<Comment, "content"> & {
                    user?: Maybe<
                      { __typename?: "User" } & Pick<User, "id" | "username">
                    >;
                  }
              >
            >;
            taskLabel?: Maybe<
              Array<
                { __typename?: "TaskLabel" } & {
                  label: { __typename?: "Label" } & Pick<
                    Label,
                    "name" | "id" | "color"
                  >;
                }
              >
            >;
            userTask?: Maybe<
              Array<
                { __typename?: "UserTask" } & {
                  user: { __typename?: "User" } & Pick<User, "id" | "username">;
                }
              >
            >;
          }
      >
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "message" | "code" | "field"
      >
    >;
  };
};

export type UpdateUserSettingMutationVariables = Exact<{
  username?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
}>;

export type UpdateUserSettingMutation = { __typename?: "Mutation" } & {
  updateUserSetting: { __typename?: "UserResponse" } & {
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "message" | "code" | "field"
      >
    >;
  };
};

export type GetBoardsQueryVariables = Exact<{
  projectId: Scalars["String"];
}>;

export type GetBoardsQuery = { __typename?: "Query" } & {
  getBoards: { __typename?: "BoardResponse" } & {
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "code" | "message" | "field"
      >
    >;
    boards?: Maybe<
      Array<
        { __typename?: "Board" } & Pick<
          Board,
          "id" | "title" | "boardColumnIndex"
        > & {
            task?: Maybe<
              Array<
                { __typename?: "Task" } & Pick<
                  Task,
                  | "id"
                  | "title"
                  | "boardRowIndex"
                  | "sprintRowIndex"
                  | "taskIndex"
                  | "startDate"
                  | "endDate"
                > & {
                    userTask?: Maybe<
                      Array<
                        { __typename?: "UserTask" } & {
                          user: { __typename?: "User" } & Pick<
                            User,
                            "id" | "username" | "avatar"
                          >;
                        }
                      >
                    >;
                    taskLabel?: Maybe<
                      Array<
                        { __typename?: "TaskLabel" } & {
                          label: { __typename?: "Label" } & Pick<
                            Label,
                            "id" | "name" | "color"
                          >;
                        }
                      >
                    >;
                  }
              >
            >;
          }
      >
    >;
  };
};

export type GetLabelsQueryVariables = Exact<{
  projectId: Scalars["String"];
}>;

export type GetLabelsQuery = { __typename?: "Query" } & {
  getLabels: { __typename?: "LabelResponse" } & {
    label?: Maybe<
      Array<{ __typename?: "Label" } & Pick<Label, "id" | "color" | "name">>
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "code" | "message" | "field"
      >
    >;
  };
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = { __typename?: "Query" } & {
  getMe: { __typename?: "UserResponse" } & {
    user?: Maybe<
      { __typename?: "User" } & Pick<
        User,
        "id" | "username" | "email" | "avatar"
      > & {
          projectPermissions: Array<
            { __typename?: "ProjectPermission" } & {
              project: { __typename?: "Project" } & Pick<
                Project,
                "id" | "name"
              >;
            }
          >;
          userTask?: Maybe<
            Array<
              { __typename?: "UserTask" } & {
                task: { __typename?: "Task" } & Pick<Task, "id" | "title"> & {
                    board?: Maybe<
                      { __typename?: "Board" } & Pick<Board, "title">
                    >;
                    project: { __typename?: "Project" } & Pick<Project, "id">;
                  };
              }
            >
          >;
        }
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "code" | "message" | "field"
      >
    >;
  };
};

export type GetProjectQueryVariables = Exact<{
  projectId: Scalars["String"];
}>;

export type GetProjectQuery = { __typename?: "Query" } & {
  project: { __typename?: "ProjectReturnType" } & {
    project?: Maybe<
      { __typename?: "Project" } & Pick<
        Project,
        "id" | "name" | "createdAt" | "updatedAt"
      > & {
          projectPermissions?: Maybe<
            Array<
              { __typename?: "ProjectPermission" } & Pick<
                ProjectPermission,
                "id" | "isAdmin"
              > & {
                  user: { __typename?: "User" } & Pick<
                    User,
                    "id" | "username" | "email" | "role" | "avatar"
                  >;
                }
            >
          >;
          sprint?: Maybe<
            Array<{ __typename?: "Sprint" } & Pick<Sprint, "title" | "id">>
          >;
          board?: Maybe<
            Array<{ __typename?: "Board" } & Pick<Board, "id" | "title">>
          >;
          label?: Maybe<
            Array<
              { __typename?: "Label" } & Pick<Label, "id" | "name" | "color">
            >
          >;
        }
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "code" | "message" | "field"
      >
    >;
  };
};

export type GetReportSummaryQueryVariables = Exact<{
  projectId: Scalars["String"];
}>;

export type GetReportSummaryQuery = { __typename?: "Query" } & {
  reportSummary: { __typename?: "ReportSummaryType" } & Pick<
    ReportSummaryType,
    "incompleteTaskStatus"
  > & {
      taskCountSummary?: Maybe<
        { __typename?: "TaskSummary" } & Pick<
          TaskSummary,
          | "overdueTasksCount"
          | "completedTasksCount"
          | "incompleteTasksCount"
          | "totalTasksCount"
        >
      >;
      tasksByAssignee?: Maybe<
        Array<
          { __typename?: "TasksByAssignee" } & Pick<
            TasksByAssignee,
            | "userId"
            | "username"
            | "avatar"
            | "totalTasksCount"
            | "incompleteTasksCount"
            | "completedTasksCount"
            | "overdueTasksCount"
          >
        >
      >;
      error?: Maybe<
        { __typename?: "FieldError" } & Pick<
          FieldError,
          "code" | "message" | "field"
        >
      >;
    };
};

export type GetSprintQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetSprintQuery = { __typename?: "Query" } & {
  getSprint: { __typename?: "SprintResponse" } & {
    sprint?: Maybe<
      { __typename?: "Sprint" } & Pick<Sprint, "title" | "description"> & {
          task: Array<
            { __typename?: "Task" } & Pick<
              Task,
              | "id"
              | "taskIndex"
              | "sprintRowIndex"
              | "title"
              | "description"
              | "completed"
              | "startDate"
              | "endDate"
              | "createdAt"
              | "updatedAt"
            > & {
                board?: Maybe<
                  { __typename?: "Board" } & Pick<Board, "id" | "title">
                >;
                userTask?: Maybe<
                  Array<
                    { __typename?: "UserTask" } & {
                      user: { __typename?: "User" } & Pick<
                        User,
                        "avatar" | "username" | "email" | "role"
                      >;
                    }
                  >
                >;
              }
          >;
        }
    >;
  };
};

export type GetSprintsQueryVariables = Exact<{
  projectId: Scalars["String"];
}>;

export type GetSprintsQuery = { __typename?: "Query" } & {
  getSprints: { __typename?: "SprintResponse" } & {
    sprints?: Maybe<
      Array<
        { __typename?: "Sprint" } & Pick<
          Sprint,
          | "id"
          | "title"
          | "description"
          | "row"
          | "dueDate"
          | "startedAt"
          | "didStart"
          | "isCompleted"
        > & {
            task: Array<
              { __typename?: "Task" } & Pick<
                Task,
                | "id"
                | "title"
                | "description"
                | "taskIndex"
                | "sprintRowIndex"
                | "completed"
                | "startDate"
                | "endDate"
                | "createdAt"
                | "updatedAt"
              > & {
                  userTask?: Maybe<
                    Array<
                      { __typename?: "UserTask" } & {
                        user: { __typename?: "User" } & Pick<
                          User,
                          "username" | "email" | "avatar" | "role"
                        >;
                      }
                    >
                  >;
                  board?: Maybe<
                    { __typename?: "Board" } & Pick<
                      Board,
                      "id" | "title" | "createdAt" | "updatedAt"
                    >
                  >;
                }
            >;
          }
      >
    >;
  };
};

export type SetStartedSprintQueryVariables = Exact<{
  projectId: Scalars["String"];
}>;

export type SetStartedSprintQuery = { __typename?: "Query" } & {
  getStartedSprint: { __typename?: "SprintResponse" } & {
    sprint?: Maybe<{ __typename?: "Sprint" } & Pick<Sprint, "id" | "title">>;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "code" | "message" | "field"
      >
    >;
  };
};

export type GetTaskQueryVariables = Exact<{
  projectId: Scalars["String"];
  id: Scalars["String"];
}>;

export type GetTaskQuery = { __typename?: "Query" } & {
  getTask: { __typename?: "TaskResponse" } & {
    task?: Maybe<
      Array<
        { __typename?: "Task" } & Pick<
          Task,
          | "id"
          | "title"
          | "description"
          | "startDate"
          | "endDate"
          | "taskIndex"
          | "completed"
        > & {
            board?: Maybe<
              { __typename?: "Board" } & Pick<Board, "id" | "title">
            >;
            sprint: { __typename?: "Sprint" } & Pick<
              Sprint,
              "id" | "title" | "didStart"
            >;
            file?: Maybe<
              Array<{ __typename?: "File" } & Pick<File, "id" | "fileLink">>
            >;
            comment?: Maybe<
              Array<
                { __typename?: "Comment" } & Pick<
                  Comment,
                  "id" | "content" | "createdAt"
                > & {
                    user?: Maybe<
                      { __typename?: "User" } & Pick<
                        User,
                        "id" | "username" | "email"
                      >
                    >;
                  }
              >
            >;
            taskLabel?: Maybe<
              Array<
                { __typename?: "TaskLabel" } & Pick<TaskLabel, "id"> & {
                    label: { __typename?: "Label" } & Pick<
                      Label,
                      "name" | "id" | "color"
                    >;
                  }
              >
            >;
            userTask?: Maybe<
              Array<
                { __typename?: "UserTask" } & Pick<UserTask, "id"> & {
                    user: { __typename?: "User" } & Pick<
                      User,
                      "email" | "id" | "username"
                    >;
                  }
              >
            >;
          }
      >
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "message" | "code" | "field"
      >
    >;
  };
};

export const RouteInvitationDocument = gql`
  mutation RouteInvitation {
    routeInvitation {
      success
      error {
        field
        code
      }
    }
  }
`;
export type RouteInvitationMutationFn = Apollo.MutationFunction<
  RouteInvitationMutation,
  RouteInvitationMutationVariables
>;

/**
 * __useRouteInvitationMutation__
 *
 * To run a mutation, you first call `useRouteInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRouteInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [routeInvitationMutation, { data, loading, error }] = useRouteInvitationMutation({
 *   variables: {
 *   },
 * });
 */
export function useRouteInvitationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RouteInvitationMutation,
    RouteInvitationMutationVariables
  >
) {
  return Apollo.useMutation<
    RouteInvitationMutation,
    RouteInvitationMutationVariables
  >(RouteInvitationDocument, baseOptions);
}
export type RouteInvitationMutationHookResult = ReturnType<
  typeof useRouteInvitationMutation
>;
export type RouteInvitationMutationResult = Apollo.MutationResult<RouteInvitationMutation>;
export type RouteInvitationMutationOptions = Apollo.BaseMutationOptions<
  RouteInvitationMutation,
  RouteInvitationMutationVariables
>;
export const CreateBoardDocument = gql`
  mutation CreateBoard($title: String!, $projectId: String!) {
    createBoard(title: $title, projectId: $projectId) {
      boards {
        id
        title
        boardColumnIndex
        task {
          id
          title
          boardRowIndex
          sprintRowIndex
          taskIndex
          startDate
          endDate
          userTask {
            user {
              id
              username
              avatar
            }
          }
          taskLabel {
            label {
              id
              name
              color
            }
          }
        }
      }
      error {
        message
        code
        field
      }
    }
  }
`;
export type CreateBoardMutationFn = Apollo.MutationFunction<
  CreateBoardMutation,
  CreateBoardMutationVariables
>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      title: // value for 'title'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCreateBoardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBoardMutation,
    CreateBoardMutationVariables
  >
) {
  return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
    CreateBoardDocument,
    baseOptions
  );
}
export type CreateBoardMutationHookResult = ReturnType<
  typeof useCreateBoardMutation
>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<
  CreateBoardMutation,
  CreateBoardMutationVariables
>;
export const CreateCommentDocument = gql`
  mutation CreateComment(
    $taskId: String!
    $options: CommentCreateInput!
    $projectId: String!
  ) {
    createComment(taskId: $taskId, options: $options, projectId: $projectId) {
      error {
        field
        message
        code
      }
      comment {
        id
        rootCommentId
        user {
          username
          avatar
          id
        }
        task {
          id
          title
        }
        content
        createdAt
      }
    }
  }
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      options: // value for 'options'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, baseOptions);
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const CreateGuestDocument = gql`
  mutation CreateGuest {
    createGuest {
      error {
        field
        message
        code
      }
      user {
        id
        username
        role
      }
    }
  }
`;
export type CreateGuestMutationFn = Apollo.MutationFunction<
  CreateGuestMutation,
  CreateGuestMutationVariables
>;

/**
 * __useCreateGuestMutation__
 *
 * To run a mutation, you first call `useCreateGuestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGuestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGuestMutation, { data, loading, error }] = useCreateGuestMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateGuestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGuestMutation,
    CreateGuestMutationVariables
  >
) {
  return Apollo.useMutation<CreateGuestMutation, CreateGuestMutationVariables>(
    CreateGuestDocument,
    baseOptions
  );
}
export type CreateGuestMutationHookResult = ReturnType<
  typeof useCreateGuestMutation
>;
export type CreateGuestMutationResult = Apollo.MutationResult<CreateGuestMutation>;
export type CreateGuestMutationOptions = Apollo.BaseMutationOptions<
  CreateGuestMutation,
  CreateGuestMutationVariables
>;
export const CreateProjectDocument = gql`
  mutation CreateProject($name: String!) {
    createProject(name: "hello") {
      project {
        id
        name
      }
      error {
        code
        message
        field
      }
      project {
        id
        name
      }
      error {
        code
        message
        field
      }
    }
  }
`;
export type CreateProjectMutationFn = Apollo.MutationFunction<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CreateProjectDocument, baseOptions);
}
export type CreateProjectMutationHookResult = ReturnType<
  typeof useCreateProjectMutation
>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;
export const CreateSprintDocument = gql`
  mutation CreateSprint(
    $projectId: String!
    $title: String!
    $description: String!
  ) {
    createSprint(
      projectId: $projectId
      title: $title
      description: $description
    ) {
      sprint {
        id
        title
        description
        row
      }
      error {
        message
        code
        field
      }
    }
  }
`;
export type CreateSprintMutationFn = Apollo.MutationFunction<
  CreateSprintMutation,
  CreateSprintMutationVariables
>;

/**
 * __useCreateSprintMutation__
 *
 * To run a mutation, you first call `useCreateSprintMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSprintMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSprintMutation, { data, loading, error }] = useCreateSprintMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateSprintMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSprintMutation,
    CreateSprintMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateSprintMutation,
    CreateSprintMutationVariables
  >(CreateSprintDocument, baseOptions);
}
export type CreateSprintMutationHookResult = ReturnType<
  typeof useCreateSprintMutation
>;
export type CreateSprintMutationResult = Apollo.MutationResult<CreateSprintMutation>;
export type CreateSprintMutationOptions = Apollo.BaseMutationOptions<
  CreateSprintMutation,
  CreateSprintMutationVariables
>;
export const CreateTaskDocument = gql`
  mutation CreateTask($options: TaskCreateInput!, $projectId: String!) {
    createTask(options: $options, projectId: $projectId) {
      task {
        id
        title
        description
        startDate
        endDate
        taskIndex
        completed
        board {
          id
          title
        }
        sprint {
          id
          title
        }
        file {
          fileLink
        }
        comment {
          content
          user {
            id
            username
          }
        }
        taskLabel {
          label {
            name
            id
            color
          }
        }
        userTask {
          user {
            id
            username
          }
        }
      }
      error {
        message
        code
        field
      }
    }
  }
`;
export type CreateTaskMutationFn = Apollo.MutationFunction<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      options: // value for 'options'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCreateTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >
) {
  return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(
    CreateTaskDocument,
    baseOptions
  );
}
export type CreateTaskMutationHookResult = ReturnType<
  typeof useCreateTaskMutation
>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;
export const CreateTaskLabelDocument = gql`
  mutation CreateTaskLabel(
    $taskId: String!
    $name: String!
    $color: String!
    $projectId: String!
  ) {
    createTaskLabel(
      taskId: $taskId
      name: $name
      color: $color
      projectId: $projectId
    ) {
      taskLabel {
        id
        task {
          id
          title
        }
        label {
          id
          name
        }
      }
      error {
        code
        field
        message
      }
    }
  }
`;
export type CreateTaskLabelMutationFn = Apollo.MutationFunction<
  CreateTaskLabelMutation,
  CreateTaskLabelMutationVariables
>;

/**
 * __useCreateTaskLabelMutation__
 *
 * To run a mutation, you first call `useCreateTaskLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskLabelMutation, { data, loading, error }] = useCreateTaskLabelMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      name: // value for 'name'
 *      color: // value for 'color'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCreateTaskLabelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTaskLabelMutation,
    CreateTaskLabelMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateTaskLabelMutation,
    CreateTaskLabelMutationVariables
  >(CreateTaskLabelDocument, baseOptions);
}
export type CreateTaskLabelMutationHookResult = ReturnType<
  typeof useCreateTaskLabelMutation
>;
export type CreateTaskLabelMutationResult = Apollo.MutationResult<CreateTaskLabelMutation>;
export type CreateTaskLabelMutationOptions = Apollo.BaseMutationOptions<
  CreateTaskLabelMutation,
  CreateTaskLabelMutationVariables
>;
export const CreateUserTaskDocument = gql`
  mutation CreateUserTask(
    $userId: String!
    $taskId: String!
    $projectId: String!
  ) {
    createUserTask(userId: $userId, taskId: $taskId, projectId: $projectId) {
      userTask {
        id
        user {
          username
          avatar
          id
        }
        task {
          id
          title
        }
      }
      error {
        code
        field
        message
      }
    }
  }
`;
export type CreateUserTaskMutationFn = Apollo.MutationFunction<
  CreateUserTaskMutation,
  CreateUserTaskMutationVariables
>;

/**
 * __useCreateUserTaskMutation__
 *
 * To run a mutation, you first call `useCreateUserTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserTaskMutation, { data, loading, error }] = useCreateUserTaskMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      taskId: // value for 'taskId'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCreateUserTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserTaskMutation,
    CreateUserTaskMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateUserTaskMutation,
    CreateUserTaskMutationVariables
  >(CreateUserTaskDocument, baseOptions);
}
export type CreateUserTaskMutationHookResult = ReturnType<
  typeof useCreateUserTaskMutation
>;
export type CreateUserTaskMutationResult = Apollo.MutationResult<CreateUserTaskMutation>;
export type CreateUserTaskMutationOptions = Apollo.BaseMutationOptions<
  CreateUserTaskMutation,
  CreateUserTaskMutationVariables
>;
export const DeleteBoardDocument = gql`
  mutation DeleteBoard(
    $id: String!
    $newBoardId: String!
    $projectId: String!
  ) {
    deleteBoard(id: $id, newBoardId: $newBoardId, projectId: $projectId) {
      boards {
        id
        title
        boardColumnIndex
        task {
          id
          title
          boardRowIndex
          sprintRowIndex
          taskIndex
          startDate
          endDate
          userTask {
            user {
              id
              username
              avatar
            }
          }
          taskLabel {
            label {
              id
              name
              color
            }
          }
        }
      }
      error {
        message
        code
        field
      }
    }
  }
`;
export type DeleteBoardMutationFn = Apollo.MutationFunction<
  DeleteBoardMutation,
  DeleteBoardMutationVariables
>;

/**
 * __useDeleteBoardMutation__
 *
 * To run a mutation, you first call `useDeleteBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardMutation, { data, loading, error }] = useDeleteBoardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      newBoardId: // value for 'newBoardId'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteBoardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteBoardMutation,
    DeleteBoardMutationVariables
  >
) {
  return Apollo.useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(
    DeleteBoardDocument,
    baseOptions
  );
}
export type DeleteBoardMutationHookResult = ReturnType<
  typeof useDeleteBoardMutation
>;
export type DeleteBoardMutationResult = Apollo.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<
  DeleteBoardMutation,
  DeleteBoardMutationVariables
>;
export const DeleteCommentDocument = gql`
  mutation DeleteComment($projectId: String!, $id: String!) {
    deleteComment(projectId: $projectId, id: $id) {
      error {
        code
        field
        message
      }
      success
    }
  }
`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >
) {
  return Apollo.useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(DeleteCommentDocument, baseOptions);
}
export type DeleteCommentMutationHookResult = ReturnType<
  typeof useDeleteCommentMutation
>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;
export const DeleteLabelDocument = gql`
  mutation DeleteLabel($projectId: String!, $id: String!) {
    deleteLabel(projectId: $projectId, id: $id) {
      error {
        code
        field
        message
      }
      success
    }
  }
`;
export type DeleteLabelMutationFn = Apollo.MutationFunction<
  DeleteLabelMutation,
  DeleteLabelMutationVariables
>;

/**
 * __useDeleteLabelMutation__
 *
 * To run a mutation, you first call `useDeleteLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLabelMutation, { data, loading, error }] = useDeleteLabelMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLabelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteLabelMutation,
    DeleteLabelMutationVariables
  >
) {
  return Apollo.useMutation<DeleteLabelMutation, DeleteLabelMutationVariables>(
    DeleteLabelDocument,
    baseOptions
  );
}
export type DeleteLabelMutationHookResult = ReturnType<
  typeof useDeleteLabelMutation
>;
export type DeleteLabelMutationResult = Apollo.MutationResult<DeleteLabelMutation>;
export type DeleteLabelMutationOptions = Apollo.BaseMutationOptions<
  DeleteLabelMutation,
  DeleteLabelMutationVariables
>;
export const DeleteProjectDocument = gql`
  mutation DeleteProject($projectId: String!) {
    deleteProject(projectId: $projectId) {
      success
      error {
        message
        code
        field
      }
    }
  }
`;
export type DeleteProjectMutationFn = Apollo.MutationFunction<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
  >
) {
  return Apollo.useMutation<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
  >(DeleteProjectDocument, baseOptions);
}
export type DeleteProjectMutationHookResult = ReturnType<
  typeof useDeleteProjectMutation
>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
>;
export const DeleteSprintDocument = gql`
  mutation DeleteSprint($id: String!, $projectId: String!) {
    deleteSprint(id: $id, projectId: $projectId) {
      success
      error {
        code
        field
        message
      }
    }
  }
`;
export type DeleteSprintMutationFn = Apollo.MutationFunction<
  DeleteSprintMutation,
  DeleteSprintMutationVariables
>;

/**
 * __useDeleteSprintMutation__
 *
 * To run a mutation, you first call `useDeleteSprintMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSprintMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSprintMutation, { data, loading, error }] = useDeleteSprintMutation({
 *   variables: {
 *      id: // value for 'id'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteSprintMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteSprintMutation,
    DeleteSprintMutationVariables
  >
) {
  return Apollo.useMutation<
    DeleteSprintMutation,
    DeleteSprintMutationVariables
  >(DeleteSprintDocument, baseOptions);
}
export type DeleteSprintMutationHookResult = ReturnType<
  typeof useDeleteSprintMutation
>;
export type DeleteSprintMutationResult = Apollo.MutationResult<DeleteSprintMutation>;
export type DeleteSprintMutationOptions = Apollo.BaseMutationOptions<
  DeleteSprintMutation,
  DeleteSprintMutationVariables
>;
export const DeleteTaskDocument = gql`
  mutation DeleteTask($id: String!, $projectId: String!) {
    deleteTask(id: $id, projectId: $projectId) {
      success
      error {
        message
        code
        field
      }
    }
  }
`;
export type DeleteTaskMutationFn = Apollo.MutationFunction<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >
) {
  return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(
    DeleteTaskDocument,
    baseOptions
  );
}
export type DeleteTaskMutationHookResult = ReturnType<
  typeof useDeleteTaskMutation
>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>;
export const DeleteUserTaskDocument = gql`
  mutation DeleteUserTask(
    $userId: String!
    $taskId: String!
    $projectId: String!
  ) {
    deleteUserTask(userId: $userId, taskId: $taskId, projectId: $projectId) {
      success
      error {
        message
        code
        field
      }
    }
  }
`;
export type DeleteUserTaskMutationFn = Apollo.MutationFunction<
  DeleteUserTaskMutation,
  DeleteUserTaskMutationVariables
>;

/**
 * __useDeleteUserTaskMutation__
 *
 * To run a mutation, you first call `useDeleteUserTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserTaskMutation, { data, loading, error }] = useDeleteUserTaskMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      taskId: // value for 'taskId'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteUserTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserTaskMutation,
    DeleteUserTaskMutationVariables
  >
) {
  return Apollo.useMutation<
    DeleteUserTaskMutation,
    DeleteUserTaskMutationVariables
  >(DeleteUserTaskDocument, baseOptions);
}
export type DeleteUserTaskMutationHookResult = ReturnType<
  typeof useDeleteUserTaskMutation
>;
export type DeleteUserTaskMutationResult = Apollo.MutationResult<DeleteUserTaskMutation>;
export type DeleteUserTaskMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserTaskMutation,
  DeleteUserTaskMutationVariables
>;
export const InviteUserDocument = gql`
  mutation InviteUser($projectId: String!, $emails: [String!]!) {
    inviteUser(projectId: $projectId, emails: $emails) {
      error {
        code
        message
        field
      }
      success
    }
  }
`;
export type InviteUserMutationFn = Apollo.MutationFunction<
  InviteUserMutation,
  InviteUserMutationVariables
>;

/**
 * __useInviteUserMutation__
 *
 * To run a mutation, you first call `useInviteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteUserMutation, { data, loading, error }] = useInviteUserMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      emails: // value for 'emails'
 *   },
 * });
 */
export function useInviteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InviteUserMutation,
    InviteUserMutationVariables
  >
) {
  return Apollo.useMutation<InviteUserMutation, InviteUserMutationVariables>(
    InviteUserDocument,
    baseOptions
  );
}
export type InviteUserMutationHookResult = ReturnType<
  typeof useInviteUserMutation
>;
export type InviteUserMutationResult = Apollo.MutationResult<InviteUserMutation>;
export type InviteUserMutationOptions = Apollo.BaseMutationOptions<
  InviteUserMutation,
  InviteUserMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($options: LoginInput!) {
    login(options: $options) {
      user {
        email
        role
      }
      error {
        code
        field
        message
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      error {
        message
        field
        code
      }
      user {
        username
        email
        id
      }
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UpdateBoardDocument = gql`
  mutation UpdateBoard($options: BoardUpdateInput!, $projectId: String!) {
    updateBoard(options: $options, projectId: $projectId) {
      boards {
        id
        title
        boardColumnIndex
        task {
          id
          title
          boardRowIndex
          sprintRowIndex
          taskIndex
          startDate
          endDate
          userTask {
            user {
              id
              username
              avatar
            }
          }
          taskLabel {
            label {
              id
              name
              color
            }
          }
        }
      }
      error {
        message
        code
        field
      }
    }
  }
`;
export type UpdateBoardMutationFn = Apollo.MutationFunction<
  UpdateBoardMutation,
  UpdateBoardMutationVariables
>;

/**
 * __useUpdateBoardMutation__
 *
 * To run a mutation, you first call `useUpdateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardMutation, { data, loading, error }] = useUpdateBoardMutation({
 *   variables: {
 *      options: // value for 'options'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useUpdateBoardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBoardMutation,
    UpdateBoardMutationVariables
  >
) {
  return Apollo.useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(
    UpdateBoardDocument,
    baseOptions
  );
}
export type UpdateBoardMutationHookResult = ReturnType<
  typeof useUpdateBoardMutation
>;
export type UpdateBoardMutationResult = Apollo.MutationResult<UpdateBoardMutation>;
export type UpdateBoardMutationOptions = Apollo.BaseMutationOptions<
  UpdateBoardMutation,
  UpdateBoardMutationVariables
>;
export const UpdateCommentDocument = gql`
  mutation UpdateComment($id: String!, $content: String!, $projectId: String!) {
    updateComment(id: $id, content: $content, projectId: $projectId) {
      error {
        field
        message
        code
      }
      comment {
        id
        rootCommentId
        task {
          id
          title
        }
        user {
          id
          username
        }
        content
        createdAt
      }
    }
  }
`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useUpdateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >(UpdateCommentDocument, baseOptions);
}
export type UpdateCommentMutationHookResult = ReturnType<
  typeof useUpdateCommentMutation
>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>;
export const UpdateLabelDocument = gql`
  mutation UpdateLabel(
    $projectId: String!
    $options: LabelUpdateInput!
    $id: String!
  ) {
    updateLabel(projectId: $projectId, options: $options, id: $id) {
      error {
        code
        field
        message
      }
      label {
        id
        name
        color
      }
    }
  }
`;
export type UpdateLabelMutationFn = Apollo.MutationFunction<
  UpdateLabelMutation,
  UpdateLabelMutationVariables
>;

/**
 * __useUpdateLabelMutation__
 *
 * To run a mutation, you first call `useUpdateLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLabelMutation, { data, loading, error }] = useUpdateLabelMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      options: // value for 'options'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateLabelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateLabelMutation,
    UpdateLabelMutationVariables
  >
) {
  return Apollo.useMutation<UpdateLabelMutation, UpdateLabelMutationVariables>(
    UpdateLabelDocument,
    baseOptions
  );
}
export type UpdateLabelMutationHookResult = ReturnType<
  typeof useUpdateLabelMutation
>;
export type UpdateLabelMutationResult = Apollo.MutationResult<UpdateLabelMutation>;
export type UpdateLabelMutationOptions = Apollo.BaseMutationOptions<
  UpdateLabelMutation,
  UpdateLabelMutationVariables
>;
export const UpdateProjectNameDocument = gql`
  mutation UpdateProjectName($name: String!, $projectId: String!) {
    updateProjectName(name: $name, projectId: $projectId) {
      project {
        id
        name
      }
      success
      error {
        code
        message
        field
      }
    }
  }
`;
export type UpdateProjectNameMutationFn = Apollo.MutationFunction<
  UpdateProjectNameMutation,
  UpdateProjectNameMutationVariables
>;

/**
 * __useUpdateProjectNameMutation__
 *
 * To run a mutation, you first call `useUpdateProjectNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectNameMutation, { data, loading, error }] = useUpdateProjectNameMutation({
 *   variables: {
 *      name: // value for 'name'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useUpdateProjectNameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProjectNameMutation,
    UpdateProjectNameMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdateProjectNameMutation,
    UpdateProjectNameMutationVariables
  >(UpdateProjectNameDocument, baseOptions);
}
export type UpdateProjectNameMutationHookResult = ReturnType<
  typeof useUpdateProjectNameMutation
>;
export type UpdateProjectNameMutationResult = Apollo.MutationResult<UpdateProjectNameMutation>;
export type UpdateProjectNameMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectNameMutation,
  UpdateProjectNameMutationVariables
>;
export const UpdateProjectPermissionDocument = gql`
  mutation UpdateProjectPermission(
    $userId: String!
    $isAdmin: Boolean!
    $projectId: String!
  ) {
    updateProjectPermission(
      userId: $userId
      isAdmin: $isAdmin
      projectId: $projectId
    ) {
      success
      projectPermission {
        id
        project {
          id
          name
        }
      }
      error {
        code
        message
        field
      }
    }
  }
`;
export type UpdateProjectPermissionMutationFn = Apollo.MutationFunction<
  UpdateProjectPermissionMutation,
  UpdateProjectPermissionMutationVariables
>;

/**
 * __useUpdateProjectPermissionMutation__
 *
 * To run a mutation, you first call `useUpdateProjectPermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectPermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectPermissionMutation, { data, loading, error }] = useUpdateProjectPermissionMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      isAdmin: // value for 'isAdmin'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useUpdateProjectPermissionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProjectPermissionMutation,
    UpdateProjectPermissionMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdateProjectPermissionMutation,
    UpdateProjectPermissionMutationVariables
  >(UpdateProjectPermissionDocument, baseOptions);
}
export type UpdateProjectPermissionMutationHookResult = ReturnType<
  typeof useUpdateProjectPermissionMutation
>;
export type UpdateProjectPermissionMutationResult = Apollo.MutationResult<UpdateProjectPermissionMutation>;
export type UpdateProjectPermissionMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectPermissionMutation,
  UpdateProjectPermissionMutationVariables
>;
export const UpdateSprintDocument = gql`
  mutation UpdateSprint($projectId: String!, $options: SprintOptionInput!) {
    updateSprint(projectId: $projectId, options: $options) {
      success
      sprint {
        title
        description
        didStart
        isCompleted
        row
        dueDate
        startedAt
      }
      error {
        code
        field
        message
      }
    }
  }
`;
export type UpdateSprintMutationFn = Apollo.MutationFunction<
  UpdateSprintMutation,
  UpdateSprintMutationVariables
>;

/**
 * __useUpdateSprintMutation__
 *
 * To run a mutation, you first call `useUpdateSprintMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSprintMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSprintMutation, { data, loading, error }] = useUpdateSprintMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateSprintMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSprintMutation,
    UpdateSprintMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdateSprintMutation,
    UpdateSprintMutationVariables
  >(UpdateSprintDocument, baseOptions);
}
export type UpdateSprintMutationHookResult = ReturnType<
  typeof useUpdateSprintMutation
>;
export type UpdateSprintMutationResult = Apollo.MutationResult<UpdateSprintMutation>;
export type UpdateSprintMutationOptions = Apollo.BaseMutationOptions<
  UpdateSprintMutation,
  UpdateSprintMutationVariables
>;
export const UpdateTaskDocument = gql`
  mutation UpdateTask($options: TaskUpdateInput!, $projectId: String!) {
    updateTask(options: $options, projectId: $projectId) {
      task {
        id
        title
        description
        startDate
        endDate
        taskIndex
        completed
        board {
          id
          title
        }
        sprint {
          id
          title
        }
        file {
          fileLink
        }
        comment {
          content
          user {
            id
            username
          }
        }
        taskLabel {
          label {
            name
            id
            color
          }
        }
        userTask {
          user {
            id
            username
          }
        }
      }
      error {
        message
        code
        field
      }
    }
  }
`;
export type UpdateTaskMutationFn = Apollo.MutationFunction<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      options: // value for 'options'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useUpdateTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >
) {
  return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(
    UpdateTaskDocument,
    baseOptions
  );
}
export type UpdateTaskMutationHookResult = ReturnType<
  typeof useUpdateTaskMutation
>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;
export const UpdateUserSettingDocument = gql`
  mutation UpdateUserSetting(
    $username: String
    $password: String
    $email: String
  ) {
    updateUserSetting(
      options: { username: $username, password: $password, email: $email }
    ) {
      error {
        message
        code
        field
      }
    }
  }
`;
export type UpdateUserSettingMutationFn = Apollo.MutationFunction<
  UpdateUserSettingMutation,
  UpdateUserSettingMutationVariables
>;

/**
 * __useUpdateUserSettingMutation__
 *
 * To run a mutation, you first call `useUpdateUserSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserSettingMutation, { data, loading, error }] = useUpdateUserSettingMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateUserSettingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserSettingMutation,
    UpdateUserSettingMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdateUserSettingMutation,
    UpdateUserSettingMutationVariables
  >(UpdateUserSettingDocument, baseOptions);
}
export type UpdateUserSettingMutationHookResult = ReturnType<
  typeof useUpdateUserSettingMutation
>;
export type UpdateUserSettingMutationResult = Apollo.MutationResult<UpdateUserSettingMutation>;
export type UpdateUserSettingMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserSettingMutation,
  UpdateUserSettingMutationVariables
>;
export const GetBoardsDocument = gql`
  query GetBoards($projectId: String!) {
    getBoards(projectId: $projectId) {
      error {
        code
        message
        field
      }
      boards {
        id
        title
        boardColumnIndex
        task {
          id
          title
          boardRowIndex
          sprintRowIndex
          taskIndex
          startDate
          endDate
          userTask {
            user {
              id
              username
              avatar
            }
          }
          taskLabel {
            label {
              id
              name
              color
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetBoardsQuery__
 *
 * To run a query within a React component, call `useGetBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetBoardsQuery(
  baseOptions: Apollo.QueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>
) {
  return Apollo.useQuery<GetBoardsQuery, GetBoardsQueryVariables>(
    GetBoardsDocument,
    baseOptions
  );
}
export function useGetBoardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBoardsQuery,
    GetBoardsQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetBoardsQuery, GetBoardsQueryVariables>(
    GetBoardsDocument,
    baseOptions
  );
}
export type GetBoardsQueryHookResult = ReturnType<typeof useGetBoardsQuery>;
export type GetBoardsLazyQueryHookResult = ReturnType<
  typeof useGetBoardsLazyQuery
>;
export type GetBoardsQueryResult = Apollo.QueryResult<
  GetBoardsQuery,
  GetBoardsQueryVariables
>;
export const GetLabelsDocument = gql`
  query GetLabels($projectId: String!) {
    getLabels(projectId: $projectId) {
      label {
        id
        color
        name
      }
      error {
        code
        message
        field
      }
    }
  }
`;

/**
 * __useGetLabelsQuery__
 *
 * To run a query within a React component, call `useGetLabelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLabelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLabelsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetLabelsQuery(
  baseOptions: Apollo.QueryHookOptions<GetLabelsQuery, GetLabelsQueryVariables>
) {
  return Apollo.useQuery<GetLabelsQuery, GetLabelsQueryVariables>(
    GetLabelsDocument,
    baseOptions
  );
}
export function useGetLabelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLabelsQuery,
    GetLabelsQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetLabelsQuery, GetLabelsQueryVariables>(
    GetLabelsDocument,
    baseOptions
  );
}
export type GetLabelsQueryHookResult = ReturnType<typeof useGetLabelsQuery>;
export type GetLabelsLazyQueryHookResult = ReturnType<
  typeof useGetLabelsLazyQuery
>;
export type GetLabelsQueryResult = Apollo.QueryResult<
  GetLabelsQuery,
  GetLabelsQueryVariables
>;
export const GetMeDocument = gql`
  query GetMe {
    getMe {
      user {
        id
        username
        email
        projectPermissions {
          project {
            id
            name
          }
        }
        userTask {
          task {
            id
            title
            board {
              title
            }
            project {
              id
            }
          }
        }
      }
      error {
        code
        message
        field
      }
    }
  }
`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
  return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    baseOptions
  );
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
  return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    baseOptions
  );
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<
  GetMeQuery,
  GetMeQueryVariables
>;
export const GetProjectDocument = gql`
  query GetProject($projectId: String!) {
    project(projectId: $projectId) {
      project {
        id
        name
        createdAt
        updatedAt
        projectPermissions {
          id
          isAdmin
          user {
            id
            username
            email
            role
            avatar
          }
        }
        sprint {
          title
          id
        }
        board {
          id
          title
        }
        label {
          id
          name
          color
        }
      }
      error {
        code
        message
        field
      }
    }
  }
`;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProjectQuery,
    GetProjectQueryVariables
  >
) {
  return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(
    GetProjectDocument,
    baseOptions
  );
}
export function useGetProjectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProjectQuery,
    GetProjectQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(
    GetProjectDocument,
    baseOptions
  );
}
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<
  typeof useGetProjectLazyQuery
>;
export type GetProjectQueryResult = Apollo.QueryResult<
  GetProjectQuery,
  GetProjectQueryVariables
>;
export const GetReportSummaryDocument = gql`
  query GetReportSummary($projectId: String!) {
    reportSummary(projectId: $projectId) {
      taskCountSummary {
        overdueTasksCount
        completedTasksCount
        incompleteTasksCount
        totalTasksCount
      }
      tasksByAssignee {
        userId
        username
        avatar
        totalTasksCount
        incompleteTasksCount
        completedTasksCount
        overdueTasksCount
      }
      incompleteTaskStatus
      error {
        code
        message
        field
      }
    }
  }
`;

/**
 * __useGetReportSummaryQuery__
 *
 * To run a query within a React component, call `useGetReportSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportSummaryQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetReportSummaryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetReportSummaryQuery,
    GetReportSummaryQueryVariables
  >
) {
  return Apollo.useQuery<GetReportSummaryQuery, GetReportSummaryQueryVariables>(
    GetReportSummaryDocument,
    baseOptions
  );
}
export function useGetReportSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetReportSummaryQuery,
    GetReportSummaryQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    GetReportSummaryQuery,
    GetReportSummaryQueryVariables
  >(GetReportSummaryDocument, baseOptions);
}
export type GetReportSummaryQueryHookResult = ReturnType<
  typeof useGetReportSummaryQuery
>;
export type GetReportSummaryLazyQueryHookResult = ReturnType<
  typeof useGetReportSummaryLazyQuery
>;
export type GetReportSummaryQueryResult = Apollo.QueryResult<
  GetReportSummaryQuery,
  GetReportSummaryQueryVariables
>;
export const GetSprintDocument = gql`
  query GetSprint($id: String!) {
    getSprint(id: $id) {
      sprint {
        title
        description
        task {
          id
          taskIndex
          sprintRowIndex
          title
          description
          completed
          startDate
          endDate
          createdAt
          updatedAt
          board {
            id
            title
          }
          userTask {
            user {
              avatar
              username
              email
              role
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetSprintQuery__
 *
 * To run a query within a React component, call `useGetSprintQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSprintQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSprintQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSprintQuery(
  baseOptions: Apollo.QueryHookOptions<GetSprintQuery, GetSprintQueryVariables>
) {
  return Apollo.useQuery<GetSprintQuery, GetSprintQueryVariables>(
    GetSprintDocument,
    baseOptions
  );
}
export function useGetSprintLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSprintQuery,
    GetSprintQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetSprintQuery, GetSprintQueryVariables>(
    GetSprintDocument,
    baseOptions
  );
}
export type GetSprintQueryHookResult = ReturnType<typeof useGetSprintQuery>;
export type GetSprintLazyQueryHookResult = ReturnType<
  typeof useGetSprintLazyQuery
>;
export type GetSprintQueryResult = Apollo.QueryResult<
  GetSprintQuery,
  GetSprintQueryVariables
>;
export const GetSprintsDocument = gql`
  query GetSprints($projectId: String!) {
    getSprints(projectId: $projectId) {
      sprints {
        id
        title
        description
        row
        dueDate
        startedAt
        didStart
        isCompleted
        task {
          id
          title
          description
          taskIndex
          sprintRowIndex
          completed
          startDate
          endDate
          createdAt
          updatedAt
          userTask {
            user {
              username
              email
              avatar
              role
            }
          }
          board {
            id
            title
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;

/**
 * __useGetSprintsQuery__
 *
 * To run a query within a React component, call `useGetSprintsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSprintsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSprintsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetSprintsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSprintsQuery,
    GetSprintsQueryVariables
  >
) {
  return Apollo.useQuery<GetSprintsQuery, GetSprintsQueryVariables>(
    GetSprintsDocument,
    baseOptions
  );
}
export function useGetSprintsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSprintsQuery,
    GetSprintsQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetSprintsQuery, GetSprintsQueryVariables>(
    GetSprintsDocument,
    baseOptions
  );
}
export type GetSprintsQueryHookResult = ReturnType<typeof useGetSprintsQuery>;
export type GetSprintsLazyQueryHookResult = ReturnType<
  typeof useGetSprintsLazyQuery
>;
export type GetSprintsQueryResult = Apollo.QueryResult<
  GetSprintsQuery,
  GetSprintsQueryVariables
>;
export const SetStartedSprintDocument = gql`
  query SetStartedSprint($projectId: String!) {
    getStartedSprint(projectId: $projectId) {
      sprint {
        id
        title
      }
      error {
        code
        message
        field
      }
    }
  }
`;

/**
 * __useSetStartedSprintQuery__
 *
 * To run a query within a React component, call `useSetStartedSprintQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetStartedSprintQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetStartedSprintQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useSetStartedSprintQuery(
  baseOptions: Apollo.QueryHookOptions<
    SetStartedSprintQuery,
    SetStartedSprintQueryVariables
  >
) {
  return Apollo.useQuery<SetStartedSprintQuery, SetStartedSprintQueryVariables>(
    SetStartedSprintDocument,
    baseOptions
  );
}
export function useSetStartedSprintLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SetStartedSprintQuery,
    SetStartedSprintQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    SetStartedSprintQuery,
    SetStartedSprintQueryVariables
  >(SetStartedSprintDocument, baseOptions);
}
export type SetStartedSprintQueryHookResult = ReturnType<
  typeof useSetStartedSprintQuery
>;
export type SetStartedSprintLazyQueryHookResult = ReturnType<
  typeof useSetStartedSprintLazyQuery
>;
export type SetStartedSprintQueryResult = Apollo.QueryResult<
  SetStartedSprintQuery,
  SetStartedSprintQueryVariables
>;
export const GetTaskDocument = gql`
  query GetTask($projectId: String!, $id: String!) {
    getTask(projectId: $projectId, id: $id) {
      task {
        id
        title
        description
        startDate
        endDate
        taskIndex
        completed
        board {
          id
          title
        }
        sprint {
          id
          title
          didStart
        }
        file {
          id
          fileLink
        }
        comment {
          id
          content
          createdAt
          user {
            id
            username
            email
          }
        }
        taskLabel {
          id
          label {
            name
            id
            color
          }
        }
        userTask {
          id
          user {
            email
            id
            username
          }
        }
      }
      error {
        message
        code
        field
      }
    }
  }
`;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskQuery(
  baseOptions: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables>
) {
  return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(
    GetTaskDocument,
    baseOptions
  );
}
export function useGetTaskLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>
) {
  return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(
    GetTaskDocument,
    baseOptions
  );
}
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<
  GetTaskQuery,
  GetTaskQueryVariables
>;

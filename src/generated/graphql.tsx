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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: "Query";
  getUser: UserResponse;
  userSetting: UserResponse;
  projectsOfUser: ProjectListResponse;
  project: ProjectReturnType;
  getBoards: BoardResponse;
  getSprint: SprintResponse;
  getSprints: SprintResponse;
  getTask: TaskResponse;
  getlabels: LabelResponse;
};

export type QueryGetSprintArgs = {
  id: Scalars["String"];
};

export type QueryGetTaskArgs = {
  id: Scalars["String"];
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
  id: Scalars["String"];
  isAdmin?: Maybe<Scalars["Boolean"]>;
  project: Project;
  user: User;
};

export type Project = {
  __typename?: "Project";
  id: Scalars["String"];
  name: Scalars["String"];
  logo: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  projectPermissions?: Maybe<Array<ProjectPermission>>;
  board: Array<Board>;
  label: Array<Label>;
  task: Array<Task>;
};

export type Board = {
  __typename?: "Board";
  id: Scalars["String"];
  title: Scalars["String"];
  project: Project;
  boardColumnIndex: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  task?: Maybe<Array<Task>>;
};

export type Task = {
  __typename?: "Task";
  id: Scalars["String"];
  rootTaskId?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  taskIndex: Scalars["Float"];
  boardRowIndex?: Maybe<Scalars["Float"]>;
  sprintRowIndex: Scalars["Float"];
  completed: Scalars["Boolean"];
  startDate?: Maybe<Scalars["String"]>;
  endDate?: Maybe<Scalars["String"]>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  comment?: Maybe<Array<Comment>>;
  file?: Maybe<Array<File>>;
  sprint: Sprint;
  board?: Maybe<Board>;
  project?: Maybe<Project>;
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
  deleteUserTask: Scalars["Boolean"];
  createComment: CommentResponse;
  updateComment: CommentResponse;
  deleteComment: CommentDeleteResponse;
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationUpdateUserSettingArgs = {
  options: UserUpdateOptions;
};

export type MutationCreateProjectArgs = {
  name: Scalars["String"];
};

export type MutationUpdateProjectNameArgs = {
  name: Scalars["String"];
};

export type MutationUpdateProjectPermissionArgs = {
  isAdmin: Scalars["Boolean"];
  userId: Scalars["String"];
};

export type MutationInviteUserArgs = {
  emails: Array<Scalars["String"]>;
};

export type MutationDeleteMemberArgs = {
  userId: Scalars["String"];
};

export type MutationCreateBoardArgs = {
  title: Scalars["String"];
};

export type MutationUpdateBoardArgs = {
  options: BoardUpdateInput;
};

export type MutationDeleteBoardArgs = {
  newBoardId: Scalars["String"];
  id: Scalars["String"];
};

export type MutationCreateSprintArgs = {
  title: Scalars["String"];
};

export type MutationUpdateSprintArgs = {
  options: SprintOptionInput;
};

export type MutationDeleteSprintArgs = {
  id: Scalars["String"];
};

export type MutationReadSprintNotificationArgs = {
  id: Scalars["String"];
};

export type MutationCreateTaskArgs = {
  options: TaskCreateInput;
};

export type MutationUpdateTaskArgs = {
  options: TaskUpdateInput;
};

export type MutationDeleteTaskArgs = {
  id: Scalars["String"];
};

export type MutationCreateTaskLabelArgs = {
  color: Scalars["String"];
  name: Scalars["String"];
  taskId: Scalars["String"];
};

export type MutationDeleteTaskLabelArgs = {
  id: Scalars["String"];
};

export type MutationUpdateLabelArgs = {
  options: LabelUpdateInput;
  id: Scalars["String"];
};

export type MutationDeleteLabelArgs = {
  id: Scalars["String"];
};

export type MutationCreateUserTaskArgs = {
  taskId: Scalars["String"];
  userId: Scalars["String"];
};

export type MutationDeleteUserTaskArgs = {
  id: Scalars["String"];
};

export type MutationCreateCommentArgs = {
  options: CommentCreateInput;
  taskId: Scalars["String"];
};

export type MutationUpdateCommentArgs = {
  content: Scalars["String"];
  id: Scalars["String"];
};

export type MutationDeleteCommentArgs = {
  id: Scalars["String"];
};

export type UsernamePasswordInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
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

export type RegularErrorFragment = { __typename?: "FieldError" } & Pick<
  FieldError,
  "field" | "message"
>;

export type GetBoardsQueryVariables = Exact<{ [key: string]: never }>;

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
        { __typename?: "Board" } & Pick<Board, "boardColumnIndex" | "title">
      >
    >;
  };
};

export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const GetBoardsDocument = gql`
  query GetBoards {
    getBoards {
      error {
        code
        message
        field
      }
      boards {
        boardColumnIndex
        title
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
 *   },
 * });
 */
export function useGetBoardsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>
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

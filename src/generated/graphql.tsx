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
  id?: Scalars["String"];
  username?: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  avatar?: Maybe<Scalars["String"]>;
  role?: Maybe<RoleTypes>;
  createdAt?: Scalars["String"];
  updatedAt?: Scalars["String"];
  projectPermissions?: Array<ProjectPermission>;
  comment?: Array<Comment>;
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
  project: Project;
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
  deleteUserTask: Scalars["Boolean"];
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
  id: Scalars["String"];
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
  id: Scalars["String"];
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

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = { __typename?: "Query" } & {
  getMe: { __typename?: "UserResponse" } & {
    user?: Maybe<
      { __typename?: "User" } & Pick<User, "username"> & {
          projectPermissions: Array<
            { __typename?: "ProjectPermission" } & {
              project: { __typename?: "Project" } & Pick<Project, "id">;
            }
          >;
        }
    >;
    error?: Maybe<
      { __typename?: "FieldError" } & Pick<
        FieldError,
        "field" | "code" | "message"
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
        { __typename?: "Task" } & {
          board?: Maybe<{ __typename?: "Board" } & Pick<Board, "id" | "title">>;
          sprint: { __typename?: "Sprint" } & Pick<Sprint, "id" | "title">;
          file?: Maybe<Array<{ __typename?: "File" } & Pick<File, "fileLink">>>;
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
export const GetMeDocument = gql`
  query GetMe {
    getMe {
      user {
        username
        projectPermissions {
          project {
            id
          }
        }
      }
      error {
        field
        code
        message
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
export const GetTaskDocument = gql`
  query GetTask($projectId: String!, $id: String!) {
    getTask(projectId: $projectId, id: $id) {
      task {
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

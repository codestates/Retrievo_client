import {
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  Drawer,
  Text,
  Box,
  Avatar,
  Button as ChakraButton,
  ListItem,
  List,
  Spinner,
  Center,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import * as yup from "yup";
import { BsPaperclip } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
/* utils */
import { withRouter, RouteComponentProps } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import {
  useGetProjectLazyQuery,
  useUpdateTaskMutation,
  useGetTaskLazyQuery,
  useDeleteUserTaskMutation,
  GetTaskDocument,
  useCreateCommentMutation,
  useDeleteTaskLabelMutation,
  useCreateTaskLabelMutation,
  GetProjectDocument,
  useCreateUserTaskMutation,
  useGetMeQuery,
  useDeleteCommentMutation,
} from "../../generated/graphql";
import {
  mappingUserOption,
  mappingLabelOptions,
  mappingProjectLabelOptions,
  mappingLabelSelectorOptions,
  converToUnix,
  colorArr,
} from "./utils";

/* custom components */
import CustomForm from "../../components/Form";
import Textarea from "../../components/TextArea";
import BoardLabelSelector, {
  labelSelectorProps,
} from "../../components/LabelSelector";
import SprintListDropdown from "./SprintSelector";
import UserSelect, { UserSelectPropTypes } from "../../components/UserSelector";
import TextLabel from "./TextLabel";
import Calendar, { calendarProps, dateIFC } from "../../components/Calendar";
import IconButton from "../../components/IconButton";
import LabelSearchInput, { labelItem } from "../../components/LabelSearchInput";

const titleValidation = yup.object({
  email: yup.string().max(5).required(),
});
const commentValidation = yup.object({
  content: yup.string().min(5).required(),
});

interface MatchParams {
  projectId: string;
}
export interface taskProps {
  taskId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskBar: React.FC<
  taskProps & RouteComponentProps<MatchParams>
> = ({ taskId, match, isOpen, onClose }) => {
  const projectId = match?.params.projectId;
  const toast = useToast();

  const [
    getTask,
    { loading: getTaskLoading, data: getTaskData, refetch: refetchTask },
  ] = useGetTaskLazyQuery();
  const [updateTaskMutation] = useUpdateTaskMutation();
  const [deleteUserTask] = useDeleteUserTaskMutation();
  const [createUserTask] = useCreateUserTaskMutation();
  const [deleteTaskLabel] = useDeleteTaskLabelMutation();
  const [createTaskLabel] = useCreateTaskLabelMutation();
  const [getProject, { data: projectInfoData }] = useGetProjectLazyQuery();
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const { data: meData } = useGetMeQuery();

  useEffect(() => {
    if (!!isOpen && !!taskId && !!projectId) {
      console.log("isOpen:", isOpen);
      console.log("taskId:", taskId);
      console.log("projectId", projectId);
      if (!getTaskData) {
        getTask({
          variables: {
            projectId,
            id: taskId,
          },
        });
      } else if (refetchTask) {
        refetchTask({ projectId, id: taskId });
      }
      getProject({ variables: { projectId } });
    }
  }, [
    taskId,
    isOpen,
    getTask,
    projectId,
    getProject,
    refetchTask,
    getTaskData,
  ]);

  if (!taskId) return null;

  const taskArr = getTaskData?.getTask.task;
  if (!taskArr) {
    return <Text>no task</Text>;
  }

  const createErrorToast = () => {
    toast({
      position: "bottom-right",
      title: "Update Task Fail...",
      description: "Please try again in a moment.",
      status: "error",
      isClosable: true,
      duration: 4000,
    });
  };

  const createSuccessToast = () => {
    toast({
      position: "bottom-right",
      title: "Task Updated!",
      status: "success",
      isClosable: true,
      duration: 4000,
    });
  };

  /* mutation trigger */
  type formValue = Record<string, any>;
  const updateTask = async (value: formValue) => {
    console.log("start update:", value);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    try {
      const res = await updateTaskMutation({
        variables: {
          projectId,
          options: { ...value, id: taskId },
        },
      });

      if (res.data?.updateTask.error) {
        throw new Error(res.data?.updateTask.error.message);
      }

      createSuccessToast();
    } catch (err) {
      createErrorToast();
      console.log("updateTask error:", err);
    }
  };

  const createFile = (value: formValue) => console.log("create file", value);

  const handleCreateComment = async (
    value: formValue,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const res = await createComment({
        variables: {
          taskId,
          projectId,
          options: { ...(value as { content: string }) },
        },
        refetchQueries: [
          {
            query: GetTaskDocument,
            variables: {
              projectId,
              id: taskId,
            },
          },
        ],
      });

      if (res.data?.createComment.error) {
        throw new Error(res.data.createComment.error.message);
      }

      resetForm();

      createSuccessToast();
    } catch (error) {
      console.log("create comment error:", error);
      createErrorToast();
    }
  };

  const handleDeleteLabel = async ({ id }: { id: string }) => {
    console.log("labelId:", id);
    try {
      const res = await deleteTaskLabel({
        variables: { projectId, taskId, labelId: id },
        refetchQueries: [
          {
            query: GetTaskDocument,
            variables: {
              projectId,
              id: taskId,
            },
          },
          {
            query: GetProjectDocument,
            variables: {
              projectId,
            },
          },
        ],
      });
      if (res.data?.deleteTaskLabel.error) {
        throw new Error(res.data?.deleteTaskLabel.error.message);
      }
      createSuccessToast();
    } catch (error) {
      console.log("delete label Error", error);
      createErrorToast();
    }
  };

  const handleCreateLabel = async (name: string) => {
    try {
      const res = await createTaskLabel({
        variables: {
          projectId,
          taskId,
          name,
          color: colorArr[_.random(0, colorArr.length - 1)],
        },
        refetchQueries: [
          {
            query: GetTaskDocument,
            variables: {
              projectId,
              id: taskId,
            },
          },
          {
            query: GetProjectDocument,
            variables: {
              projectId,
            },
          },
        ],
        // update: (cache, { data }) => {
        //   if (!data) return undefined;
        //   const cacheId = cache.identify(data?.createTaskLabel);
        //   console.log("----------------");
        //   console.log("cacheId");
        //   console.log("data:");
        //   console.log("cache");
        //   // store.modify({
        //   //   fields: {
        //   //     getTask: (existingFieldData, { toReference }) => {},
        //   //   },
        //   // });
        //   return false;
        // },
      });
      if (res.data?.createTaskLabel.error) {
        throw new Error(res.data?.createTaskLabel.error.message);
      }
      createSuccessToast();
    } catch (error) {
      console.log("create label Error", error);
      createErrorToast();
    }
  };

  const handleUpdateTask = (value: formValue) => {
    console.log("formValue:", value);
    updateTask({ basicOptions: { ...value } });
  };

  const handleBoardSelect = (newBoardRecord: formValue) => {
    updateTask(newBoardRecord);
  };

  const onSprintSelect = (sprintId: string) => {
    updateTask({ sprintId });
  };

  const handleDeleteAssignee = async (id: string) => {
    try {
      const res = await deleteUserTask({
        variables: { taskId, projectId, userId: id },
        refetchQueries: [
          {
            query: GetTaskDocument,
            variables: {
              projectId,
              id: taskId,
            },
          },
        ],
        // update:(store,{data})=>{
        //   const task = store.readQuery<GetTaskQuery>({
        //     query:GetTaskDocument,
        //     data:{
        //     }
        //   })
        // }
      });

      if (res.data?.deleteUserTask.error) {
        throw new Error(res.data.deleteUserTask.error.message);
      }

      createSuccessToast();
    } catch (err) {
      createErrorToast();
      console.log("delete assignee error:", err);
    }
  };

  const handleCreateAssignee = async (id: string) => {
    try {
      const res = await createUserTask({
        variables: { taskId, projectId, userId: id },
        refetchQueries: [
          {
            query: GetTaskDocument,
            variables: {
              projectId,
              id: taskId,
            },
          },
        ],
        // update:(store,{data})=>{
        //   const task = store.readQuery<GetTaskQuery>({
        //     query:GetTaskDocument,
        //     data:{
        //     }
        //   })
        // }
      });

      if (res.data?.createUserTask.error) {
        throw new Error(res.data.createUserTask.error.message);
      }

      createSuccessToast();
    } catch (err) {
      createErrorToast();
      console.log("delete assignee error:", err);
    }
  };

  const handleDeleteComment = async (id: string) => {
    try {
      const res = await deleteComment({
        variables: { projectId, id },
        refetchQueries: [
          {
            query: GetTaskDocument,
            variables: {
              projectId,
              id: taskId,
            },
          },
        ],
      });
      if (res.data?.deleteComment.error) {
        throw new Error(res.data?.deleteComment.error.message);
      }
      createSuccessToast();
    } catch (error) {
      console.log("delete label Error", error);
      createErrorToast();
    }
  };

  /* component args */
  const sprintArg = {
    currentSprint: getTaskData?.getTask.task?.sprint,
    sprints: projectInfoData?.project.project?.sprint,
    onSprintSelect,
  };

  const userSelectArg: UserSelectPropTypes = {
    options: mappingUserOption(
      projectInfoData
        ? projectInfoData.project.project?.projectPermissions
        : null
    ),
    defaultValue: mappingUserOption(getTaskData?.getTask.task?.userTask),
    deleteAssignee: handleDeleteAssignee,
    createAssignee: handleCreateAssignee,
  };

  console.log("getTaskData", getTaskData);

  const taskLabelSelectArgs = {
    options: mappingProjectLabelOptions(
      projectInfoData?.project.project?.label
    ),
    defaultValue: mappingLabelOptions(
      getTaskData?.getTask.task
        ? getTaskData?.getTask.task.taskLabel
        : undefined
    ),
    createTaskLabel: handleCreateLabel,
    deleteTaskLabel: handleDeleteLabel,
  };

  const labelSelectorArg: labelSelectorProps = {
    defaultOption: getTaskData?.getTask.task?.sprint
      ? mappingLabelSelectorOptions([getTaskData.getTask.task.sprint])[0]
      : undefined,
    options: projectInfoData?.project.project?.board
      ? mappingLabelSelectorOptions(projectInfoData?.project.project?.board)
      : undefined,
    onChange: handleBoardSelect,
  };

  const calendarArg: calendarProps = {
    defaultStartDate: converToUnix(getTaskData?.getTask.task?.startDate),
    defaultEndDate: converToUnix(getTaskData?.getTask.task?.endDate),
    handleSubmit: (value: dateIFC) => {
      handleUpdateTask(value);
    },
  };

  /* Render method */
  const renderComments = () => {
    if (!getTaskData?.getTask.task?.comment) return null;

    return getTaskData.getTask.task.comment.map((comment) => {
      return (
        <Box display="flex" mb="2">
          <Avatar size="sm" name={comment.user?.username} />
          <Box ml="2">
            <Box display="flex" alignItems="center">
              <Text fontSize="sm" fontWeight="bold">
                {comment.user?.username}
              </Text>
              <Text fontSize="xs" fontWeight="light" ml={3}>
                {moment(Number(comment.createdAt)).fromNow().toString()}
              </Text>
              {comment.user?.email === meData?.getMe.user?.email ? (
                <IconButton
                  aria-label="delete task"
                  iconButtonType="close"
                  padding="0"
                  h="1rem"
                  w="1rem"
                  onClick={() => {
                    handleDeleteComment(comment.id);
                  }}
                />
              ) : null}
            </Box>
            <Text fontSize="sm">{comment.content}</Text>
          </Box>
        </Box>
      );
    });
  };

  const renderFileList = () => {
    if (!getTaskData?.getTask.task?.file) return null;
    return (
      <List color="achromatic.600" fontSize="sm">
        {getTaskData?.getTask.task?.file.map((el) => {
          return (
            <ListItem key={el.fileLink} display="flex" alignItems="flex-end">
              <BsPaperclip />
              <a target="blank" href="https://naver.com">
                {el.fileLink}
              </a>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <Drawer
        isOpen={!!isOpen && !!taskId && !!projectId}
        placement="right"
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay>
          {!getTaskLoading ? (
            <DrawerContent bgColor="primary.400" padding="3">
              <DrawerBody padding="0">
                <DrawerCloseButton color="achromatic.700" mr="3" mt="6" />
                <Box
                  bgColor="achromatic.100"
                  mt={2}
                  py="4"
                  px="10"
                  borderTopRadius="md"
                  boxShadow="sm"
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Text mr="2" fontSize="sm" color="primary.200">
                      Task - {getTaskData?.getTask.task?.taskIndex}
                    </Text>
                    {getTaskData?.getTask.task?.sprint.didStart ? (
                      <BoardLabelSelector {...labelSelectorArg} />
                    ) : null}
                  </Box>
                  <CustomForm
                    validationSchema={titleValidation}
                    onSubmit={(value) => updateTask(value)}
                    initialValues={{ title: getTaskData?.getTask.task?.title }}
                  >
                    <Textarea
                      label="title"
                      name="title"
                      isEditable
                      isLabelNonVisible
                      fontSize="2xl"
                      fontWeight="bold"
                      onBlurSubmit={handleUpdateTask}
                      placeholder="Task Title Here"
                      autoHeight
                      paddingNone
                    />
                  </CustomForm>
                  <Box>
                    <TextLabel>Sprint</TextLabel>
                    <SprintListDropdown {...sprintArg} />
                  </Box>
                  <Box mt={2}>
                    <TextLabel>Assignee Users</TextLabel>
                    <UserSelect {...userSelectArg} />
                  </Box>
                  <Box mt={2}>
                    <Calendar {...calendarArg} />
                  </Box>
                  <Box mt={2}>
                    <TextLabel>Label</TextLabel>
                    <LabelSearchInput {...taskLabelSelectArgs} />
                  </Box>
                  <Box mt={2}>
                    <TextLabel>Description</TextLabel>

                    <CustomForm
                      validationSchema={titleValidation}
                      onSubmit={(value) => handleUpdateTask(value)}
                      initialValues={{
                        description: getTaskData?.getTask.task?.description,
                      }}
                    >
                      <Textarea
                        label="description"
                        name="description"
                        isLabelNonVisible
                        onBlurSubmit={handleUpdateTask}
                        placeholder="description here"
                        autoHeight
                      />
                    </CustomForm>
                  </Box>
                  <Box>{renderFileList()}</Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    color="achromatic.600"
                  >
                    <ChakraButton
                      leftIcon={<BiPlus />}
                      size="sm"
                      bgColor="transparent"
                      padding="0"
                      _hover={{ backgroundColor: "transparent" }}
                      fontWeight="normal"
                    >
                      Add a file
                    </ChakraButton>
                    <IconButton
                      aria-label="delete task"
                      iconButtonType="deleteBin"
                      padding="0"
                      h="1rem"
                      w="0"
                    />
                  </Box>
                </Box>

                <Box
                  bgColor="achromatic.200"
                  borderBottomRadius="md"
                  py="4"
                  px="10"
                  boxShadow="sm"
                >
                  {renderComments()}

                  <Box display="flex" mt={5}>
                    <Avatar
                      name={meData?.getMe.user?.username}
                      // src={meData?.getMe.user?.avatar || undefined} //TODO avatar 쿼리 업데이트 후
                      size="sm"
                      mr={2}
                    />
                    <Box width="full">
                      <CustomForm
                        validationSchema={commentValidation}
                        onSubmit={handleCreateComment}
                        initialValues={{ content: "" }}
                        isSubmitButton
                      >
                        <Textarea
                          label="content"
                          name="content"
                          isLabelNonVisible
                          placeholder="new comment here"
                        />
                      </CustomForm>
                    </Box>
                  </Box>
                </Box>
              </DrawerBody>
            </DrawerContent>
          ) : (
            <Center>
              <Spinner size="lg" />
            </Center>
          )}
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default withRouter(TaskBar);

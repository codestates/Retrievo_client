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
  Flex,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import * as yup from "yup";
import { BsPaperclip } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
/* utils */
import moment from "moment";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  useGetProjectLazyQuery,
  useUpdateTaskMutation,
  useGetTaskLazyQuery,
  useDeleteUserTaskMutation,
  GetTaskDocument,
  GetTaskQuery,
  useCreateCommentMutation,
} from "../../generated/graphql";
import {
  mappingUserOption,
  mappingLabelOptions,
  mappingProjectLabelOptions,
  mappingLabelSelectorOptions,
} from "./utils";

/* custom components */
import CustomForm from "../../components/Form";
import Textarea from "../../components/TextArea";
import LabelSelector, {
  labelSelectorProps,
} from "../../components/LabelSelector";
import SprintListDropdown from "./SprintSelector";
import UserSelect, { UserSelectPropTypes } from "../../components/UserSelector";
import TextLabel from "./TextLabel";
import Calendar, { dateIFC } from "../../components/Calendar";
import IconButton from "../../components/IconButton";
import LabelSearchInput from "../../components/LabelSearchInput";
import { buttonColor } from "../../components/Button";

type labelItem = { id: string; value: string; label: string; color: string };
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

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const [
    updateTaskMutation,
    { data: updateTaskdata },
  ] = useUpdateTaskMutation();

  const [
    deleteUserTask,
    { data: deleteUserTaskData },
  ] = useDeleteUserTaskMutation();

  const [
    getTask,
    {
      loading: getTaskLoading,
      error: getTaskError,
      data: getTaskData,
      refetch: refetchTask,
    },
  ] = useGetTaskLazyQuery();

  const [
    getProject,
    {
      loading: projectInfoLoading,
      error: projectInfoError,
      data: projectInfoData,
      refetch: refetchProject,
    },
  ] = useGetProjectLazyQuery();

  const [createComment, { data }] = useCreateCommentMutation();

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

  const task = taskArr[0];

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

  const createLabel = (value: formValue) => console.log("create label", value);

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

  const updateTaskBasicOption = (value: formValue) => {
    updateTask({ basicOptions: { ...value } });
  };

  const handleBoardSelect = (newBoardRecord: formValue) => {
    updateTask(newBoardRecord);
  };

  const onSprintSelect = (sprintId: string) => {
    updateTask({ sprintId });
  };

  const updateDates = ({ startDate, endDate }: dateIFC) => {
    const unixStartDate = moment(startDate).unix();
    const unixEndDate = moment(endDate).unix();
    updateTaskBasicOption({
      startDate: Number.isNaN(unixStartDate) ? null : unixStartDate.toString,
      endDate: Number.isNaN(unixEndDate) ? null : unixEndDate.toString,
    });
  };

  /* component args */
  const sprintArg = {
    currentSprint: task.sprint,
    sprints: projectInfoData?.project.project?.sprint,
    onSprintSelect,
  };

  const handleDeleteAssignee = async (id: string) => {
    try {
      const res = await deleteUserTask({
        variables: { id, projectId },
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

  const userSelectArg: UserSelectPropTypes = {
    options: mappingUserOption(
      projectInfoData
        ? projectInfoData.project.project?.projectPermissions
        : null
    ),
    defaultValue: mappingUserOption(task.userTask),
    deleteAssignee: handleDeleteAssignee, // TODO
    createAssignee: (id) => console.log(id), // TODO
  };

  const taskLabelSelectArgs = {
    options: mappingProjectLabelOptions(
      projectInfoData?.project.project?.label
    ),
    defaultValue: mappingLabelOptions(
      task.taskLabel ? task.taskLabel : undefined
    ),
    createTaskLabel: (item: labelItem) => console.log(item),
    deleteTaskLabel: (item: labelItem) => console.log(item),
  };

  const labelSelectorArg: labelSelectorProps = {
    defaultOption: task.sprint
      ? mappingLabelSelectorOptions([task.sprint])[0]
      : undefined,
    options: projectInfoData?.project.project?.board
      ? mappingLabelSelectorOptions(projectInfoData?.project.project?.board)
      : undefined,
    onChange: handleBoardSelect,
  };

  /* Render method */
  const renderComments = () => {
    if (!task.comment) return null;

    return task.comment.map((comment) => {
      return (
        <Box display="flex" mb="2">
          <Avatar size="sm" name={comment.user?.username} />
          <Box ml="2">
            <Box display="flex" alignItems="center">
              <Text fontSize="sm" fontWeight="bold">
                {comment.user?.username}
              </Text>
              {comment.user?.id === "1234" ? (
                <IconButton
                  aria-label="delete task"
                  iconButtonType="close"
                  padding="0"
                  h="1rem"
                  w="1rem"
                  onClick={() => console.log("delete comment clicked")}
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
    if (!task.file) return null;
    return (
      <List color="achromatic.600" fontSize="sm">
        {task.file.map((el) => {
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
                      Task - {task.taskIndex}
                    </Text>
                    {task.sprint.didStart ? (
                      <LabelSelector {...labelSelectorArg} />
                    ) : null}
                  </Box>
                  <CustomForm
                    validationSchema={titleValidation}
                    onSubmit={(value) => updateTask(value)}
                    initialValues={{ title: task.title }}
                  >
                    <Textarea
                      label="title"
                      name="title"
                      isEditable
                      isLabelNonVisible
                      fontSize="2xl"
                      fontWeight="bold"
                      onBlurSubmit={updateTaskBasicOption}
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
                    <Calendar
                      defaultStartDate={moment.unix(
                        Number(task.startDate) / 1000
                      )}
                      defaultEndDate={moment.unix(Number(task.endDate) / 1000)}
                      handleSubmit={(value: dateIFC) => {
                        updateDates(value);
                      }}
                    />
                  </Box>
                  <Box mt={2}>
                    <TextLabel>Label</TextLabel>
                    <LabelSearchInput {...taskLabelSelectArgs} />
                  </Box>
                  <Box mt={2}>
                    <TextLabel>Description</TextLabel>

                    <CustomForm
                      validationSchema={titleValidation}
                      onSubmit={(value) => updateTaskBasicOption(value)}
                      initialValues={{ description: task.description }}
                    >
                      <Textarea
                        label="description"
                        name="description"
                        isLabelNonVisible
                        onBlurSubmit={updateTaskBasicOption}
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
                    <Avatar name="myName" size="sm" mr={2} />
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

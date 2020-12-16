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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import * as yup from "yup";
import { FcCheckmark } from "react-icons/fc";
import { BsPaperclip } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
/* custom components */
import moment from "moment";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Form from "../../components/Form";
import Button, { buttonColor } from "../../components/Button";
import Textarea from "../../components/TextArea";
import Label, { label as BoardLabelType } from "../../components/Label";
import SprintListDropdown from "./SprintSelector";
import UserSelect, { UserSelectPropTypes } from "../../components/UserSelector";
import TextLabel from "./TextLabel";
import Calendar, { dateIFC } from "../../components/Calendar";
import IconButton from "../../components/IconButton";
import LabelSearchInput, {
  labelItem as labelItemType,
} from "../../components/LabelSearchInput";
import {
  useGetProjectQuery,
  useGetTaskLazyQuery,
} from "../../generated/graphql";

// DUMMY DATA

const mappingUserOption = (
  userArr:
    | {
        user: {
          id: string;
          username: string;
          avatar?: string | undefined | null;
        };
      }[]
    | null
    | undefined
) => {
  if (!userArr) return undefined;
  return userArr.map(({ user }) => {
    return { ...user, label: user.username, value: user.id };
  });
};

const mappingLabelOptions = (
  taskLabel:
    | { label: { id: string; name: string; color: string } }[]
    | undefined
    | null
): labelItemType[] | undefined => {
  if (!taskLabel) return undefined;

  return taskLabel.map(({ label }) => ({
    id: label.id,
    value: label.name,
    label: label.name,
    color: label.color,
  }));
};

const mappingProjectLabelOptions = (
  taskLabel: { id: string; name: string; color: string }[] | undefined | null
): labelItemType[] | undefined => {
  if (!taskLabel) return undefined;

  return taskLabel.map(({ id, name, color }) => ({
    id,
    value: name,
    label: name,
    color,
  }));
};

type labelItem = { id: string; value: string; label: string; color: string };
const titleValidation = yup.object({
  email: yup.string().max(5).required(),
});
const commentValidation = yup.object({
  email: yup.string().max(5).required(),
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
  const onSprintSelect = (value: string) => console.log(value);
  const projectId = match?.params.projectId;

  const [
    getTask,
    { loading: getTaskLoading, error: getTaskError, data: getTaskData },
  ] = useGetTaskLazyQuery();

  useEffect(() => {
    if (!!isOpen && !!taskId && !!projectId) {
      console.log(isOpen);
      console.log(taskId);
      console.log(projectId);
      getTask({
        variables: {
          projectId,
          id: taskId,
        },
      });
    }
  }, [taskId, isOpen, getTask, projectId]);

  const {
    loading: projectInfoLoading,
    error: projectInfoError,
    data: projectInfoData,
  } = useGetProjectQuery({
    variables: { projectId },
  });

  if (!taskId) return null;

  const taskArr = getTaskData?.getTask.task;
  if (!taskArr) {
    return <Text>no task</Text>;
  }

  const task = taskArr[0];

  console.log("data:", getTaskData);
  console.log("loading:", getTaskLoading);

  // task => mutation
  // TODO: api와 연결
  const sprintArg = {
    currentSprint: task.sprint,
    sprints: projectInfoData?.project.project?.sprint,
    onSprintSelect,
  };
  const userSelectArg: UserSelectPropTypes = {
    options: mappingUserOption(
      projectInfoData
        ? projectInfoData.project.project?.projectPermissions
        : null
    ),
    defaultValue: mappingUserOption(task.userTask),
    deleteAssignee: (id) => console.log(id), // TODO
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

  // TODO: api 작성
  type formValue = Record<string, any>;
  const updateTask = (value: formValue) => console.log("task update", value);
  const createLabel = (value: formValue) => console.log("create label", value);
  const createFile = (value: formValue) => console.log("create file", value);
  const createComment = (value: formValue) =>
    console.log("create Comment", value);

  const mappingBoardLabel = (
    board: { id: string; title: string }[] | null | undefined
  ): BoardLabelType[] | undefined => {
    if (!board) return undefined;
    return board.map((el) => {
      return { color: undefined, name: el.title, id: el.id };
    });
  };

  const boardLabelArgs = {
    defaultValues: task
      ? { color: undefined, name: task.board?.title, id: task.board?.id }
      : undefined,
    labels: projectInfoData?.project.project?.board
      ? mappingBoardLabel(projectInfoData?.project.project?.board)
      : undefined,
  };

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

  const submitDates = ({ startDate, endDate }: dateIFC) => {
    const unixStartDate = moment(startDate).unix();
    const unixEndDate = moment(endDate).unix();
    console.log("unixStartDate:", unixStartDate);
    console.log("unixEndDate:", unixEndDate);
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
              <Box>
                <Button
                  buttontype={buttonColor.white}
                  onClick={() => {
                    updateTask({ completed: !task.completed });
                    // TODO : task complete update api
                  }}
                  rightIcon={task.completed ? <FcCheckmark /> : <></>}
                  size="sm"
                  boxShadow="sm"
                >
                  Mark Complete
                </Button>
              </Box>
              <DrawerCloseButton color="achromatic.700" mr="3" />
              <DrawerBody padding="0">
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
                    <Label {...boardLabelArgs} hasDropdown />
                  </Box>
                  <Form
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
                      onBlur={(e) => {
                        console.log(e);
                      }}
                      placeholder="Task Title Here"
                      autoHeight
                      paddingNone
                    />
                  </Form>
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
                        submitDates(value);
                      }}
                    />
                  </Box>
                  <Box mt={2}>
                    <TextLabel>Label</TextLabel>
                    <LabelSearchInput {...taskLabelSelectArgs} />
                  </Box>
                  <Box mt={2}>
                    <TextLabel>Description</TextLabel>

                    <Form
                      validationSchema={titleValidation}
                      onSubmit={(value) => console.log(value)}
                      initialValues={{ description: task.description }}
                    >
                      <Textarea
                        label="description"
                        name="description"
                        isLabelNonVisible
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        placeholder="description here"
                        autoHeight
                      />
                    </Form>
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
                      <Form
                        validationSchema={commentValidation}
                        onSubmit={(value) => createComment(value)}
                        initialValues={{ comment: "" }}
                        isSubmitButton
                      >
                        <Textarea
                          label="comment"
                          name="comment"
                          isLabelNonVisible
                          placeholder="new comment here"
                        />
                      </Form>
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

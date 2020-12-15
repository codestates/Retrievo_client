import {
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  DrawerCloseButton,
  DrawerBody,
  Drawer,
  Text,
  Box,
  Avatar,
  Button as ChakraButton,
  ListItem,
  List,
} from "@chakra-ui/react";
import React from "react";
import * as yup from "yup";
import { FcCheckmark } from "react-icons/fc";
import { BsPaperclip } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
/* custom components */
import moment from "moment";
import Form from "../../components/Form";
import Button, { buttonColor } from "../../components/Button";
import Textarea from "../../components/TextArea";
import Label from "../../components/Label";
import SprintListDropdown from "./SprintSelector";
import UserSelect, { UserSelectPropTypes } from "../../components/UserSelector";
import TextLabel from "./TextLabel";
import Calendar, { dateIFC } from "../../components/Calendar";
import IconButton from "../../components/IconButton";
import LabelSearchInput from "../../components/LabelSearchInput";

// DUMMY DATA

const users = [
  {
    user: {
      id: "stupy",
      username: "stupy",
      avatar:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
  },
  {
    user: {
      id: "prettie",
      username: "prettie",
      avatar:
        "https://images.unsplash.com/photo-1592159371936-61a70cbeb5f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGhhbXN0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
  },
  {
    user: {
      id: "bunny",
      username: "bunny",
      avatar:
        "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
  },
  {
    user: {
      id: "cuttie pie",
      username: "cuttie pie",
      avatar:
        "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
  },
];

const labelDefaultValue = {
  color: "labelTeal",
  id: "3",
  name: "DONE",
};
const labelOptions = [
  {
    color: "labelOrange",
    id: "1",
    name: "TO DO",
  },
  {
    color: "labelYellow",
    id: "2",
    name: "IN PROGRESS",
  },
  {
    color: "labelTeal",
    id: "3",
    name: "DONE",
  },
];

const sprints = [
  {
    id: "1",
    title: "Server Development",
  },
  {
    id: "2",
    title: "Client Development",
  },
  {
    id: "3",
    title: "SR",
  },
  {
    id: "4",
    title: "UI/UX Design",
  },
];

const labelSearchOptions = [
  { id: "1", value: "Hotfix", label: "Hotfix", color: "labelOrange" },
  { id: "2", value: "Marketing", label: "Marketing", color: "labelYellow" },
  { id: "3", value: "SR", label: "SR", color: "warning" },
  { id: "4", value: "Server", label: "Server", color: "labelGreen" },
  { id: "5", value: "Client", label: "Client", color: "failDark" },
  { id: "6", value: "Meeting", label: "Meeting", color: "violet" },
  { id: "7", value: "PT", label: "PT", color: "labelPink" },
  { id: "8", value: "Design", label: "Design", color: "violet" },
];

const labelSearchDefaultValue = [
  { id: "1", value: "Hotfix", label: "Hotfix", color: "labelOrange" },
  { id: "2", value: "Server", label: "Server", color: "labelGreen" },
];

const task = {
  id: "018da5e5-a28e-4183-bc8e-8adeac1df54d",
  title: "Edit User_Task Schema",
  description:
    "At repudiandae esse doloribus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod praesentium dolores beatae ullam quae dicta eum dolor corporis harum. Omnis ut dolore saepe quae explicabo labore reprehenderit vel voluptatibus?",
  startDate: "1602948368862",
  endDate: "1616167277590",
  taskIndex: 50,
  completed: false,
  board: null,
  sprint: {
    id: "4b19004a-f210-4db1-80ad-1a199569a279",
    title: "Server Deployment",
  },
  file: [
    {
      fileLink: "database_schema.pdf",
    },
  ],
  comment: [
    {
      content: "Can you fix the user table?",
      user: {
        id: "1234",
        username: "pbkim",
      },
    },
    {
      content: "Good Job!",
      user: {
        id: "5555",
        username: "Si Choi",
      },
    },
  ],
  taskLabel: [
    {
      label: {
        name: "B2C",
        id: "aee2822a-7055-42a2-a12a-fc9ccf793efc",
      },
    },
  ],
  userTask: [
    {
      user: {
        id: "b290eacd-819a-4f2a-a486-9dd5152a619c",
        username: "Dkje",
        avatar: null,
      },
    },
  ],
};

const mappingUserOption = (
  userArr: {
    user: { id: string; username: string; avatar: string | null };
  }[]
) => {
  return userArr.map(({ user }) => {
    return { ...user, label: user.id, value: user.username };
  });
};

type labelItem = { id: string; value: string; label: string; color: string };
const titleValidation = yup.object({
  email: yup.string().max(5).required(),
});
const commentValidation = yup.object({
  email: yup.string().max(5).required(),
});

export interface taskProps {
  taskId?: string;
  task?: {
    id: string;
    title: string | null;
    description: string | null;
    startDate: number | null;
    endDate: number | null;
    taskIndex: number;
    completed: boolean;
    board: { title: string; id: string } | null;
    sprint: {
      id: string;
      title: string;
    } | null;
    file: { fileLink: string }[] | null;
    comment:
      | { content: string; user: { username: string; id: string } }[]
      | null;
    userTask:
      | {
          user: {
            id: string;
            username: string;
          };
        }[]
      | null;
    taskLabel:
      | {
          label: { name: string; id: string };
        }[]
      | null;
  };
}

export const TaskBar: React.FC<taskProps> = (taskId) => {
  // TODO: Context로 분리해야함
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSprintSelect = (value: string) => console.log(value);

  // TODO: getTask API 연결
  // const task = getTask({id:taskId}); 이런 느낌으로

  // TODO: api와 연결
  const sprintArg = { currentSprint: task.sprint, sprints, onSprintSelect };
  const userSelectArg: UserSelectPropTypes = {
    options: mappingUserOption(users),
    defaultValue: mappingUserOption(task.userTask),
    deleteAssignee: (id) => console.log(id), // TODO
    createAssignee: (id) => console.log(id), // TODO
  };
  const labelSelectArgs = {
    options: labelSearchOptions,
    defaultValue: labelSearchDefaultValue,
    createTaskLabel: (item: labelItem) => console.log(item),
    deleteTaskLabel: (item: labelItem) => console.log(item),
  };

  // TODO: api 작성
  type formValue = Record<string, unknown>;
  const updateTask = (value: formValue) => console.log("task update", value);
  const createLabel = (value: formValue) => console.log("create label", value);
  const createFile = (value: formValue) => console.log("create file", value);
  const createComment = (value: formValue) =>
    console.log("create Comment", value);

  // TODO: project의 모든 user 불러오기
  // TODO: project의 모든 board 목록 불러오기
  // TODO: project의 모든 sprint 목록 불러오기

  const renderComments = () => {
    return task.comment.map((comment) => {
      return (
        <Box display="flex" mb="2">
          <Avatar size="sm" name={comment.user.username} />
          <Box ml="2">
            <Box display="flex" alignItems="center">
              <Text fontSize="sm" fontWeight="bold">
                {comment.user.username}
              </Text>
              {comment.user.id === "1234" ? (
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
      <Button buttontype={buttonColor.primary} onClick={onOpen}>
        열려라 태스크!
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay>
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
                  <Label
                    defaultValues={{
                      color: "labelTeal",
                      id: "3",
                      name: "DONE",
                    }}
                    hasDropdown
                    labels={labelOptions}
                  />
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
                  <LabelSearchInput {...labelSelectArgs} />
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
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default TaskBar;

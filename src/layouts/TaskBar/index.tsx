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
} from "@chakra-ui/react";
import React from "react";
import * as yup from "yup";
import { FcCheckmark } from "react-icons/fc";
import { BsPaperclip } from "react-icons/bs";
/* custom components */
import Form from "../../components/Form";
import Button, { buttonColor } from "../../components/Button";
import Textarea from "../../components/TextArea";
import Label from "../../components/Label";
import SprintListDropdown from "./SprintSelector";
import UserSelect, { UserSelectPropTypes } from "../../components/UserSelector";
import TextLabel from "./TextLabel";
import Calendar from "../../components/Calendar";
import IconButton, { IconButtonType } from "../../components/IconButton";
import LabelSearchInput from "../../components/LabelSearchInput";

export interface taskProps {
  sample?: string;
}

// DUMMY DATA

const users = [
  {
    id: "stupy",
    value: "stupy",
    label: "stupy",
    username: "stupy",
    avatar:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    id: "prettie",
    value: "prettie",
    label: "prettie",
    username: "prettie",
    avatar:
      "https://images.unsplash.com/photo-1592159371936-61a70cbeb5f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGhhbXN0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    id: "bunny",
    value: "bunny",
    label: "bunny",
    username: "bunny",
    avatar:
      "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    id: "cuttie pie",
    value: "cuttie pie",
    label: "cuttie pie",
    username: "cuttie pie",
    avatar:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
];

const defaultValue = [
  {
    id: "bunny",
    value: "bunny",
    label: "bunny",
    username: "bunny",
    avatar:
      "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
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

// TODO: Task api와 연결
const currentSprint = {
  id: "4",
  name: "sprint 4",
};
const sprints = [
  {
    id: "1",
    name: "sprint 1",
  },
  {
    id: "2",
    name: "sprint 2",
  },
  {
    id: "3",
    name: "sprint 3",
  },
  {
    id: "4",
    name: "sprint 4",
  },
];

const labelSearchOptions = [
  { id: "1", value: "apple", label: "Apple", color: "labelOrange" },
  { id: "2", value: "banana", label: "Banana", color: "labelYellow" },
  { id: "3", value: "mango", label: "Mango", color: "warning" },
  { id: "4", value: "kiwi", label: "Kiwi", color: "labelGreen" },
  { id: "5", value: "치킨밸류", label: "치킨", color: "failDark" },
  { id: "6", value: "만두", label: "만두", color: "violet" },
  { id: "7", value: "탕수육", label: "탕수육", color: "labelPink" },
  { id: "8", value: "초밥", label: "초밥", color: "violet" },
];

const labelSearchDefaultValue = [
  { id: "1", value: "apple", label: "Apple", color: "labelOrange" },
  { id: "2", value: "banana", label: "Banana", color: "labelYellow" },
];

const comments = [
  {
    contents:
      "예시 코멘트 치킨 내일 먹을거에요 노랑 통닭 매운 후라이드 맛있어요",
    user: {
      avatar: "test",
      username: "유저 이름2",
      id: "5678",
    },
  },
  {
    contents: "예시 코멘트 어쩌고 저쩌고 왜 잠이 안오지 미쳤나 내가?",
    user: {
      avatar: "test",
      username: "념념이",
      id: "1234",
    },
  },
];

type labelItem = { id: string; value: string; label: string; color: string };
const titleValidation = yup.object({
  email: yup.string().max(5).required(),
});
const commentValidation = yup.object({
  email: yup.string().max(5).required(),
});

export const TaskBar: React.FC<taskProps> = () => {
  // TODO: Context로 분리해야함
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSprintSelect = (value: string) => console.log(value);
  const sprintArg = { currentSprint, sprints, onSprintSelect };

  const userSelectArg: UserSelectPropTypes = {
    // TODO: api와 연결
    options: users,
    // defaultValue,
    deleteAssignee: (id) => console.log(id),
    createAssignee: (id) => console.log(id),
  };

  const labelSelectArgs = {
    options: labelSearchOptions,
    defaultValue: labelSearchDefaultValue,
    createTaskLabel: (item: labelItem) => console.log(item),
    deleteTaskLabel: (item: labelItem) => console.log(item),
  };

  const renderComments = () => {
    return comments.map((comment) => {
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
                  iconButtonType="deleteBin"
                  padding="0"
                  h="1rem"
                  w="1rem"
                  onClick={() => console.log("delete comment clicked")}
                />
              ) : null}
            </Box>
            <Text fontSize="sm">{comment.contents}</Text>
          </Box>
        </Box>
      );
    });
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
                onClick={() => console.log("TODO: update api연결")}
                rightIcon={<FcCheckmark />}
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
                    RE-120
                  </Text>
                  <Label
                    defaultValue={{
                      color: "labelTeal",
                      id: "3",
                      name: "DONE",
                    }}
                    hasDropdown
                    options={labelOptions}
                  />
                </Box>
                <Form
                  validationSchema={titleValidation}
                  onSubmit={(value) => console.log(value)}
                  initialValues={{ title: "테스트" }}
                >
                  <Textarea
                    label="title"
                    name="title"
                    isEditable
                    isLabelNonVisible
                    fontSize="2xl"
                    fontWeight="bold"
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
                  <Calendar />
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
                    initialValues={{ description: "" }}
                  >
                    <Textarea
                      label="description"
                      name="description"
                      isLabelNonVisible
                      placeholder="description here"
                      autoHeight
                    />
                  </Form>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  color="achromatic.600"
                >
                  <ChakraButton
                    leftIcon={<BsPaperclip />}
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
                      onSubmit={(value) => console.log(value)}
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

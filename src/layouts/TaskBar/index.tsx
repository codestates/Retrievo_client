import {
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  DrawerCloseButton,
  DrawerBody,
  Drawer,
  DrawerFooter,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import * as yup from "yup";
import { FcCheckmark } from "react-icons/fc";
import Form from "../../components/Form";
import Button, { buttonColor } from "../../components/Button";
import Textarea from "../../components/TextArea";
import Label from "../../components/Label";
import SprintListDropdown from "./SprintSelector";
import UserSelect, { UserSelectPropTypes } from "../../components/UserSelector";
import TextLabel from "./TextLabel";
import Calendar from "../../components/Calendar";

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

const titleValidation = yup.object({
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
                mt="3"
                borderRadius="md"
                py="4"
                px="10"
                boxShadow="sm"
              >
                <Box display="flex" alignItems="center">
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
                <Box mt={3}>
                  <TextLabel>Assignee Users</TextLabel>
                  <UserSelect {...userSelectArg} />
                </Box>
                <Box mt={3}>
                  <Calendar />
                </Box>
              </Box>
            </DrawerBody>
            <DrawerFooter justifyContent="flex-start">
              여기 코멘트 자리
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default TaskBar;

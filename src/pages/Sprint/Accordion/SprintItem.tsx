/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
  useToast,
  AccordionPanel,
  Input,
} from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";

import { BsThreeDotsVertical } from "react-icons/bs";
import TaskList from "./TaskList";
import CustomForm from "../../../components/Form";
import InputField from "../../../components/Input";
import TextAreaField from "../../../components/TextArea";
import ModalLayout from "../../../layouts/Modal";
import Heading, { headingEnum } from "../../../components/Heading";
import {
  useUpdateSprintMutation,
  useDeleteSprintMutation,
  Sprint,
  Task,
  GetSprintsDocument,
  GetBoardsDocument,
  SetStartedSprintDocument,
  useCreateTaskMutation,
} from "../../../generated/graphql";
import { useQuery } from "../../../hooks/useQuery";
import { TaskOptions } from "../../../layouts/TaskBoard/TaskBoard";

export type sprintItemProps = {
  sprintData: Sprint;
  ref?: HTMLElement;
  mappedIndex: number;
  tasks: Task[];
  refetch: () => void;
  selectedTask: string | null;
};

export const SprintItem: React.FC<Record<string, any>> = ({
  sprintData,
  row,
  tasks,
  startedSprint,
  setSelectedTask,
  onTaskOpen,
}) => {
  const toast = useToast();
  const query = useQuery();
  const projectId = query.get("projectId");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const [
    updateSprintMutation,
    { loading: updateSprintLoading },
  ] = useUpdateSprintMutation();

  const [
    deleteSprintMutation,
    { loading: deleteSprintLoading },
  ] = useDeleteSprintMutation();
  const [createTaskMutation] = useCreateTaskMutation();

  /* need to make row null on serverside */
  // if (completedSprint) {
  //   if (completedSprint.id === sprintData.id) return null;
  // }

  if (!sprintData.id) return null;
  if (!projectId) return null;

  const handleUpdateSprint = async (values: Record<string, any>) => {
    const res = await updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: sprintData.id,
          title: values.sprintName,
          description: values.description,
        },
      },
      update: async (cache) => {
        const existingSprints: any = await cache.readQuery({
          query: GetSprintsDocument,
          variables: { projectId },
        });

        const newSprints = existingSprints.getSprints.sprints.map(
          (sprint: any) => {
            if (sprint.id === sprintData.id) {
              return {
                ...sprint,
                title: values.sprintName,
                description: values.description,
              };
            }
            return sprint;
          }
        );

        cache.writeQuery({
          query: GetSprintsDocument,
          data: { getSprints: { sprints: newSprints } },
        });
      },
    });

    if (res.data?.updateSprint.error) {
      toast({
        position: "bottom-right",
        title: "Sprint Update Failed!",
        description: res.data?.updateSprint.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      onClose();
      return;
    }

    onClose();
    toast({
      position: "bottom-right",
      title: "Sprint Updated!",
      description: "Sprint has been successfully updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteSprint = async () => {
    const res = await deleteSprintMutation({
      variables: { id: sprintData.id, projectId },
      update: async (cache) => {
        try {
          cache.modify({
            fields: {
              getSprints(existingSprintsRef, { readField }) {
                const newSprintsRef = existingSprintsRef.sprints.filter(
                  (sprint: any) => {
                    return sprintData.id !== readField("id", sprint);
                  }
                );

                return { ...existingSprintsRef, sprints: newSprintsRef };
              },
            },
          });
        } catch (err) {
          console.log(err);
        }
      },
      refetchQueries: [{ query: GetBoardsDocument, variables: { projectId } }],
    });

    if (res.data?.deleteSprint.error) {
      toast({
        position: "bottom-right",
        title: "Sprint deletion Failed!",
        description: res.data?.deleteSprint.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // eslint-disable-next-line consistent-return
  const handleStartSprint = async () => {
    if (startedSprint) {
      toast({
        position: "bottom-right",
        title: "Error",
        description:
          "You cannot start another sprint while the other is active",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return null;
    }

    const res1 = await updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: sprintData.id,
          didStart: true,
        },
      },
    });

    if (res1.data?.updateSprint.error) {
      toast({
        position: "bottom-right",
        title: "Sprint Update Failed!",
        description: res1.data?.updateSprint.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return null;
    }

    const res2 = await updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: sprintData.id,
          row: 0,
        },
      },
      refetchQueries: [
        { query: GetSprintsDocument, variables: { projectId } },
        { query: GetBoardsDocument, variables: { projectId } },
        { query: SetStartedSprintDocument, variables: { projectId } },
        { query: GetSprintsDocument, variables: { projectId } },
      ],
    });

    if (res2.data?.updateSprint.error) {
      toast({
        position: "bottom-right",
        title: "Sprint Update Failed!",
        description: res2.data?.updateSprint.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return null;
    }

    toast({
      position: "bottom-right",
      title: "Sprint Started!",
      description: "Sprint has been successfully started",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // eslint-disable-next-line consistent-return
  const handleCompleteSprint = async () => {
    const res = await updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: sprintData.id,
          isCompleted: true,
        },
      },
      refetchQueries: [{ query: GetSprintsDocument, variables: { projectId } }],
    });

    if (res.data?.updateSprint.error) {
      toast({
        position: "bottom-right",
        title: "Sprint Update Failed!",
        description: res.data?.updateSprint.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    handleDeleteSprint();

    toast({
      position: "bottom-right",
      title: "Congrats, You completed your sprint!",
      description: "Sprint has been successfully completed",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleTaskCreate = async () => {
    const res = await createTaskMutation({
      variables: {
        options: {
          title: taskTitle,
          sprintId: sprintData.id,
        },
        projectId,
      },
      refetchQueries: [
        { query: GetBoardsDocument, variables: { projectId } },
        { query: GetSprintsDocument, variables: { projectId } },
      ],
    });
    if (res.data?.createTask.error) {
      toast({
        title: "Task Creation Failed😂",
        description: `${res.data?.createTask.error.message}`,
        duration: 5000,
        status: "error",
        position: "bottom-right",
      });
    } else {
      toast({
        title: "Task Creation Succeed🥳",
        description: "Task is created",
        duration: 5000,
        status: "success",
        position: "bottom-right",
      });
    }
    setIsCreateTaskModalOpen(false);
  };

  return (
    <>
      <Draggable key={sprintData.id} draggableId={sprintData.id} index={row}>
        {(provided) => {
          return (
            <AccordionItem
              ref={provided.innerRef}
              {...provided.draggableProps}
              bgColor="white"
            >
              <Flex
                alignItems="center"
                bgColor={sprintData.didStart ? "primary.400" : "achromatic.100"}
                px={2}
                {...provided.dragHandleProps}
              >
                <Center w="40px" h="40px" overflow="hidden">
                  <AccordionButton
                    p="8px"
                    w="100%"
                    h="100%"
                    display="flex"
                    justifyContent="center"
                    _hover={{
                      bg: "primary.400",
                      borderRadius: "9999px",
                      transition: "ease 0.3s",
                    }}
                    _focus={{ outline: "none" }}
                  >
                    <AccordionIcon fontSize="2rem" />
                  </AccordionButton>
                </Center>
                <Box flex="1" ml={3} textAlign="left">
                  <Heading headingType={headingEnum.table}>
                    {sprintData.title}
                  </Heading>
                </Box>
                <Flex
                  justifyContent="flex-end"
                  p={2}
                  // visibility={selected ? "visible" : "hidden"}
                >
                  <Menu>
                    <MenuButton
                      as={Button}
                      p={3}
                      border="none"
                      backgroundColor="transparent"
                      outline="none"
                      _hover={{
                        outline: "none",
                        backgroundColor: "transparent",
                      }}
                      _focus={{
                        outline: "none",
                        backgroundColor: "transparent",
                      }}
                      color="achromatic.600"
                      fontSize="xl"
                    >
                      <BsThreeDotsVertical />
                    </MenuButton>
                    <MenuList>
                      {!startedSprint ? (
                        <MenuItem onClick={handleStartSprint}>
                          Start Sprint
                        </MenuItem>
                      ) : null}

                      {startedSprint && startedSprint.id !== sprintData.id ? (
                        <MenuItem onClick={handleStartSprint}>
                          Start Sprint
                        </MenuItem>
                      ) : null}
                      {startedSprint && startedSprint.id === sprintData.id ? (
                        <MenuItem onClick={handleCompleteSprint}>
                          Complete Sprint
                        </MenuItem>
                      ) : null}
                      <MenuItem onClick={onOpen}>Update Sprint</MenuItem>
                      <MenuItem onClick={handleDeleteSprint}>
                        Delete Sprint
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
              <TaskList
                taskData={tasks}
                setSelectedTask={setSelectedTask}
                onTaskOpen={onTaskOpen}
              />
              <AccordionPanel paddingTop="0" _hover={{ backgroundColor: "" }}>
                <Flex justifyContent="flex-end">
                  <Button
                    bgColor="transparent"
                    p={0}
                    fontWeight="none"
                    onClick={() => setIsCreateTaskModalOpen(true)}
                    _hover={{
                      backgroundColor: "transparent",
                      color: "#38B2AC",
                    }}
                    _active={{
                      backgroundColor: "transparent",
                      color: "#38B2AC",
                    }}
                    _focus={{
                      backgroundColor: "transparent",
                    }}
                  >
                    + Create New Task
                  </Button>
                </Flex>
                {/* <Divider /> */}
              </AccordionPanel>
            </AccordionItem>
          );
        }}
      </Draggable>
      <ModalLayout
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        footer={false}
        title="Update Sprint"
        buttonText="Update Sprint"
        bgColor="primary.400"
        color="achromatic.600"
        borderRadius="9999px"
        display="none"
      >
        <Box mb={3}>
          <CustomForm
            initialValues={{
              sprintName: "",
              description: "",
            }}
            buttonPosition="right"
            isSubmitButton
            submitBtnName="Update Sprint"
            onSubmit={handleUpdateSprint}
          >
            <Box lineHeight={8}>
              <Box p={2}>
                <InputField
                  label="Sprint Name"
                  name="sprintName"
                  placeholder={sprintData.title}
                />
              </Box>
              <Box p={2} mb={6}>
                <TextAreaField
                  label="Sprint Description"
                  name="description"
                  placeholder={sprintData.description}
                />
              </Box>
            </Box>
          </CustomForm>
        </Box>
      </ModalLayout>
      <ModalLayout
        title="Create Task"
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        secondaryText="Submit"
        secondaryAction={handleTaskCreate}
        buttonColor="primary.200"
        buttonFontColor="white"
      >
        <Input
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Write Task Name"
        />
      </ModalLayout>
    </>
  );
};

export default SprintItem;

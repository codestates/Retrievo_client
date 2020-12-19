/* eslint-disable no-underscore-dangle */
import React from "react";
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
} from "../../../generated/graphql";
import { useQuery } from "../../../hooks/useQuery";

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
  selectedTask,
  onTaskOpen,
}) => {
  const toast = useToast();
  const query = useQuery();
  const projectId = query.get("projectId");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [
    updateSprintMutation,
    { loading: updateSprintLoading },
  ] = useUpdateSprintMutation();

  const [
    deleteSprintMutation,
    { loading: deleteSprintLoading },
  ] = useDeleteSprintMutation();

  /* need to make row null on serverside */
  // if (completedSprint) {
  //   if (completedSprint.id === sprintData.id) return null;
  // }

  if (!sprintData.id) return null;
  if (!projectId) return null;

  const handleUpdateSprint = async (values: Record<string, any>) => {
    await updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: sprintData.id,
          title: values.sprintName,
          description: values.description,
        },
      },
      update: async (cache) => {
        try {
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
        } catch (err) {
          console.log(err);
        }
      },
    });
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
    await deleteSprintMutation({
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
    await updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: sprintData.id,
          didStart: true,
        },
      },
    });
    await updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: sprintData.id,
          row: 0,
        },
      },
      refetchQueries: [
        { query: GetBoardsDocument, variables: { projectId } },
        { query: SetStartedSprintDocument, variables: { projectId } },
      ],
    });
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
  const handleCompleteSprint = async (values: Record<string, any>) => {
    await updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: sprintData.id,
          isCompleted: true,
        },
      },
      refetchQueries: [{ query: GetSprintsDocument, variables: { projectId } }],
    });
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

  return (
    <>
      <Draggable key={sprintData.id} draggableId={sprintData.id} index={row}>
        {(provided) => {
          return (
            <AccordionItem
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              bgColor="white"
            >
              <Flex
                alignItems="center"
                bgColor={sprintData.didStart ? "primary.400" : "achromatic.100"}
                px={2}
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
                selectedTask={selectedTask}
                onTaskOpen={onTaskOpen}
              />
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
    </>
  );
};

export default SprintItem;

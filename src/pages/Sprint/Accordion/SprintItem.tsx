/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import {
  Accordion,
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
import { useLocation } from "react-router-dom";
import TaskList from "./TaskList";
import CustomForm from "../../../components/Form";
import InputField from "../../../components/Input";
import TextAreaField from "../../../components/TextArea";
import ModalLayout from "../../../layouts/Modal";
import {
  useUpdateSprintMutation,
  useDeleteSprintMutation,
  Sprint,
  Task,
  GetSprintsDocument,
  GetSprintDocument,
} from "../../../generated/graphql";

type sprintItemProps = {
  sprintData: Sprint;
  ref?: HTMLElement;
  mappedIndex: number;
  tasks: Task[];
  refetch: () => void;
};

export const SprintItem: React.FC<Record<string, any>> = ({
  sprintData,
  mappedIndex,
  tasks,
  refetch,
}) => {
  const location = useLocation();
  const toast = useToast();
  const projectId = location.pathname.split("/").pop() || "";
  const [selected, setSelected] = useState<boolean>(mappedIndex === 0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [
    updateSprintMutation,
    { loading: updateSprintLoading },
  ] = useUpdateSprintMutation();

  const [
    deleteSprintMutation,
    { loading: deleteSprintLoading },
  ] = useDeleteSprintMutation();

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
      refetchQueries: [{ query: GetSprintsDocument, variables: { projectId } }],
      update: (cache, { data }) => {
        console.log(cache);
        cache.evict({ id: `Sprint:${sprintData.id}` });
        // cache.modify({
        //   fields: {
        //     getSprints: (existingFieldData) => {
        //       console.log(existingFieldData);
        //       return existingFieldData.pop();
        //     },
        //   },
        // });
      },
    });
  };

  return (
    <Draggable
      key={sprintData.id}
      draggableId={sprintData.id}
      index={mappedIndex}
    >
      {(provided) => {
        return (
          <Accordion
            allowToggle
            onChange={() => setSelected(!selected)}
            defaultIndex={mappedIndex === 0 ? 0 : 1}
          >
            <AccordionItem>
              <Flex
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                alignItems="center"
                bgColor={selected ? "primary.400" : "achromatic.100"}
                p={2}
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
                  {sprintData.title}
                </Box>
                <Flex
                  justifyContent="flex-end"
                  p={3}
                  visibility={selected ? "visible" : "hidden"}
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
                      <MenuItem onClick={onOpen}>Update Sprint</MenuItem>
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
                              sprintName: sprintData.title,
                              description: sprintData.description,
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
                                  placeholder="Enter Name"
                                />
                              </Box>
                              <Box p={2} mb={6}>
                                <TextAreaField
                                  label="Sprint Description"
                                  name="description"
                                  placeholder="Enter Description"
                                />
                              </Box>
                            </Box>
                          </CustomForm>
                        </Box>
                      </ModalLayout>
                      <MenuItem onClick={handleDeleteSprint}>
                        Delete Sprint
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
              <TaskList taskData={tasks} />
            </AccordionItem>
          </Accordion>
        );
      }}
    </Draggable>
  );
};

export default SprintItem;

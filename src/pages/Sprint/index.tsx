import { Box, useDisclosure, Flex, useToast } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import CustomForm from "../../components/Form";
import ModalLayout from "../../layouts/Modal";
import PageHeading from "../../layouts/PageHeader";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import Sprints from "./Accordion";
import InputField from "../../components/Input";
import TextAreaField from "../../components/TextArea";
import { useCreateSprintMutation } from "../../generated/graphql";

export const Sprint: React.FC = () => {
  const location = useLocation();
  const toast = useToast();
  const projectId = location.pathname.split("/").pop() || "";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createSprintMutation] = useCreateSprintMutation();

  const handleCreateSprint = async (values: Record<string, string>) => {
    await createSprintMutation({
      variables: {
        projectId,
        title: values.sprintName,
        description: values.description,
      },
    });
    onClose();
    toast({
      position: "bottom-right",
      title: "Sprint Created!",
      description: "Sprint has been successfully created",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const args = {
    projects: [
      {
        id: "1",
        name: "Rock Paper Queens",
      },
      {
        id: "2",
        name: "My Blueberry",
      },
      {
        id: "3",
        name: "Current Project",
      },
      {
        id: "4",
        name: "Retrievo",
      },
    ],
    currentProject: {
      id: "4",
      name: "Retrievo",
    },
    onProjectSelect: (id: string) => console.log(id),
    avatars: [
      {
        name: "stupy",
        src:
          "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      },
      {
        name: "prettie",
        src:
          "https://images.unsplash.com/photo-1592159371936-61a70cbeb5f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGhhbXN0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      },
      {
        name: "bunny",
        src:
          "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      },
      {
        name: "cuttie pie",
        src:
          "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      },
    ],
  };

  return (
    <>
      <TopNav {...args} />
      <SideNav />
      <Box display="flex" ml={210} mt={50}>
        <Box w="100%" p={9}>
          <Box>
            <PageHeading />
          </Box>
          <Box mt={9}>
            <Sprints />
          </Box>
          <Flex justifyContent="flex-end" mt={12}>
            <ModalLayout
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              footer={false}
              title="CreateSprint"
              buttonText="Create Sprint"
              bgColor="primary.400"
              color="achromatic.600"
              borderRadius="9999px"
            >
              <>
                <CustomForm
                  initialValues={{ sprintName: "", description: "" }}
                  buttonPosition="right"
                  isSubmitButton
                  submitBtnName="Create Sprint"
                  onSubmit={handleCreateSprint}
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
              </>
            </ModalLayout>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Sprint;

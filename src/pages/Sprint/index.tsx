import { Box, useDisclosure, Flex, useToast } from "@chakra-ui/react";
import React from "react";
import { useLocation, RouteComponentProps } from "react-router-dom";
import CustomForm from "../../components/Form";
import ModalLayout from "../../layouts/Modal";
import PageHeading from "../../layouts/PageHeader";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import Sprints from "./Accordion";
import InputField from "../../components/Input";
import TextAreaField from "../../components/TextArea";
import { useCreateSprintMutation } from "../../generated/graphql";

interface SprintType {
  projectId: string;
}

export const Sprint: React.FC<RouteComponentProps<SprintType>> = ({
  ...args
}) => {
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
      update: async (cache, { data }) => {
        if (!data) return;
        if (!data.createSprint.sprint) return;
        const cacheId = cache.identify(data.createSprint.sprint);
        if (!cacheId) return;
        cache.modify({
          fields: {
            getSprints: (existingSprints, { toReference }) => {
              return [...existingSprints.sprints, toReference(cacheId)];
            },
          },
        });
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

  return (
    <>
      <TopNav {...args} />
      <SideNav {...args} />
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

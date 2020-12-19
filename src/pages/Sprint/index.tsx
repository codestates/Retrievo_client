import { Box, useDisclosure, Flex, useToast } from "@chakra-ui/react";
import React from "react";
import CustomForm from "../../components/Form";
import ModalLayout from "../../layouts/Modal";
import PageHeading from "../../layouts/PageHeader";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import Sprints from "./Accordion";
import InputField from "../../components/Input";
import TextAreaField from "../../components/TextArea";
import {
  GetBoardsDocument,
  SetStartedSprintDocument,
  useCreateSprintMutation,
} from "../../generated/graphql";
import useQuery from "../../hooks/useQuery";

export const Sprint: React.FC<Record<string, never>> = () => {
  const urlQuery = useQuery();
  const projectId = urlQuery.get("projectId");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createSprintMutation] = useCreateSprintMutation();

  const handleCreateSprint = async (values: Record<string, string>) => {
    if (!projectId) return;
    try {
      await createSprintMutation({
        variables: {
          projectId,
          title: values.sprintName,
          description: values.description,
        },
        update: (cache, { data }) => {
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
        refetchQueries: [
          { query: GetBoardsDocument, variables: { projectId } },
          { query: SetStartedSprintDocument, variables: { projectId } },
        ],
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
    } catch (err) {
      console.log(err);
      toast({
        position: "bottom-right",
        title: "error",
        description: "Sprint Cannot be Created",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <TopNav />
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

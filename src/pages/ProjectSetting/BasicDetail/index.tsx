/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Box, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import InputField from "../../../components/Input"; // { InputFieldProps }
import CustomForm from "../../../components/Form"; // { FormProps }
import Heading, { headingEnum } from "../../../components/Heading";
import StyledBasicDetailWrapper from "./BasicDetail.styled";
import ModalLayout from "../../../layouts/Modal";
import Spinner from "../../../components/Spinner";
import {
  GetMeDocument,
  GetProjectDocument,
  useDeleteProjectMutation,
  useGetMeQuery,
  useGetProjectQuery,
  useUpdateProjectNameMutation,
} from "../../../generated/graphql";
import useQuery from "../../../hooks/useQuery";

export const BasicDetail: React.FC = () => {
  const toast = useToast();
  const urlQuery = useQuery();
  const projectId = urlQuery.get("projectId");
  const history = useHistory();
  const { data: getMeData } = useGetMeQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [
    updateProjectName,
    { loading: updateLoading },
  ] = useUpdateProjectNameMutation();

  if (!projectId) return null;

  const { data, loading } = useGetProjectQuery({
    variables: { projectId },
  });

  const [
    deleteProjectMutation,
    { loading: deleteLoading },
  ] = useDeleteProjectMutation({
    variables: { projectId },
  });

  const myPermission = data?.project.project?.projectPermissions?.find(
    (el) => el.user.id === getMeData?.getMe.user?.id
  );

  if (updateLoading || deleteLoading || loading) return <Spinner />;

  const handleUpdateProject = async ({
    projectName,
  }: Record<string, string>) => {
    const res = await updateProjectName({
      variables: { projectId, name: projectName },
      update: (cache, { data }) => {
        if (!data) return;
        if (!data.updateProjectName.project) return;
        const cacheId = cache.identify(data.updateProjectName.project);
        if (!cacheId) return;
        cache.modify({
          fields: {
            project: (existingProject, { toReference }) => {
              return { ...existingProject, project: toReference(cacheId) };
            },
          },
        });
      },
    });

    if (res.data?.updateProjectName.error) {
      toast({
        position: "bottom-right",
        title: "Project Update Failed!",
        description: res.data?.updateProjectName.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: "Success!",
      description: "Project name has been successfully updated!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteProject = async () => {
    const res = await deleteProjectMutation({
      variables: { projectId },
      refetchQueries: [
        { query: GetProjectDocument, variables: { projectId } },
        { query: GetMeDocument },
      ],
    });
    onClose();

    if (res.data?.deleteProject.error) {
      toast({
        position: "bottom-right",
        title: "Project Deletion Failed!",
        description: res.data?.deleteProject.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      onClose();
      return;
    }

    toast({
      position: "bottom-right",
      title: "Project Deleted",
      description: "Your project has been successfully deleted.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    history.push("/project");
  };

  return (
    <>
      <Box p={4} bg="primary.400" maxWidth="100%">
        <Heading headingType={headingEnum.table}>Basic Detail</Heading>
      </Box>
      <StyledBasicDetailWrapper pl={6}>
        <CustomForm
          initialValues={{
            projectName: data?.project.project?.name,
          }}
          isSubmitButton={!!myPermission?.isAdmin}
          onSubmit={async (values) => {
            await handleUpdateProject(values);
          }}
        >
          <Box lineHeight={8}>
            <InputField
              label="Project Name"
              name="projectName"
              placeholder="Enter Project Name..."
              disabled={!myPermission?.isAdmin}
            />
          </Box>
        </CustomForm>
      </StyledBasicDetailWrapper>
      <Flex p={2} mt={6} mr={3} justifyContent="flex-end">
        <ModalLayout
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          disabled={!myPermission?.isAdmin}
          title="Delete Project"
          buttonText="Delete Project"
          bgColor="fail"
          color="achromatic.100"
          borderRadius="9999px"
          secondaryAction={() => handleDeleteProject()}
          secondaryText="Confirm"
          buttonColor="fail"
          buttonFontColor="white"
        >
          <p>
            Are you absolutely sure you want to delete this project? 😱 Deleting
            project will completely remove any data associated with it
          </p>
        </ModalLayout>
      </Flex>
    </>
  );
};

export default BasicDetail;

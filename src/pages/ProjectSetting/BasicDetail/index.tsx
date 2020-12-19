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
  useDeleteProjectMutation,
  useGetProjectQuery,
  useUpdateProjectNameMutation,
} from "../../../generated/graphql";
import useQuery from "../../../hooks/useQuery";

export const BasicDetail: React.FC = () => {
  const urlQuery = useQuery();
  const projectId = urlQuery.get("projectId");
  if (!projectId) return null;

  const history = useHistory();
  const toast = useToast();
  const [
    deleteProjectMutation,
    { loading: deleteLoading },
  ] = useDeleteProjectMutation({
    variables: { projectId },
  });
  const [
    updateProjectName,
    { loading: updateLoading },
  ] = useUpdateProjectNameMutation();

  const { data, loading } = useGetProjectQuery({
    variables: { projectId },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (updateLoading || deleteLoading || loading) return <Spinner />;

  const handleUpdateProject = async ({
    projectName,
  }: Record<string, string>) => {
    try {
      await updateProjectName({ variables: { projectId, name: projectName } });
      // toast({
      //   title: "Success!",
      //   description: "Project name has been successfully updated!",
      //   status: "success",
      //   duration: 2000,
      //   isClosable: true,
      // });
    } catch (err) {
      toast({
        title: "An error occurred.",
        description: "Unable to update project name.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteProject = async () => {
    await deleteProjectMutation({
      variables: { projectId },
    });
    toast({
      position: "bottom-right",
      title: "Project Deleted",
      description: "Your project has been successfully deleted.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    history.push("/my-profile");
  };

  return (
    <>
      <Box p={4} bg="primary.400" maxWidth="100%">
        <Heading headingType={headingEnum.table}>Basic Detail</Heading>
      </Box>
      <StyledBasicDetailWrapper pl={6}>
        <CustomForm
          initialValues={{
            projectName: data?.project.project?.name, // TODO 추후 유저의 fullname 값 입력
          }}
          isSubmitButton
          onSubmit={async (values) => {
            await handleUpdateProject(values); // TODO 추후에 데이터 업데이트 할 때 추가
            toast({
              title: "Success!",
              description: "Project name has been successfully updated!",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }}
        >
          <Box lineHeight={8}>
            <InputField
              label="Project Name"
              name="projectName"
              placeholder="Enter Project Name..."
            />
          </Box>
        </CustomForm>
      </StyledBasicDetailWrapper>
      <Flex p={2} mt={6} mr={3} justifyContent="flex-end">
        <ModalLayout
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
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

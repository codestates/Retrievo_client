import React, { ReactElement } from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, Flex, useToast } from "@chakra-ui/react";
import * as yup from "yup";
import Heading, { headingEnum } from "../../components/Heading";
import Text from "../../components/Text";
import Form from "../../components/Form";
import InputField from "../../components/Input";
import RoundButton, { RoundButtonColor } from "../../components/RoundButton";
import { useCreateProjectMutation } from "../../generated/graphql";

const NewProject = (): ReactElement => {
  const [createProject] = useCreateProjectMutation();
  const toast = useToast();
  const history = useHistory();

  const initialValue = {
    name: "",
  };

  const validationSchema = yup.object({
    name: yup.string().max(25).required(),
  });

  type fieldType = Record<string, any>;

  const createErrorToast = () => {
    toast({
      status: "error",
      title: "Something wrong...",
      description: "Please try again in a moment😅",
      position: "bottom-right",
    });
  };

  const handleCreateProject = async ({ name }: fieldType) => {
    try {
      const res = await createProject({
        variables: {
          name,
        },
      });
      if (res.data?.createProject.error) {
        console.log("createProject err:", res.data?.createProject.error);
        createErrorToast();
        return;
      }
      // TODO 생성된 프로젝트로 라우팅
      const projectId = res.data?.createProject.project?.id;
      if (!projectId) throw Error("no project id");
      history.push(`/project/dashboard/${projectId}`);
    } catch (err) {
      console.log("create new project error:", err);
      createErrorToast();
    }
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bg="achromatic.200"
      w="100%"
      h="100vh"
    >
      <Box display="flex" flexDir="column" boxShadow="lg" borderRadius={10}>
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          bgColor="primary.200"
          w={700}
          py={2}
          px={3}
          borderTopRadius={10}
        >
          <RoundButton
            aria-label="decoration button"
            buttonColor={RoundButtonColor.yellow}
            size="xs"
            mr={2}
          />
          <Link to="/">
            <RoundButton
              aria-label="decoration button"
              buttonColor={RoundButtonColor.red}
              size="xs"
            />
          </Link>
        </Flex>
        <Box bg="achromatic.100" h={300} p={10} borderBottomRadius={10}>
          <Heading headingType={headingEnum.auth}>New Project</Heading>
          <Text mt={2} mb={4}>
            What&apos;s the name of your next project?
          </Text>
          <Form
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={handleCreateProject}
            isSubmitButton
            submitBtnName="Submit"
          >
            <InputField
              label="New Project Name"
              isLabelNonVisible
              name="name"
              type="text"
              placeholder="Enter Project Name.."
            />
          </Form>
        </Box>
      </Box>
    </Flex>
  );
};

export default NewProject;

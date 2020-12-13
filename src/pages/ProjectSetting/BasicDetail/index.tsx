import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import InputField from "../../../components/Input"; // { InputFieldProps }
import CustomForm from "../../../components/Form"; // { FormProps }
import Heading, { headingEnum } from "../../../components/Heading";
import StyledBasicDetailWrapper from "./BasicDetail.styled";

export const BasicDetail: React.FC = () => {
  const handleDeleteProject = () => {
    console.log("Mutation 프로젝트 삭제 들어가야함");
  };

  return (
    <>
      <Box p={4} bg="primary.400" maxWidth="100%">
        <Heading headingType={headingEnum.table}>Basic Detail</Heading>
      </Box>
      <StyledBasicDetailWrapper pl={6}>
        <CustomForm
          initialValues={{
            projectName: "", // TODO 추후 유저의 fullname 값 입력
          }}
          isSubmitButton
          onSubmit={(values) => {
            console.log(values); // TODO 추후에 데이터 업데이트 할 때 추가
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
      <Flex p={2} mt={6} justifyContent="flex-end">
        <Button
          onClick={handleDeleteProject}
          bg="fail"
          color="achromatic.100"
          borderRadius="9999px"
          mr={3}
        >
          Delete Project
        </Button>
      </Flex>
    </>
  );
};

export default BasicDetail;

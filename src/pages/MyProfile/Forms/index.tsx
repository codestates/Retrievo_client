import React from "react";
import { Alert, AlertIcon, Box, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import InputField from "../../../components/Input"; // { InputFieldProps }
import CustomForm from "../../../components/Form"; // { FormProps }
import {
  useUpdateUserSettingMutation,
  useLogoutMutation,
  useGetMeQuery,
  // UpdateUserSettingDocument,
  GetMeDocument,
} from "../../../generated/graphql";
import Spinner from "../../../components/Spinner";

export const MyProfile: React.FC = () => {
  const history = useHistory();
  const { loading: meLoading, data: meData } = useGetMeQuery();

  const toast = useToast();

  const [
    updateUserSettingMutation,
    {
      data: updateUserData,
      loading: updateUserLoading,
      error: updateUserError,
    },
  ] = useUpdateUserSettingMutation();

  const [
    logoutMutation,
    { data: logoutData, loading: logoutLoading, error: logoutError },
  ] = useLogoutMutation();

  const handleUpdateUser = async (values: any) => {
    const { username, email, password } = values;

    if (password) {
      await updateUserSettingMutation({
        variables: { ...values },
      });
    }

    await updateUserSettingMutation({
      variables: { username, email },
    });
  };

  const handleLogout = async () => {
    await logoutMutation({
      update: (store) => {
        store.reset();
      },
    });
  };

  if (meLoading) return <Spinner />;
  return (
    <>
      <CustomForm
        initialValues={{
          username: meData?.getMe.user?.username, // TODO 추후 유저의 fullname 값 입력
          email: meData?.getMe.user?.email, // TODO 추후 유저의 email 값 입력
          password: "", // TODO 추후 유저의 password 값 입력
        }}
        isCancelButton
        isSubmitButton
        onCancel={async () => {
          await handleLogout();
          history.push("/");
        }} // TODO 추후에 로그아웃 기능 추가
        onSubmit={async (values) => {
          await handleUpdateUser(values);
          toast({
            title: "Account Updated.",
            description: "Account information has been updated",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom-right",
          });
        }}
        submitBtnName="Confirm"
        cancelBtnName="Logout"
      >
        <Box lineHeight={8}>
          <Box p={2}>
            <InputField
              label="Full Name"
              name="username"
              placeholder="Enter Name"
            />
          </Box>
          <Box p={2}>
            <InputField
              label="Email"
              name="email"
              placeholder="Enter Email"
              type="email"
              disabled
            />
          </Box>
          <Box p={2} mb={6}>
            <InputField
              label="Password"
              name="password"
              placeholder="Enter Password"
              type="password"
            />
          </Box>
        </Box>
      </CustomForm>
    </>
  );
};
export default MyProfile;

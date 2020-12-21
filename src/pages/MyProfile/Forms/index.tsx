import React from "react";
import { Box, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import InputField from "../../../components/Input"; // { InputFieldProps }
import CustomForm from "../../../components/Form"; // { FormProps }
import {
  useUpdateUserSettingMutation,
  useLogoutMutation,
  useGetMeQuery,
  GetMeDocument,
} from "../../../generated/graphql";
import Spinner from "../../../components/Spinner";

export const MyProfile: React.FC = () => {
  const history = useHistory();
  const { loading: meLoading, data: meData } = useGetMeQuery();

  const toast = useToast();

  const [updateUserSettingMutation] = useUpdateUserSettingMutation();

  const [logoutMutation] = useLogoutMutation();

  if (meLoading) return <Spinner />;

  const handleUpdateUser = async (values: any) => {
    const { username, email, password } = values;

    if (password) {
      const passwordRes = await updateUserSettingMutation({
        variables: { ...values },
        refetchQueries: [{ query: GetMeDocument }],
      });

      if (passwordRes.data?.updateUserSetting.error) {
        toast({
          position: "bottom-right",
          title: "User Password Update Failed!",
          description: passwordRes.data?.updateUserSetting.error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
    }

    const res = await updateUserSettingMutation({
      variables: { username, email },
      refetchQueries: [{ query: GetMeDocument }],
    });

    if (res.data?.updateUserSetting.error) {
      toast({
        position: "bottom-right",
        title: "User Name Update Failed!",
        description: res.data?.updateUserSetting.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleLogout = async () => {
    await logoutMutation({
      update: (store) => {
        store.reset();
      },
    });
  };

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

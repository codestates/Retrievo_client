import React from "react";
import InputField from "../../../components/Input"; // { InputFieldProps }
import CustomForm from "../../../components/Form"; // { FormProps }
import RoleSelectInput from "./roleSelectInput";

export const MyProfile: React.FC = () => {
  return (
    <>
      <CustomForm
        initialValues={{
          fullName: "", // TODO 추후 유저의 fullname 값 입력
          role: "", // TODO 추후 유저의 role 값 입력
          email: "", // TODO 추후 유저의 email 값 입력
          password: "", // TODO 추후 유저의 password 값 입력
        }}
        isCancelButton
        isSubmitButton
        onCancel={() => {
          console.log("로그아웃이 될 예정입니다");
        }} // TODO 추후에 로그아웃 기능 추가
        onSubmit={(values) => {
          console.log(values); // TODO 추후에 데이터 업데이트 할 때 추가
        }}
        submitBtnName="Confirm"
        cancelBtnName="Logout"
      >
        <InputField
          label="Full Name"
          name="fullName"
          placeholder="Enter Name"
        />
        <RoleSelectInput />
        <InputField
          label="Email"
          name="email"
          placeholder="Enter Email"
          type="email"
        />
        <InputField
          label="Password"
          name="password"
          placeholder="Enter Password"
          type="password"
        />
      </CustomForm>
    </>
  );
};

export default MyProfile;

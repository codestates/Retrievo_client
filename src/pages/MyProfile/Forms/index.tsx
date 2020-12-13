import React from "react";
import InputField from "../../../components/Input"; // { InputFieldProps }
import CustomForm from "../../../components/Form"; // { FormProps }

// interface myProfileProps {

// }

// const validationSchema = {

// };

export const MyProfile: React.FC = () => {
  return (
    <>
      <CustomForm
        // cancelButtonOption={{
        //   onCancel: () => {
        //     console.log("난 작동하니?");
        //   },
        // }}
        initialValues={{
          email: "test@gmail.com",
          username: "user default name",
        }}
        isCancelButton
        isSubmitButton
        onCancel={() => {
          console.log("skgkskdfjsld");
        }}
        onSubmit={() => {
          console.log("ojwoiehf");
        }}
      >
        <InputField
          label="email"
          name="email"
          placeholder="email"
          type="email"
        />
        <InputField label="username" name="username" placeholder="username" />
      </CustomForm>
    </>
  );
};

export default MyProfile;

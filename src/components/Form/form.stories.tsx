import React from "react";
import CustomForm, { FormProps } from "./Form";
import InputField from "./InputField";

export const BasicForm = ({ initialValues }: FormProps): React.ReactElement => {
  return (
    <CustomForm
      initialValues={initialValues}
      submitButtonOption={{ isFull: false }}
      cancelButtonOption={{ onCancel: () => console.log("cancel clicked") }}
      onSubmit={(value: Record<string, string>) => console.log(value)}
    >
      <InputField label="email" name="email" type="email" placeholder="email" />
      <InputField label="username" name="username" placeholder="username" />
    </CustomForm>
  );
};

BasicForm.props = {
  initialValue: { email: "test@gmail.com", username: "user default name" },
  submitButtonOption: { isFull: true },
  cancelButtonOption: { onCancel: () => console.log("cancel clicked") },
  onSubmit: (value: Record<string, string>) => console.log(value),
};

const AvatarStories = {
  title: "components/Form",
  component: InputField,
  argTypes: {},
};

export default AvatarStories;

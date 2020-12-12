import React from "react";
import CustomForm from "../Form";
import InputField, { InputFieldProps } from "./index";

export const Input = (args: InputFieldProps): React.ReactElement => {
  return (
    <CustomForm
      initialValues={{ email: "test@gmail.com", username: "user default name" }}
      onSubmit={(value: Record<string, string>) => console.log(value)}
    >
      <InputField placeholder="email" {...args} />
    </CustomForm>
  );
};

Input.args = {
  label: "email",
  name: "email",
  type: "email",
};

const inputStories = {
  title: "components/Form/Input",
  component: InputField,
  argTypes: {
    isEditable: {
      control: {
        type: "boolean",
      },
    },
  },
};

export default inputStories;

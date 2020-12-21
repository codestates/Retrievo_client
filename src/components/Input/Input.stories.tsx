import React from "react";
import * as yup from "yup";
import CustomForm from "../Form";
import InputField, { InputFieldProps } from "./index";

const validationSchema = yup.object({
  username: yup.string().max(20).required(),
  email: yup.string().email().required(),
});

export const Input = (args: InputFieldProps): React.ReactElement => {
  return (
    <CustomForm
      validationSchema={validationSchema}
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
    isLabelNonVisible: {
      control: {
        type: "boolean",
      },
    },
  },
};

export default inputStories;

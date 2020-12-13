import React from "react";
import * as yup from "yup";
import CustomForm, { FormProps } from ".";
import InputField from "../Input";

const testValidationSchema = yup.object({
  username: yup.string().max(20).required(),
  email: yup.string().email().required(),
});

export const Form = (args: FormProps): React.ReactElement => {
  return (
    <CustomForm {...args}>
      <InputField label="email" name="email" type="email" placeholder="email" />
      <InputField label="username" name="username" placeholder="username" />
    </CustomForm>
  );
};

Form.args = {
  initialValues: { email: "test@gmail.com", username: "user default name" },
  isSubmitButton: true,
  isCancelButton: true,
  validationSchema: testValidationSchema,
  cancelButtonOption: { onCancel: () => console.log("cancel clicked") },
  onSubmit: (value: Record<string, string>) => console.log(value),
  onCancel: () => console.log("cancel button clicked"),
};

const formStories = {
  title: "components/Form",
  component: Form,
  argTypes: {
    initialValues: {
      control: {},
    },
    isSubmitButton: {
      control: { type: "boolean" },
    },
    submitButtonOption: {
      control: {},
    },
    isCancelButton: {
      control: { type: "boolean" },
    },
    cancelButtonOption: {
      control: {},
    },
    isFullButton: {
      control: {
        type: "boolean",
      },
    },
    buttonPosition: {
      control: { type: "select", options: ["right", "left", "center"] },
    },
  },
};

export default formStories;

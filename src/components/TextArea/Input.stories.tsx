import React from "react";
import * as yup from "yup";
import CustomForm from "../Form";
import Textarea, { InputFieldProps } from "./index";

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
      <Textarea placeholder="email" {...args} />
    </CustomForm>
  );
};

Input.args = {
  label: "description",
  name: "description",
  placeholder: "Hi! my name is textarea! ",
};

const inputStories = {
  title: "components/Form/Textarea",
  component: Textarea,
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

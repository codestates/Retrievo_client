import { Wrap } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import Button, { buttonColor } from "../Button";

interface submitButtonOption {
  isFull?: boolean;
}

interface cancelButtonOption {
  onCancel: () => void;
}

export type FormProps = {
  initialValues: Record<string, string>;
  onSubmit: (value: Record<string, string>) => void;
  buttonPosition?: "center" | "left" | "right";
  isOnBlurSubmit?: boolean;
  submitButtonOption?: submitButtonOption;
  cancelButtonOption?: cancelButtonOption;
};

export const CustomForm: React.FC<FormProps> = ({
  initialValues,
  onSubmit,
  children,
  buttonPosition,
  submitButtonOption,
  cancelButtonOption,
  ...arg
}) => {
  const [complete, setComplete] = useState(false);

  const renderSubmitButton = (
    { isFull }: submitButtonOption,
    isSubmitting: boolean
  ) => (
    <Button
      buttonType={buttonColor.primary}
      type="submit"
      isLoading={isSubmitting}
      mt={2}
      isFullWidth={isFull}
    >
      Submit
    </Button>
  );

  const renderCancelButton = ({ onCancel }: cancelButtonOption) => (
    <Button buttonType={buttonColor.danger} onClick={onCancel} mt={2}>
      Cancle
    </Button>
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(value) => {
        onSubmit(value);
        setComplete(true);
      }}
      {...arg}
    >
      {({ isSubmitting }) => {
        return complete ? (
          "form submitted"
        ) : (
          <Form>
            {children}
            <Wrap align="right">
              {cancelButtonOption
                ? renderCancelButton(cancelButtonOption)
                : null}
              {submitButtonOption
                ? renderSubmitButton(submitButtonOption, isSubmitting)
                : null}
            </Wrap>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomForm;

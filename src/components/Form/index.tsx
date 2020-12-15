import { Flex, Spacer } from "@chakra-ui/react";
import { Formik, Form, FormikFormProps, FormikHelpers } from "formik";
import React, { useState } from "react";
// import * as yup from "yup";
import Button, { buttonColor } from "../Button";
// import { testValidationSchema } from "./form.stories";

export type setErrors = () => void;

export type FormProps = {
  initialValues: Record<string, any>;
  // validationSchema: yup.InferType<typeof testValidationSchema>;
  validationSchema?: any;
  buttonPosition?: "center" | "left" | "right";
  isSubmitButton?: boolean;
  isOnBlurSubmit?: boolean;
  isFullButton?: boolean;
  isCancelButton?: boolean;
  onCancel?: () => void;
  submitBtnName?: string;
  cancelBtnName?: string;
  onSubmit: (
    values: Record<string, any>,
    actions: FormikHelpers<Record<string, any>>
  ) => void;
} & FormikFormProps;

export const CustomForm: React.FC<FormProps> = ({
  initialValues,
  onCancel,
  buttonPosition,
  isSubmitButton,
  isCancelButton,
  isFullButton,
  children,
  submitBtnName,
  cancelBtnName,
  ...arg
}) => {
  const renderSubmitButton = (isSubmitting: boolean) => (
    <>
      {buttonPosition === "right" && !isCancelButton ? <Spacer /> : null}
      <Button
        buttontype={buttonColor.primary}
        type="submit"
        isLoading={isSubmitting}
        isFullWidth={isFullButton}
        mt={3}
      >
        {submitBtnName !== undefined ? submitBtnName : "Submit"}
      </Button>
    </>
  );

  const renderCancelButton = () => (
    <>
      <Button
        buttontype={buttonColor.danger}
        onClick={onCancel}
        isFullWidth={isFullButton}
        mr={isSubmitButton ? "3" : "0"}
        mt={3}
      >
        {cancelBtnName !== undefined ? cancelBtnName : "Cancel"}
      </Button>
    </>
  );

  let buttonBoxPosition = "flex-end";
  if (buttonPosition === "left") buttonBoxPosition = "flex-start";
  if (buttonPosition === "center") buttonBoxPosition = "center";

  return (
    <Formik initialValues={initialValues} {...arg}>
      {({ isSubmitting }) => {
        return (
          <Form>
            {children}
            <Flex justifyContent={buttonBoxPosition}>
              {isCancelButton ? renderCancelButton() : null}
              {isSubmitButton ? renderSubmitButton(isSubmitting) : null}
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomForm;

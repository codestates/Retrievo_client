import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  isEditable?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  isEditable,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name} fontWeight="normal" mb="0" mt="2">
        {label}
      </FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        borderColor={isEditable ? "transparent" : "achromatic.400"}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;

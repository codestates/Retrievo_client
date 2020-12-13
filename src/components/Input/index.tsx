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
  isLabelNonVisible?: boolean;
  fontSize?: string;
  fontWeight?: string;
  autoCompleteDisable?: boolean;
  onBlur?: () => void;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  fontSize = "md",
  isEditable,
  isLabelNonVisible,
  fontWeight = "normal",
  autoCompleteDisable,
  onBlur,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel
        htmlFor={field.name}
        fontWeight="normal"
        mb="0"
        mt="2"
        display={isLabelNonVisible ? "none" : "block"}
      >
        {label}
      </FormLabel>
      <Input
        {...field}
        {...props}
        onBlur={() => {
          if (!onBlur) return;
          onBlur();
        }}
        id={field.name}
        fontSize={fontSize}
        autoComplete={autoCompleteDisable ? "off" : "on"}
        fontWeight={fontWeight}
        borderColor={isEditable ? "transparent" : "achromatic.400"}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;

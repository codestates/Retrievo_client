import React, { TextareaHTMLAttributes, useRef, useEffect } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

import ResizeTextarea from "react-textarea-autosize";

export type InputFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  isEditable?: boolean;
  isLabelNonVisible?: boolean;
  fontSize?: string;
  fontWeight?: string;
  autoCompleteDisable?: boolean;
  autoHeight?: boolean;
  paddingNone?: boolean;
};

export const TextAreaField: React.FC<InputFieldProps> = ({
  label,
  fontSize = "md",
  isEditable,
  isLabelNonVisible,
  fontWeight = "normal",
  autoCompleteDisable,
  autoHeight,
  paddingNone,
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
      {autoHeight ? (
        <Textarea
          {...field}
          {...props}
          id={field.name}
          fontSize={fontSize}
          fontWeight={fontWeight}
          w="100%"
          padding={paddingNone ? "0" : [1, 2]}
          borderColor={isEditable ? "transparent" : "achromatic.400"}
          resize="none"
          as={ResizeTextarea}
          bgColor="achromatic.100"
          autoComplete={autoCompleteDisable ? "off" : "on"}
        />
      ) : (
        <Textarea
          {...field}
          {...props}
          id={field.name}
          fontSize={fontSize}
          w="100%"
          resize="none"
          fontWeight={fontWeight}
          bgColor="achromatic.100"
          borderColor={isEditable ? "transparent" : "achromatic.400"}
          autoComplete={autoCompleteDisable ? "off" : "on"}
        />
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default TextAreaField;

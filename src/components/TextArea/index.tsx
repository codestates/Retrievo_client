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
          autoComplete={autoCompleteDisable ? "off" : "on"}
          fontWeight={fontWeight}
          borderColor={isEditable ? "transparent" : "achromatic.400"}
          minRows={1}
          minH="unset"
          overflow="hidden"
          w="100%"
          resize="none"
          as={ResizeTextarea}
          padding={paddingNone ? "0" : [1, 2]}
        />
      ) : (
        <Textarea
          {...field}
          {...props}
          id={field.name}
          fontSize={fontSize}
          autoComplete={autoCompleteDisable ? "off" : "on"}
          fontWeight={fontWeight}
          borderColor={isEditable ? "transparent" : "achromatic.400"}
          w="100%"
          resize="none"
        />
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default TextAreaField;

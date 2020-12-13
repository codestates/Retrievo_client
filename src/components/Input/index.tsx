import React, { InputHTMLAttributes, ReactElement } from "react";
import { useField } from "formik";

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  isEditable?: boolean;
  isLabelNonVisible?: boolean;
  fontSize?: string;
  fontWeight?: string;
  autoCompleteDisable?: boolean;
  // LeftIcon?: IconType;
  LeftIcon?: ReactElement;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  fontSize = "md",
  isEditable,
  isLabelNonVisible,
  fontWeight = "normal",
  autoCompleteDisable,
  size: _,
  LeftIcon,
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
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={LeftIcon ? { LeftIcon } : null}
        />
        <Input
          {...field}
          {...props}
          id={field.name}
          fontSize={fontSize}
          autoComplete={autoCompleteDisable ? "off" : "on"}
          fontWeight={fontWeight}
          borderColor={isEditable ? "transparent" : "achromatic.400"}
        />
      </InputGroup>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;

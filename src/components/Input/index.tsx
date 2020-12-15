import React, { InputHTMLAttributes, ReactElement } from "react";
import { useField } from "formik";
import { VscMention, VscLock } from "react-icons/vsc";

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  isEditable?: boolean;
  isLabelNonVisible?: boolean;
  fontSize?: string;
  fontWeight?: string;
  autoCompleteDisable?: boolean;
  iconType?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  fontSize = "md",
  isEditable,
  isLabelNonVisible,
  fontWeight = "normal",
  autoCompleteDisable,
  size: _,
  iconType,
  ...props
}) => {
  const [field, { error }] = useField(props);

  let Icon;
  if (iconType === "email") {
    Icon = <VscMention size="1.6rem" />;
  }
  if (iconType === "password") {
    Icon = <VscLock size="1.6rem" />;
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel
        htmlFor={field.name}
        fontWeight="normal"
        mb=".2rem"
        mt="2"
        color="achromatic.600"
        fontSize=".9rem"
        display={isLabelNonVisible ? "none" : "block"}
      >
        {label}
      </FormLabel>
      <InputGroup>
        {iconType ? (
          <InputLeftElement
            width="3rem"
            px="9px"
            color="achromatic.600"
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={Icon}
          />
        ) : null}
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

import { Box } from "@chakra-ui/react";
import React from "react";
import * as yup from "yup";
import InputField from "../../components/Input";
import Heading, { headingEnum } from "../../components/Heading";
import Form from "../../components/Form";
import RoundButton, {
  IconType,
  ShadowType,
  RoundButtonColor,
  SizeType,
} from "../../components/RoundButton";

export type RegisterPropsType = {
  sample?: string;
};

const Register: React.FC<RegisterPropsType> = () => {
  const initialValue = {
    username: "",
    email: "",
    password: "",
    confirm: "",
  };

  const validationSchema = yup.object({
    password: yup.string().min(6).required(),
    email: yup.string().email().required(),
    username: yup.string().min(3).max(20).required(),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const handleRegister = (value: Record<string, any>) => {
    // TODO
  };

  return (
    <Box
      bgColor="white"
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Heading headingType={headingEnum.auth}>Register</Heading>
      <Box w="70%">
        <Form
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
          isSubmitButton
          isFullButton
          submitBtnName="Sign in"
        >
          <InputField label="Name" name="username" placeholder="Name" />
          <InputField
            label="Email"
            name="email"
            type="email"
            iconType="email"
            placeholder="Email"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            iconType="password"
            placeholder="Password"
          />
          <InputField
            label="Confirm Password"
            name="confirm"
            type="password"
            iconType="password"
            placeholder="Password"
          />
        </Form>
        <Box display="flex" justifyContent="center" alignItems="center" mt={7}>
          <RoundButton
            aria-label="google login button"
            iconType={IconType.google}
            shadowType={ShadowType.base}
            buttonColor={RoundButtonColor.white}
            size="md"
            variant="outline"
            mr={2}
          />
          <RoundButton
            aria-label="google login button"
            iconType={IconType.github}
            shadowType={ShadowType.base}
            buttonColor={RoundButtonColor.white}
            size="md"
            variant="outline"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Register;

import { Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import * as yup from "yup";
import { VscMention } from "react-icons/vsc";
import Heading, { headingEnum } from "../../components/Heading";
import Form from "../../components/Form";
import InputField from "../../components/Input";
import RoundButton, {
  IconType,
  ShadowType,
  RoundButtonColor,
  SizeType,
} from "../../components/RoundButton";

const Login = (): ReactElement => {
  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    password: yup.string().min(6).required(),
    email: yup.string().email().required(),
  });

  const handleLogin = (value: Record<string, any>) => {
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
      <Heading headingType={headingEnum.auth}>Login</Heading>
      <Box w="70%">
        <Form
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
          isSubmitButton
          isFullButton
          submitBtnName="Sign in"
        >
          <InputField
            label="email"
            name="email"
            type="email"
            LeftIcon={<VscMention />}
          />
          <InputField label="password" name="password" type="password" />
        </Form>
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* <RoundButton
            aria-label="google login button"
            iconType={IconType.google}
            shadowType={ShadowType.base}
            buttonColor={RoundButtonColor.white}
            fontSize="md"
          />
          <RoundButton
            aria-label="google login button"
            iconType={IconType.github}
            shadowType={ShadowType.base}
            buttonColor={RoundButtonColor.white}
          /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

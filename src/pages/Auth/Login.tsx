import { Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import Heading, { headingEnum } from "../../components/Heading";
import Form from "../../components/Form";
import InputField from "../../components/Input";
import RoundButton, {
  IconType,
  ShadowType,
  RoundButtonColor,
} from "../../components/RoundButton";
import { useLoginMutation } from "../../generated/graphql";

const Login = (): ReactElement => {
  const history = useHistory();

  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    password: yup.string().min(6).required(),
    email: yup.string().email().required(),
  });

  const [login] = useLoginMutation();

  const handleLogin = async (
    value: Record<string, any>,
    { setFieldError }: any
  ) => {
    const { email, password } = value;
    const response = await login({
      variables: { options: { email, password, projectId: null } },
    });
    if (response.data?.login.error?.message) {
      setFieldError(
        response.data.login.error.field,
        response.data.login.error.message
      );
    } else if (response.data?.login.user) {
      history.push("/");
    }
    console.log(response);
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
            iconType="email"
            placeholder="Email"
          />
          <InputField
            label="password"
            name="password"
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

export default Login;
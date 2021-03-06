import { Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Heading, { headingEnum } from "../../components/Heading";
import Form from "../../components/Form";
import InputField from "../../components/Input";
import RoundButton, {
  IconType,
  ShadowType,
  RoundButtonColor,
} from "../../components/RoundButton";
import { useLoginMutation } from "../../generated/graphql";
import useProjectRoute from "./useProjectRoute";
import IconButton, { IconButtonType } from "../../components/IconButton";
import ROUTES from "../../utils/RoutePath";

const Login = (): ReactElement => {
  const { routeToProject } = useProjectRoute();

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
    if (response.data?.login.error) {
      // console.log(response.data?.login.error);
      setFieldError(
        response.data.login.error.field,
        response.data.login.error.message
      );
    } else if (response.data?.login.user) {
      routeToProject(); // === refetch;
    }
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
      position="relative"
    >
      <Heading headingType={headingEnum.auth}>Login</Heading>
      <Box w="70%">
        <Box position="absolute" top="0" right="0">
          <Link to={ROUTES.LANDING}>
            <IconButton
              size="lg"
              color="achromatic.700"
              aria-label="back to home"
              iconButtonType={IconButtonType.close}
            />
          </Link>
        </Box>
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
          <a href="https://retrievo.io/auth/google">
            <RoundButton
              aria-label="google login button"
              iconType={IconType.google}
              shadowType={ShadowType.base}
              buttonColor={RoundButtonColor.white}
              size="md"
              variant="outline"
              mr={2}
            />
          </a>
          <a href="https://retrievo.io/auth/github">
            <RoundButton
              aria-label="google login button"
              iconType={IconType.github}
              shadowType={ShadowType.base}
              buttonColor={RoundButtonColor.white}
              size="md"
              variant="outline"
            />
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

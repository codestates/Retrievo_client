import { Box, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import Button, { buttonColor } from "../../components/Button";
import Heading, { headingEnum } from "../../components/Heading";
import Dog from "./Image/Dog";

interface LoginWelcomePropTypes {
  changeCard: () => void;
}

const LoginWelcomeCard: React.FC<LoginWelcomePropTypes> = ({
  changeCard,
}): ReactElement => {
  return (
    <Box
      bg="primary.200"
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
    >
      <Heading headingType={headingEnum.auth}>Welcome Back!</Heading>
      <Text>I&apos;ve been waiting for you!</Text>
      <Box mt={-5} width="70%">
        <Dog />
      </Box>
      <Text mt="1.2rem">Woof-Woof! Are you a stranger?</Text>
      <Button
        px={100}
        mt={2}
        buttontype={buttonColor.white}
        fontWeight="normal"
        onClick={changeCard}
      >
        Register
      </Button>
    </Box>
  );
};

export default LoginWelcomeCard;

import React from "react";
import { Box } from "@chakra-ui/react";
import Button, { buttonColor } from "../../components/Button";
import Heading, { headingEnum } from "../../components/Heading";
import Text from "../../components/Text";
import Universe from "./Image/Universe";

export type RegisterWelcomeCardProps = {
  changeCard: () => void;
};

const RegisterWelcomeCard: React.FC<RegisterWelcomeCardProps> = ({
  changeCard,
}) => {
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
      <Heading headingType={headingEnum.auth}>Welcome!</Heading>
      <Text>To Infinity And Beyond!</Text>
      <Box mt={-10} width="70%">
        <Universe />
      </Box>
      <Text mt={-5}>Have we met before?</Text>
      <Button
        px={100}
        mt={2}
        buttontype={buttonColor.white}
        fontWeight="normal"
        onClick={changeCard}
      >
        Login
      </Button>
    </Box>
  );
};

export default RegisterWelcomeCard;

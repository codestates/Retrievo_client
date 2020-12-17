import React, { useState } from "react";
import { Box, Button, Center, useDisclosure } from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import RegisterWelcomeCard from "./RegisterWelcomeCard";
import LoginWelcomeCard from "./LoginWelcomeCard";
import { TaskBar } from "../../layouts/TaskBar";

interface MatchParams {
  projectId: string;
}

const RegisterAndLogin: React.FC<RouteComponentProps<MatchParams>> = ({
  ...arg
}) => {
  const [isRegister, setIsRegister] = useState(true);

  const changeCard = () => {
    setIsRegister(!isRegister);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg="achromatic.200"
        w="100%"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Center>
          <Box display="flex" position="relative" height={600} width={1000}>
            <Box
              position="absolute"
              left={isRegister ? 0 : 500}
              height="100%"
              width="50%"
              boxShadow="lg"
              transition="left 1s, border-radius 1s"
              borderRightRadius={isRegister ? 0 : 15}
              borderLeftRadius={isRegister ? 15 : 0}
              overflow="hidden"
            >
              {isRegister ? <Register /> : <Login />}
            </Box>
            <Box
              height="100%"
              width="50%"
              position="absolute"
              right={isRegister ? 0 : 500}
              borderRightRadius={isRegister ? 15 : 0}
              borderLeftRadius={isRegister ? 0 : 15}
              overflow="hidden"
              transition="right 1s, border-radius 1s"
              boxShadow="lg"
              zIndex="999"
            >
              {isRegister ? (
                <RegisterWelcomeCard changeCard={changeCard} />
              ) : (
                <LoginWelcomeCard changeCard={changeCard} />
              )}
            </Box>
          </Box>
        </Center>
      </Box>
      <Button onClick={onOpen}>열려라 태스크</Button>
      <TaskBar
        {...arg}
        taskId="7539d773-2012-4d2f-bbc7-fc99cbb358b4"
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default RegisterAndLogin;

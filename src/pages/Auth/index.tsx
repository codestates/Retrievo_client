import React, { useState } from "react";
import { Box, Center } from "@chakra-ui/react";
import Register from "./Register";
import Login from "./Login";
import RegisterWelcomeCard from "./RegisterWelcomeCard";
import LoginWelcomeCard from "./LoginWelcomeCard";
import useQuery from "../../hooks/useQuery";
import { RoleTypes, useGetMeQuery } from "../../generated/graphql";
import useProjectRoute from "./useProjectRoute";

const RegisterAndLogin: React.FC<Record<string, never>> = () => {
  const query = useQuery();
  const type = query.get("type");
  const [isRegister, setIsRegister] = useState(type === "register");
  const { routeToProject } = useProjectRoute();
  const { data } = useGetMeQuery();

  if (data?.getMe.user && data.getMe.user.role !== RoleTypes.Guest) {
    console.log("세션이 있댕!!!!!!!");
    routeToProject();
  }

  const changeCard = () => {
    setIsRegister(!isRegister);
  };

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
    </>
  );
};

export default RegisterAndLogin;

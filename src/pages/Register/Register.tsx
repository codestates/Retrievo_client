import { Box } from "@chakra-ui/react";
import React from "react";

export type RegisterPropsType = {
  sample?: string;
};

const Register: React.FC<RegisterPropsType> = () => {
  return (
    <Box bgColor="white" width="100%" height="100%">
      Login
    </Box>
  );
};

export default Register;

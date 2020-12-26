import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

export const StyledProfileWrapper = styled(Box)`
  position: relative;
  .avatar {
    width: 500px;
  }

  button {
    position: absolute;
    top: 70%;
    left: 70%;
    box-shadow: 1px 3px 2px 1px rgba(0, 0, 0, 0.44);
  }
`;

export default StyledProfileWrapper;

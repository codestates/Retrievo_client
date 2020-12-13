import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

export const StyledProfileWrapper = styled(Box)`
  .avatar {
    width: 500px;
  }
  button {
    position: absolute;
    top: 24%;
    left: 51%;
    box-shadow: 1px 3px 2px 1px rgba(0, 0, 0, 0.44);
  }
`;

export default StyledProfileWrapper;

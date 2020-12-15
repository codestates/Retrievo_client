import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const AvatarBox = styled(Box)`
  button {
    transition: opacity 0.3s;
    opacity: 0;
  }
  &:hover {
    button {
      opacity: 1;
      display: block;
    }
  }
`;

export default AvatarBox;

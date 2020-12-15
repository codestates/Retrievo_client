import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

export const StyledBasicDetailWrapper = styled(Box)`
  form {
    display: flex;
    width: 100%;

    .css-subxaf {
      width: 360px;
      .chakra-form-control {
        display: flex;
        flex-direction: column;
        width: 360px;
        .chakra-form__label {
          width: 100%;
        }
        input {
          width: 360px;
        }
      }
    }

    .css-1bvc4cc {
      margin-left: 1rem;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;

      button {
        padding: 0 1rem;
      }
    }
  }
`;

export default StyledBasicDetailWrapper;

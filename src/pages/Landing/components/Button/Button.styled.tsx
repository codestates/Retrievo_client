import styled from "@emotion/styled";
import { css } from "@emotion/css";

type ButtonProps = {
  backgroundColor: string;
  borderColor: string;
  color: string;
};

const button = styled.button`
  ${({ backgroundColor, borderColor, color }: ButtonProps) => {
    return `
      position: relative;
      display: inline-block;
      background: ${backgroundColor};
      color: ${color};
      border: 2px solid ${borderColor};
      border-radius: 5px;
      width: 10rem;
      padding: 0.5rem 0;
      margin-right: 1rem;
      z-index: 999;
      &:focus {
        outline: 0;
      }
    `;
  }}
`;

export default button;

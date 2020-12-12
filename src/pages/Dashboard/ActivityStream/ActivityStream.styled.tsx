import styled from "@emotion/styled";
import ListItem from "../../../components/ListItem";

export const StyledListItem = styled(ListItem)`
  &:hover {
    background: #e9e9e9;
    cursor: pointer;
    transition: ease 0.3s;

    ._icon {
      opacity: 1;
      display: block;
    }
  }
`;

export default StyledListItem;

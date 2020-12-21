import styled from "@emotion/styled";
import ListItem from "../../../components/ListItem";

export const StyledListItem = styled(ListItem)`
  display: "grid";
  grid-template-columns: "auto 10rem 3rem";
  grid-column-gap: "1rem";
  &:hover {
    background: #e9e9e9;
    cursor: pointer;
    transition: background ease 0.3s;

    ._icon {
      opacity: 1;
      display: block;
      transition: opacity ease 0.3s;
    }
  }
`;

export default StyledListItem;

import React from "react";
import { Box as ChakraBox, BoxProps } from "@chakra-ui/react";

export enum boxColor {}

export type listItemProps = BoxProps & {
  width?: string;
  onClick?: () => void;
};

const ListItem: React.FC<listItemProps> = ({ onClick, children, ...props }) => {
  return (
    <ChakraBox display="flex" alignItems="center" onClick={onClick} {...props}>
      {children}
    </ChakraBox>
  );
};

export default ListItem;

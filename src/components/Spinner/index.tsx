import React from "react";
import { Spinner as ChakraSpinner, SpinnerProps } from "@chakra-ui/react";

export enum boxColor {}

export type ChakraSpinnerProps = SpinnerProps & {
  size?: string;
};

const ListItem: React.FC<ChakraSpinnerProps> = ({ ...props }) => {
  return (
    <ChakraSpinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      {...props}
    />
  );
};

export default ListItem;

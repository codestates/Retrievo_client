import React, { ReactElement } from "react";
import { Button } from "@chakra-ui/react";

export const basicButton = (): ReactElement => {
  return <Button>왜이러지?</Button>;
};

const ButtonStories = {
  title: "atoms/Button",
  component: Button,
  argTypes: {
    text: String,
    variant: {
      control: { type: "select", options: ["border", "default"] },
    },
  },
};

export default ButtonStories;

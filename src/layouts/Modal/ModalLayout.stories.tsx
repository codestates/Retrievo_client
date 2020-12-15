/* eslint-disable no-unused-vars */
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import ModalLayout, { modalIFC } from "./index";

export const BasicModalLayout = (args: modalIFC): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const config = { ...args, isOpen, onOpen, onClose };

  return <ModalLayout {...config} />;
};
BasicModalLayout.args = {
  title: "Basic Modal",
  children: "I want to hold your hand",
};

const basicModalLayoutStories = {
  title: "layouts/ModalLayout",
  component: ModalLayout,
};

export default basicModalLayoutStories;

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

interface modalIFC {
  title: string;
  children: React.ReactElement;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ModalLayout: React.FC<modalIFC> = ({
  title,
  children,
  isOpen,
  onOpen,
  onClose,
}) => {
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalLayout;

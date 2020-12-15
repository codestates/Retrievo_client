import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalFooter,
  ButtonProps,
} from "@chakra-ui/react";

export interface modalIFC extends ButtonProps {
  title: string;
  children: React.ReactElement;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  footer?: boolean;
  secondaryAction?: () => void;
  secondaryText?: string;
  buttonText: string;
}

const ModalLayout: React.FC<modalIFC> = ({
  title,
  children,
  isOpen,
  onOpen,
  onClose,
  footer = true,
  secondaryAction,
  secondaryText,
  buttonText,
  ...buttonConfig
}) => {
  return (
    <>
      <Button onClick={onOpen} {...buttonConfig}>
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          {footer ? (
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={secondaryAction}>
                {secondaryText}
              </Button>
            </ModalFooter>
          ) : null}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalLayout;

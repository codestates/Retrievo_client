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
  onOpen?: () => void;
  onClose: () => void;
  footer?: boolean;
  secondaryAction?: () => void;
  secondaryText?: string;
  buttonText?: string;
  buttonColor?: string;
  buttonFontColor?: string;
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
  buttonColor,
  buttonFontColor,
  ...buttonConfig
}) => {
  return (
    <>
      {onOpen ? (
        <Button onClick={onOpen} {...buttonConfig}>
          {buttonText}
        </Button>
      ) : null}
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
              <Button
                variant={buttonColor ? "solid" : "ghost"}
                bgColor={buttonColor}
                onClick={secondaryAction}
                color={buttonFontColor}
              >
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

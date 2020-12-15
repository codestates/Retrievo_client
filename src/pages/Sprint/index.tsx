import { Box, useDisclosure, Container, Flex } from "@chakra-ui/react";
import React from "react";
import ModalLayout from "../../layouts/Modal";
import PageHeading from "../../layouts/PageHeader";
import Sprints from "./Accordion";

export const Sprint: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const handleCreateSprint() => {

  // }

  return (
    <Container maxW="1980px">
      <Box>
        <Box mt={9}>
          <PageHeading />
        </Box>
        <Box mt={9}>
          <Sprints />
        </Box>
        <Flex justifyContent="flex-end" mt={12}>
          <ModalLayout
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            title="Basic Modal"
            buttonText="Create Sprint"
            bgColor="primary.400"
            color="achromatic.600"
            borderRadius="9999px"
          >
            <p>CreateButotn</p>
          </ModalLayout>
        </Flex>
      </Box>
    </Container>
  );
};

/*
    bgColor="primary.400"
              color="achromatic.100"
          borderRadius="9999px"
*/
export default Sprint;

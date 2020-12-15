import { Box, useDisclosure, Container, Flex } from "@chakra-ui/react";
import React from "react";
import ModalLayout from "../../layouts/Modal";
import PageHeading from "../../layouts/PageHeader";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import Sprints from "./Accordion";

export const Sprint: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const handleCreateSprint() => {

  // }

  const args = {
    projects: [
      {
        id: "1",
        name: "Rock Paper Queens",
      },
      {
        id: "2",
        name: "My Blueberry",
      },
      {
        id: "3",
        name: "Current Project",
      },
      {
        id: "4",
        name: "Retrievo",
      },
    ],
    currentProject: {
      id: "4",
      name: "Retrievo",
    },
    onProjectSelect: (id: string) => console.log(id),
    avatars: [
      {
        name: "stupy",
        src:
          "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      },
      {
        name: "prettie",
        src:
          "https://images.unsplash.com/photo-1592159371936-61a70cbeb5f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGhhbXN0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      },
      {
        name: "bunny",
        src:
          "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      },
      {
        name: "cuttie pie",
        src:
          "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      },
    ],
  };

  return (
    <>
      <TopNav {...args} />
      <SideNav />
      <Box display="flex" ml={210} mt={50}>
        <Box w="100%" p={9}>
          <Box>
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
      </Box>
    </>
  );
};

export default Sprint;

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";

import { BsThreeDotsVertical } from "react-icons/bs";
import TaskList from "./TaskList";
import { sprintType } from "./index";

type sprintItemProps = {
  sprintData: sprintType;
  ref?: HTMLElement;
  mappedIndex: number;
};

export const SprintItem: React.FC<sprintItemProps> = ({
  sprintData,
  mappedIndex,
}) => {
  const [selected, setSelected] = useState<boolean>(mappedIndex === 0);

  return (
    <Draggable
      key={sprintData.id}
      draggableId={sprintData.id}
      index={mappedIndex}
    >
      {(provided) => {
        return (
          <Accordion
            allowToggle
            onChange={() => setSelected(!selected)}
            defaultIndex={mappedIndex === 0 ? 0 : 1}
          >
            <AccordionItem>
              <Flex
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                alignItems="center"
                bgColor={selected ? "primary.400" : "achromatic.100"}
                p={2}
              >
                <Center w="40px" h="40px" overflow="hidden">
                  <AccordionButton
                    p="8px"
                    w="100%"
                    h="100%"
                    display="flex"
                    justifyContent="center"
                    _hover={{
                      bg: "primary.400",
                      borderRadius: "9999px",
                      transition: "ease 0.3s",
                    }}
                    _focus={{ outline: "none" }}
                  >
                    <AccordionIcon fontSize="2rem" />
                  </AccordionButton>
                </Center>
                <Box flex="1" ml={3} textAlign="left">
                  {sprintData.title}
                </Box>
                <Flex
                  justifyContent="flex-end"
                  p={3}
                  visibility={selected ? "visible" : "hidden"}
                >
                  <Menu>
                    <MenuButton
                      as={Button}
                      p={3}
                      border="none"
                      backgroundColor="transparent"
                      outline="none"
                      _hover={{
                        outline: "none",
                        backgroundColor: "transparent",
                      }}
                      _focus={{
                        outline: "none",
                        backgroundColor: "transparent",
                      }}
                      color="achromatic.600"
                      fontSize="xl"
                    >
                      <BsThreeDotsVertical />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Update Sprint</MenuItem>
                      <MenuItem>Delete Sprint</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
              <TaskList />
            </AccordionItem>
          </Accordion>
        );
      }}
    </Draggable>
  );
};

export default SprintItem;

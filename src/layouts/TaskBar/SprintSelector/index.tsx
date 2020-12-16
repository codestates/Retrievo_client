import React, { useState } from "react";
import { Box, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi";

type sprint = { id: string; title: string };

export type SprintListDropdownPropsType = {
  sprints: sprint[] | undefined | null;
  currentSprint?: sprint;
  onSprintSelect: (projectId: string) => void;
};

const SprintListDropdown: React.FC<SprintListDropdownPropsType> = ({
  sprints,
  currentSprint,
  onSprintSelect: onProjectSelect,
}) => {
  const [selectedProject, setSelectedProject] = useState(currentSprint || null);
  const renderSprints = () => {
    return sprints?.map((sprint: sprint) => {
      return (
        <MenuItem
          key={sprint.id}
          value={sprint.title}
          backgroundColor={
            selectedProject?.id === sprint.id ? "primary.400" : "achromatic.100"
          }
          onClick={() => {
            setSelectedProject(sprint);
            onProjectSelect(sprint.id);
          }}
        >
          {sprint.title}
        </MenuItem>
      );
    });
  };

  return (
    <Menu>
      <MenuButton
        px=".6rem"
        py={1}
        bgColor="achromatic.100"
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        borderColor="achromatic.400"
        _focus={{ outline: 0, boxShadow: "outline" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          color="achromatic.600"
        >
          {selectedProject ? selectedProject.title : "Select Project"}
          <Box
            borderLeft="1px"
            borderColor="achromatic.400"
            paddingLeft=".3rem"
            marginLeft="2"
            color="achromatic.400"
          >
            <HiChevronDown size="1.4rem" />
          </Box>
        </Box>
      </MenuButton>
      <MenuList>{renderSprints()}</MenuList>
    </Menu>
  );
};

export default SprintListDropdown;

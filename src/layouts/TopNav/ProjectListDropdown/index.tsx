import React, { useState } from "react";
// import { Select } from "@chakra-ui/react";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  // MenuItemOption,
  // MenuGroup,
  // MenuOptionGroup,
  // MenuIcon,
  // MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import { FaCaretDown } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

type project = { id: string; name: string };

export type ProjectListDropdownPropsType = {
  projects: project[];
  currentProject?: project;
  onProjectSelect: (projectId: string) => void;
};

const ProjectListDropdown: React.FC<ProjectListDropdownPropsType> = ({
  projects,
  currentProject,
  onProjectSelect,
}) => {
  const [selectedProject, setSelectedProject] = useState(
    currentProject || null
  );
  const renderProjects = () => {
    return projects?.map((project: project) => {
      return (
        <MenuItem
          key={project.id}
          // fontWeight={selectedProject?.id === project.id ? "bold" : "normal"}
          value={project.name}
          backgroundColor={
            selectedProject?.id === project.id
              ? "primary.400"
              : "achromatic.100"
          }
          onClick={() => {
            setSelectedProject(project);
            onProjectSelect(project.id);
          }}
          _hover={{ bg: "achromatic.200" }}
        >
          {project.name}
        </MenuItem>
      );
      // return (
      //   <option
      //     key={project.id}
      //     value={project.id}
      //     selected={currentProject?.id === project.id}
      //   >
      //     {project.name}
      //   </option>
      // );
    });
  };

  return (
    <Menu>
      <MenuButton
        px={4}
        py={1}
        w={230}
        bgColor="achromatic.100"
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: "primary.400" }}
        // _expanded={{ bg: "red.200" }}
        _focus={{ outline: 0, boxShadow: "outline" }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {selectedProject ? selectedProject.name : "Select Project"}
          <FaCaretDown />
        </Box>
      </MenuButton>
      <MenuList>
        {renderProjects()}
        <MenuDivider />
        <a href="/newProject">
          <MenuItem _hover={{ bg: "achromatic.200" }}>
            <Box mx={1}>
              <AiOutlinePlus />
            </Box>
            New Project
          </MenuItem>
        </a>
      </MenuList>
    </Menu>
    // <Select fontSize="sm" placeholder="Select Your Project">
    //   {renderProjects()}
    // </Select>
  );
};

export default ProjectListDropdown;

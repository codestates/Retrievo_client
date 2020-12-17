import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { FaCaretDown } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { ProjectPermission as projectType } from "../../../generated/graphql";

export type ProjectListDropdownPropsType = {
  projectPermissions: projectType[] | undefined;
  currentProject?: projectType;
};

const ProjectListDropdown: React.FC<ProjectListDropdownPropsType> = ({
  projectPermissions,
  currentProject,
}) => {
  // const [selectedProject, setSelectedProject] = useState(
  //   currentProject || null
  // );

  const renderProjects = () => {
    return projectPermissions?.map(({ project }: projectType, index) => {
      if (!project) return null;
      return (
        <Link key={project.id} to={`/project/dashboard/${project.id}`}>
          <MenuItem
            value={project.name}
            // value="dummy"
            backgroundColor={
              currentProject?.project?.id === project.id
                ? "violetBg"
                : "achromatic.100"
            }
            // onClick={() => {
            //   setSelectedProject(project);
            // }}
            _hover={{ bg: "achromatic.200" }}
          >
            {project.name}
          </MenuItem>
        </Link>
      );
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
        _focus={{ outline: 0, boxShadow: "outline" }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {currentProject && currentProject.project && currentProject.project.id
            ? currentProject.project.name?.slice(0, 20)
            : "Select Project"}
          <FaCaretDown />
        </Box>
      </MenuButton>
      <MenuList>
        {renderProjects()}
        <MenuDivider />
        <Link to="/new-project">
          <MenuItem _hover={{ bg: "achromatic.200" }}>
            <Box mx={1}>
              <AiOutlinePlus />
            </Box>
            New Project
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default ProjectListDropdown;

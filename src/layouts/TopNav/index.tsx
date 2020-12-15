import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { GiSittingDog } from "react-icons/gi";
import { IconContext } from "react-icons";
import Heading, { headingEnum } from "../../components/Heading";
import ProjectListDropdown, {
  ProjectListDropdownPropsType,
} from "./ProjectListDropdown";
import IconButton, { IconButtonType } from "../../components/IconButton";
import AvatarGroup, { AvatarSize } from "../../components/AvatarGroup";

type avatar = { name: string; src: string };

export type TopNavPropsType = ProjectListDropdownPropsType & {
  avatars: avatar[];
};

const TopNav: React.FC<TopNavPropsType> = ({
  avatars,
  projects,
  currentProject,
  onProjectSelect,
}) => {
  const projectConfig = { projects, currentProject, onProjectSelect };
  const changeIconColor = () => {
    return (
      <>
        <IconContext.Provider value={{ color: "#4F4F4F", size: "25" }}>
          <GiSittingDog />
        </IconContext.Provider>
      </>
    );
  };
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      zIndex={999}
      bg="achromatic.200"
      w="100%"
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={10}
      h={50}
      boxShadow="0 2px 2px rgba(0,0,0,0.1)"
      z-index="1"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width={450}
      >
        <Box display="flex" alignItems="center">
          {/* <GiSittingDog size={25} color="achromatic.700" /> */}
          {changeIconColor()}
          <Link to="/">
            <Heading ml={1} headingType={headingEnum.homepage}>
              Retrievo
            </Heading>
          </Link>
        </Box>
        <ProjectListDropdown {...projectConfig} />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        // w={270}
        w={180}
      >
        <AvatarGroup avatars={avatars} size={AvatarSize.sm} max={3} />
        <Link to="/notification">
          <IconButton
            fontSize="xl"
            color="achromatic.700"
            aria-label="notification"
            iconButtonType={IconButtonType.notification}
          />
        </Link>
        <Link to="/my-profile">
          <IconButton
            fontSize="xl"
            color="achromatic.700"
            aria-label="project member list"
            iconButtonType={IconButtonType.user}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default TopNav;

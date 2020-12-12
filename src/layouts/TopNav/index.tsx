import React from "react";
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

export type TopVarPropsType = ProjectListDropdownPropsType & {
  avatars: avatar[];
};

const TopNav: React.FC<TopVarPropsType> = ({
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
      bg="achromatic.200"
      w="100%"
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={10}
      h={50}
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
          <Heading ml={1} headingType={headingEnum.homepage}>
            Retrievo
          </Heading>
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
        <a href="/notification">
          <IconButton
            fontSize="xl"
            color="achromatic.700"
            aria-label="notification"
            iconButtonType={IconButtonType.notification}
          />
        </a>
        <a href="/myProfile">
          <IconButton
            fontSize="xl"
            color="achromatic.700"
            aria-label="project member list"
            iconButtonType={IconButtonType.user}
          />
        </a>
      </Box>
    </Box>
  );
};

export default TopNav;

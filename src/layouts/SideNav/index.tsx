import React, { ReactElement } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { BiChalkboard, BiCalendarEvent } from "react-icons/bi";
import { CgBoard } from "react-icons/cg";
import { FiClock, FiSettings, FiFastForward } from "react-icons/fi";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { IconContext } from "react-icons";

import Heading from "../../components/Heading";

import IconButton, { IconButtonType } from "../../components/IconButton";
import AvatarGroup, { AvatarSize } from "../../components/AvatarGroup";

// type avatar = { name: string; src: string };

export type SideNavPropsType = {
  // avatars: avatar[];
};

export type MenuType = {
  path: string;
  name: string;
  icon: ReactElement;
  currnetPage?: boolean;
};

const sideBarMenu = [
  { name: "Dashboard", icon: <BiChalkboard />, path: "/project/dashboard" },
  { name: "Sprint", icon: <FiFastForward />, path: "/project/sprint" },
  { name: "Board", icon: <CgBoard />, path: "/project/board" },
  { name: "Timeline", icon: <FiClock />, path: "/project/timeline" },
  { name: "Calendar", icon: <BiCalendarEvent />, path: "/project/calendar" },
  { name: "Setting", icon: <FiSettings />, path: "/project/setting" },
];

const SideNav: React.FC<SideNavPropsType> = () => {
  // const projectConfig = { projects, currentProject, onProjectSelect };
  // const currnetPage = "Sprint";
  const changeIconColor = (icon: ReactElement) => {
    return (
      <Box mx={3}>
        <IconContext.Provider value={{ color: "#31D5BF", size: "25" }}>
          {icon}
        </IconContext.Provider>
      </Box>
    );
  };

  const renderMenu = () => {
    return sideBarMenu.map((menu) => {
      return (
        <a href={menu.path} key={menu.name}>
          <Box
            bg={
              window.location.pathname.includes(menu.path)
                ? "primary.400"
                : "transparent"
            }
            h={55}
            fontWight="medium"
            color={
              window.location.pathname.includes(menu.path)
                ? "achromatic.800"
                : "achromatic.600"
            }
            _hover={{ backgroundColor: "achromatic.300", cursor: "pointer" }}
            display="flex"
            alignItems="center"
            borderLeft={`5px solid ${
              window.location.pathname.includes(menu.path)
                ? "#3949AB"
                : "#F5F5F5"
            }`}
          >
            {changeIconColor(menu.icon)}
            {menu.name}
          </Box>
        </a>
      );
    });
  };
  return (
    <Box
      bg="achromatic.200"
      h="100vh"
      w={210}
      display="flex"
      flexDirection="column"
      boxShadow="2px 0px 2px rgba(0,0,0,0.1)"
    >
      <Box
        h={55}
        color="achromatic.600"
        _hover={{ cursor: "pointer" }}
        display="flex"
        alignItems="center"
        borderLeft="5px solid transparent"
        borderBottom="1px solid lightGray"
      >
        {changeIconColor(<AiOutlineDoubleLeft />)}
        Hide side bar
      </Box>
      {renderMenu()}
    </Box>
  );
};

// TODO : setCurrentPage vs windowPath

export default SideNav;

import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { BiChalkboard, BiCalendarEvent } from "react-icons/bi";
import { CgBoard } from "react-icons/cg";
import { FiClock, FiSettings, FiFastForward } from "react-icons/fi";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { IconContext } from "react-icons";

export type MenuType = {
  path: string;
  name: string;
  icon: ReactElement;
  description: string;
};

export const sideBarMenu = [
  {
    name: "Dashboard",
    icon: <BiChalkboard />,
    path: "/project/dashboard",
    description: "Monitor status of individual tasks",
  },
  {
    name: "Sprint",
    icon: <FiFastForward />,
    path: "/project/sprint",
    description: "Manage your projects' sprints and tasks",
  },
  {
    name: "Board",
    icon: <CgBoard />,
    path: "/project/board",
    description: "Manage your tasks by task status on kanban board",
  },
  {
    name: "Timeline",
    icon: <FiClock />,
    path: "/project/timeline",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
  },
  {
    name: "Calendar",
    icon: <BiCalendarEvent />,
    path: "/project/calendar",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    name: "Setting",
    icon: <FiSettings />,
    path: "/project/setting",
    description: "Manage team members' access permission ",
  },
];

const SideNav = (): ReactElement => {
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
    // FIXME
    const projectId = "projectId";

    return sideBarMenu.map((menu) => {
      return (
        <Link to={`${menu.path}/${projectId}`} key={menu.name}>
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
        </Link>
      );
    });
  };
  return (
    <Box
      position="fixed"
      zIndex={999}
      top={50}
      left={0}
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

export default SideNav;

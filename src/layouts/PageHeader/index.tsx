import React, { useState, useEffect, ReactElement } from "react";
import { Box, HeadingProps as ChakraHeadingPropsType } from "@chakra-ui/react";
import _ from "lodash";
import { IconContext } from "react-icons";
import Heading, { headingEnum } from "../../components/Heading";
import { MenuType, sideBarMenu } from "../SideNav";
import Text from "../../components/Text";

const PageHeading: React.FC<ChakraHeadingPropsType> = () => {
  const [currentPage, setCurrentPage] = useState<MenuType>();

  const changeIconColor = (icon: ReactElement) => {
    return (
      <Box mx={3}>
        <IconContext.Provider value={{ color: "#31D5BF", size: "50" }}>
          {icon}
        </IconContext.Provider>
      </Box>
    );
  };

  useEffect(() => {
    const windowPath = window.location.pathname;
    const foundPage =
      _.find(sideBarMenu, (page) => windowPath.includes(page.path)) ||
      sideBarMenu[0];
    setCurrentPage(foundPage);
  }, []);

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {changeIconColor(currentPage?.icon || sideBarMenu[0].icon)}
      <Box>
        <Heading headingType={headingEnum.page}>
          {currentPage?.name || sideBarMenu[0].name}
        </Heading>
        <Text color="achromatic.600">
          {currentPage?.description || sideBarMenu[0].description}
        </Text>
      </Box>
    </Box>
  );
};

export default PageHeading;

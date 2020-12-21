import React from "react";
import { Box } from "@chakra-ui/react";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import CommingSoon from "../ComingSoon";

export const Calendar: React.FC<Record<string, never>> = () => {
  return (
    <>
      <TopNav />
      <SideNav />
      <Box display="flex" ml={210} mt={50}>
        <CommingSoon />
      </Box>
    </>
  );
};

export default Calendar;

import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import CommingSoon from "../CommingSoon";

interface TimelineType {
  projectId: string;
}
export const Timeline: React.FC<RouteComponentProps<TimelineType>> = ({
  ...args
}) => {
  return (
    <>
      <TopNav {...args} />
      <SideNav {...args} />
      <Box display="flex" ml={210} mt={50}>
        <CommingSoon />
      </Box>
    </>
  );
};

export default Timeline;

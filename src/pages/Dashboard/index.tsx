import React from "react";
import { RouteComponentProps } from "react-router-dom";

/* Layouts */
import { Box } from "@chakra-ui/react";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import PageHeading from "../../layouts/PageHeader";
/* Child-Components */
import MyTasks from "./MyTasks";
import ActivityStream from "./ActivityStream";
import ReportHero from "./ReportHero";
import ReportCard from "./ReportCard";
import Charts from "./Charts";

interface DashBoardType {
  projectId: string;
}

export const Dashboard: React.FC<RouteComponentProps<DashBoardType>> = ({
  ...args
}) => {
  return (
    <>
      <Box>
        <TopNav {...args} />
        <SideNav {...args} />
        <Box display="flex">
          <Box w="100%" p={9} ml={210} mt={50}>
            <PageHeading />
            <Box mt={9}>
              <MyTasks />
            </Box>
            <Box mt={9}>
              <ActivityStream />
            </Box>
            <Box mt={9}>
              <ReportHero />
            </Box>
            <Box mt={9}>
              <ReportCard />
            </Box>
            <Box mt={9} mb={20}>
              <Charts />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;

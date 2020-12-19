import React from "react";

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

export const Dashboard: React.FC<Record<string, never>> = () => {
  return (
    <>
      <Box>
        <TopNav />
        <SideNav />
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

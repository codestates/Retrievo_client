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

import Text from "../../components/Text";
// interface indexProps {

// }

// liveserver data 로 만들어줘야함.
const args = {
  projects: [
    {
      id: "1",
      name: "Rock Paper Queens",
    },
    {
      id: "2",
      name: "My Blueberry",
    },
    {
      id: "3",
      name: "Current Project",
    },
    {
      id: "4",
      name: "Retrievo",
    },
  ],
  currentProject: {
    id: "4",
    name: "Retrievo",
  },
  onProjectSelect: (id: string) => console.log(id),
  avatars: [
    {
      name: "stupy",
      src:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "prettie",
      src:
        "https://images.unsplash.com/photo-1592159371936-61a70cbeb5f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGhhbXN0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "bunny",
      src:
        "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "cuttie pie",
      src:
        "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
  ],
};

export const Dashboard: React.FC = () => {
  return (
    <>
      <Box>
        <TopNav {...args} />
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

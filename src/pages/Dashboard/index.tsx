import React, { useState, useEffect } from "react";

/* Layouts */
import { Box, useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import PageHeading from "../../layouts/PageHeader";
import TaskBar from "../../layouts/TaskBar";
/* Child-Components */
import MyTasks from "./MyTasks";
import ActivityStream from "./ActivityStream";
import ReportHero from "./ReportHero";
import ReportCard from "./ReportCard";
import Charts from "./Charts";

export const Dashboard: React.FC<Record<string, never>> = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { projectId } = useParams<{ projectId: string }>();
  console.log("proejctId Param Dashboard:", projectId);

  useEffect(() => {
    if (selectedTask) {
      onOpen();
    } else {
      onClose();
    }
  }, [selectedTask, onOpen, onClose]);

  return (
    <>
      <Box>
        <TopNav />
        <SideNav />
        <Box display="flex">
          <Box w="100%" p={9} ml={210} mt={50}>
            <PageHeading />
            <Box mt={9}>
              <MyTasks setSelectedTask={setSelectedTask} />
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
        {selectedTask ? (
          <TaskBar
            taskId={selectedTask}
            isOpen={isOpen}
            onClose={() => {
              onClose();
              setSelectedTask(null);
            }}
          />
        ) : null}
      </Box>
    </>
  );
};

export default Dashboard;

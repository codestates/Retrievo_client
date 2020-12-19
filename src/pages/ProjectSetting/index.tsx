import { Box } from "@chakra-ui/react";
import React from "react";
import PageHeading from "../../layouts/PageHeader";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import AccessPermission from "./AccessPermission";
import BasicSetting from "./BasicDetail";

export const ProjectSetting: React.FC<Record<string, never>> = () => {
  return (
    <>
      <TopNav />
      <SideNav />
      <Box display="flex" ml={210} mt={50}>
        <Box w="100%" p={9}>
          <Box>
            <PageHeading />
          </Box>
          <Box mt={9}>
            <BasicSetting />
            <AccessPermission />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProjectSetting;

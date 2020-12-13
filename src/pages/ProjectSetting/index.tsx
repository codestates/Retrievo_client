import { Box } from "@chakra-ui/react";
import React from "react";
import PageHeading from "../../layouts/PageHeader";
import AccessPermission from "./AccessPermission";
import BasicSetting from "./BasicDetail";

export const ProjectSetting: React.FC = () => {
  return (
    <>
      <Box mt={6} mb={9}>
        <PageHeading />
      </Box>
      <BasicSetting />
      <AccessPermission />
    </>
  );
};

export default ProjectSetting;

import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./styles/theme";
import TopNav from "./layouts/TopNav";
import SideNav from "./layouts/SideNav";
import PageHeading from "./layouts/PageHeader";

const avatars = [
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
];

const projects = [
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
];
const currentProject = {
  id: "4",
  name: "Retrievo",
};

const onSubmit = (projectId: string) => console.log(projectId);

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <TopNav
          avatars={avatars}
          currentProject={currentProject}
          projects={projects}
          onProjectSelect={onSubmit}
        />
        <Box display="flex" flexDirection="row" alignItems="start">
          <SideNav />
          <Box margin="7">
            <PageHeading />
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;

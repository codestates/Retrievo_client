import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Redirect, Route } from "react-router-dom";
import theme from "./styles/theme";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import NewProject from "./pages/NewProject";
import ProjectSetting from "./pages/ProjectSetting";
import Board from "./pages/Board";
import Auth from "./pages/Auth";
import Sprint from "./pages/Sprint";
import Landing from "./pages/Landing";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Route exact path="/" component={Landing} />
        <Route path="/auth/:projectId" component={Auth} />
        <Route path="/project/dashboard/:projectId" component={Dashboard} />
        <Route path="/project/board/:projectId" component={Board} />
        <Route path="/project/sprint/:projectId" component={Sprint} />
        <Route path="/project/setting/:projectId" component={ProjectSetting} />
        <Route path="/new-project" component={NewProject} />
        <Route path="/my-profile" component={MyProfile} />
        {/* <Redirect path="*" to="/" /> */}
      </ChakraProvider>
    </>
  );
};

export default App;

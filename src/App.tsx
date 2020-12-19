import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Redirect, Route, Switch } from "react-router-dom";
import theme from "./styles/theme";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import NewProject from "./pages/NewProject";
import ProjectSetting from "./pages/ProjectSetting";
import Board from "./pages/Board";
import Auth from "./pages/Auth";
import Sprint from "./pages/Sprint";
import Landing from "./pages/Landing";
import NotFound from "./pages/404";
import Timeline from "./pages/Timeline";
import Calendar from "./pages/Calendar";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/auth/:type" component={Auth} />
          <Route path="/project/dashboard/:projectId" component={Dashboard} />
          <Route path="/project/board/:projectId" component={Board} />
          <Route path="/project/sprint/:projectId" component={Sprint} />
          <Route path="/project/timeline/:projectId" component={Timeline} />
          <Route path="/project/calendar/:projectId" component={Calendar} />
          <Route
            path="/project/setting/:projectId"
            component={ProjectSetting}
          />
          <Route path="/new-project" component={NewProject} />
          <Route path="/my-profile" component={MyProfile} />
          <Route path="/not-found" component={NotFound} />
          {/* <Redirect path="*" to="/" /> */}
        </Switch>
      </ChakraProvider>
    </>
  );
};

export default App;

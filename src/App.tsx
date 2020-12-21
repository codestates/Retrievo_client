import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Switch, Redirect } from "react-router-dom";
import theme from "./styles/theme";
import ROUTE from "./utils/RoutePath";

/* components */
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
import Invitation from "./pages/Invitation";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route exact path={ROUTE.LANDING} component={Landing} />
          <Route path={ROUTE.AUTH} component={Auth} />
          <Route path={ROUTE.DASHBOARD} component={Dashboard} />
          <Route path={ROUTE.BOARD} component={Board} />
          <Route path={ROUTE.SPRINT} component={Sprint} />
          <Route path={ROUTE.TIMELINE} component={Timeline} />
          <Route path={ROUTE.CALENDAR} component={Calendar} />
          <Route path={ROUTE.PROJECT_SETTING} component={ProjectSetting} />
          <Route path={ROUTE.NEW_PROJECT} component={NewProject} />
          <Route path={ROUTE.MY_PROFILE} component={MyProfile} />
          <Route path={ROUTE.NOT_FOUND} component={NotFound} />
          <Route path={ROUTE.INVITATION} component={Invitation} />
          <Redirect path="/project" to={ROUTE.LANDING} />
          <Redirect path="*" to={ROUTE.NOT_FOUND} />
        </Switch>
      </ChakraProvider>
    </>
  );
};

export default App;

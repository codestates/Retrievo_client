import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Redirect, Route, Switch } from "react-router-dom";
import theme from "./styles/theme";
import PrivateRoute from "./utils/privateRoute";
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

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route exact path={ROUTE.LANDING} component={Landing} />
          <Route path={ROUTE.AUTH} component={Auth} />
          <PrivateRoute
            path={ROUTE.DASHBOARD}
            component={Dashboard}
            redirect={ROUTE.AUTH}
            permission="projectId"
          />
          <PrivateRoute
            path={ROUTE.BOARD}
            component={Board}
            redirect={ROUTE.AUTH}
            permission="projectId"
          />
          <PrivateRoute
            path={ROUTE.SPRINT}
            component={Sprint}
            redirect={ROUTE.AUTH}
            permission="projectId"
          />
          <PrivateRoute
            path={ROUTE.TIMELINE}
            component={Timeline}
            redirect={ROUTE.AUTH}
            permission="projectId"
          />
          <PrivateRoute
            path={ROUTE.CALENDAR}
            component={Calendar}
            redirect={ROUTE.AUTH}
            permission="projectId"
          />
          <PrivateRoute
            path={ROUTE.PROJECT_SETTING}
            component={ProjectSetting}
            redirect={ROUTE.AUTH}
            permission="projectId"
          />
          <PrivateRoute
            path={ROUTE.NEW_PROJECT}
            component={NewProject}
            redirect={ROUTE.AUTH}
            permission="projectId"
          />
          <PrivateRoute
            path={ROUTE.MY_PROFILE}
            component={MyProfile}
            redirect={ROUTE.AUTH}
            permission="projectId"
          />
          <Route path={ROUTE.NOT_FOUND} component={NotFound} />
          {/* <Redirect path="*" to={ROUTE.NOT_FOUND} /> */}
        </Switch>
      </ChakraProvider>
    </>
  );
};

export default App;

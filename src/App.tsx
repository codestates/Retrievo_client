import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import theme from "./styles/theme";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import NewProject from "./pages/NewProject";
import ProjectSetting from "./pages/ProjectSetting";
import Auth from "./pages/Auth";
// import Sprint from "./pages/Sprint";
import Landing from "./pages/Landing";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Route exact path="/" component={Landing} />
        <Route path="/auth" component={Auth} />
        <Route path="/project/dashboard/:id" component={Dashboard} />
        {/* <Route path="/project/sprint/:id" component={Sprint} /> */}
        {/* <Route path="/project/board/:id" component={Board} /> */}
        <Route path="/project/setting/:id" component={ProjectSetting} />
        <Route path="/new-project" component={NewProject} />
        <Route path="/my-profile" component={MyProfile} />
      </ChakraProvider>
    </>
  );
};

export default App;

/* eslint-disable indent */
import React from "react";
import { Route, Redirect, useParams } from "react-router-dom";
import ROUTES from "./RoutePath";
// import useParams from "../hooks/useProjectParam";

export type permissionType = "projectId" | "isSignIn" | "isNotSignIn";

interface routeProps {
  component: React.FC<any>;
  exact?: boolean;
  path: string;
}

export const ProjectRoute: React.FC<routeProps> = ({ ...rest }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const isProjectId = !!projectId;

  const generateRoute = (validation: boolean) => {
    return validation ? <Route {...rest} /> : <Redirect to={ROUTES.AUTH} />;
  };

  return generateRoute(isProjectId);
};

export default ProjectRoute;

/**

import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function BlogPost() {
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>;
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/blog/:slug">
        <BlogPost />
      </Route>
    </Switch>
  </Router>,
  node
);
 */

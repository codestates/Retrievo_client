/* eslint-disable indent */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import ROUTES from "./RoutePath";
import useQuery from "../hooks/useQuery";

export type permissionType = "projectId" | "isSignIn" | "isNotSignIn";

interface routeProps {
  component: React.FC<any>;
  exact?: boolean;
  path: string;
}

export const ProjectRoute: React.FC<routeProps> = ({ ...rest }) => {
  const query = useQuery();
  const projectId = query.get("projectId");
  const isProjectId = !!projectId;

  const generateRoute = (validation: boolean) => {
    return validation ? <Route {...rest} /> : <Redirect to={ROUTES.AUTH} />;
  };

  return generateRoute(isProjectId);
};

export default ProjectRoute;

/* eslint-disable indent */
import React from "react";
import useCookies from "react-cookie/es6/useCookies";
import { Route, Redirect, useParams } from "react-router-dom";
import ROUTES from "./RoutePath";

export type permissionType = "projectId" | "isSignIn" | "isNotSignIn";

interface routeProps {
  component: React.FC<any>;
  permission: permissionType;
  exact?: boolean;
  path: string;
  redirect: string;
}

interface RouteParams {
  projectId: string;
}

export const PrivateRoute: React.FC<routeProps> = ({
  permission,
  redirect,
  ...rest
}) => {
  const {
    LANDING,
    AUTH,
    DASHBOARD,
    BOARD,
    SPRINT,
    TIMELINE,
    CALENDAR,
    PROJECT_SETTING,
    NEW_PROJECT,
    MY_PROFILE,
    NOT_FOUND,
  } = ROUTES;

  const [cookies] = useCookies(["ret_id"]);
  const { projectId } = useParams<RouteParams>();

  console.log("라우트 가드 진입!!!");
  console.log("projectId:", projectId);
  console.log("cookies:", cookies);
  const isSession = !!cookies;
  const isProjectId = !!projectId;

  const generateRoute = (validation: boolean) => {
    return validation ? <Route {...rest} /> : <Redirect to={redirect} />;
  };

  switch (permission) {
    case "projectId":
      console.log("projectId type");
      return generateRoute(isProjectId);
    case "isSignIn":
      console.log("isSignin type");
      return generateRoute(isSession);
    case "isNotSignIn":
      console.log("isNotSignIn type");
      return generateRoute(!isSession);
    default:
      return <Route {...rest} />;
  }
};

export default PrivateRoute;

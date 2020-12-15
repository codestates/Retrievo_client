import React from "react";
import { useHistory } from "react-router-dom";
import { useGetMeLazyQuery } from "../../generated/graphql";

export const useProjectRoute = () => {
  const [getMe, { loading, data }] = useGetMeLazyQuery();
  const history = useHistory();

  if (data) {
    if (data?.getMe.user?.projectPermissions[0]) {
      history.push(
        `/project/dashboard/${data.getMe.user.projectPermissions[0].project.id}`
      );
    } else {
      history.push("/new-project");
    }
  }

  return { routeToProject: getMe };
};

export default useProjectRoute;

import React from "react";
import { useHistory } from "react-router-dom";
import { useGetMeLazyQuery } from "../../generated/graphql";

export const useProjectRoute = () => {
  const [getMe, { data, refetch }] = useGetMeLazyQuery({
    fetchPolicy: "network-only",
  });
  const history = useHistory();

  // 유저가 이미 getMe를 실행했던 경우 그 전의 getMe를 기억하고 있음
  // 유저가 이미 cache를 갖고 있어도 서버에서 getMe를 받아오고 싶음

  console.log("getMe data:", data);

  if (data) {
    if (data?.getMe.user?.projectPermissions[0]) {
      history.push(
        `/project/dashboard?projectId=${data.getMe.user.projectPermissions[0].project.id}`
      );
    } else {
      history.push("/new-project");
    }
  }

  return { routeToProject: refetch || getMe };
};

export default useProjectRoute;

import { useParams } from "react-router-dom";

// OtherDetail.tsx
import React from "react";

interface RouteParams {
  projectId: string | undefined;
}

export const useProjectParams = (): string | undefined => {
  const { projectId } = useParams<RouteParams>();
  return projectId;
};

export default useProjectParams;

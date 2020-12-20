/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Chart from "../../../components/Chart";
import { chartVariant } from "../../../components/Chart/types";
import Spinner from "../../../components/Spinner";
import { useGetReportSummaryQuery } from "../../../generated/graphql";
import { useQuery } from "../../../hooks/useQuery";

export const TasksByAssignee: React.FC = () => {
  const urlQuery = useQuery();
  const projectId = urlQuery.get("projectId");
  if (!projectId) return null;

  const { data, loading } = useGetReportSummaryQuery({
    variables: { projectId },
  });

  if (loading) return <Spinner />;
  return (
    <>
      <Chart
        variant={chartVariant.tasksByAssignee}
        data={data?.reportSummary.tasksByAssignee}
      />
    </>
  );
};

export default TasksByAssignee;

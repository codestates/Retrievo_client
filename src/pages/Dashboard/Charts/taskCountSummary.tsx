import React from "react";
import { useLocation } from "react-router-dom";
import Chart from "../../../components/Chart";
import { chartVariant } from "../../../components/Chart/types";
import Spinner from "../../../components/Spinner";
import { useGetReportSummaryQuery } from "../../../generated/graphql";

export const TasksCountSummary: React.FC = () => {
  const location = useLocation();
  const projectId = location.pathname.split("/").pop() || "";
  const { data, loading } = useGetReportSummaryQuery({
    variables: { projectId },
  });
  console.log("chartSummary", data);
  if (loading) return <Spinner />;

  return (
    <>
      <Chart
        variant={chartVariant.taskCountSummary}
        data={data?.reportSummary.taskCountSummary}
      />
    </>
  );
};

export default TasksCountSummary;

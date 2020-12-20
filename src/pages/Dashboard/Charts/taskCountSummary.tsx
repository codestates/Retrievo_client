/* eslint-disable react-hooks/rules-of-hooks */
import { Center } from "@chakra-ui/react";
import React from "react";
import Chart from "../../../components/Chart";
import { chartVariant } from "../../../components/Chart/types";
import Spinner from "../../../components/Spinner";
import { useGetReportSummaryQuery } from "../../../generated/graphql";
import { useQuery } from "../../../hooks/useQuery";

export const TasksCountSummary: React.FC = () => {
  const urlQuery = useQuery();
  const projectId = urlQuery.get("projectId");
  if (!projectId) return null;

  const { data, loading } = useGetReportSummaryQuery({
    variables: { projectId },
  });

  if (loading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

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

import { Center } from "@chakra-ui/react";
import React from "react";
import Chart from "../../../components/Chart";
import { chartVariant } from "../../../components/Chart/types";
import Spinner from "../../../components/Spinner";
import { useGetReportSummaryQuery } from "../../../generated/graphql";
import useProjectIdParam from "../../../hooks/useProjectParam";

export const IncompleteTasks: React.FC = () => {
  const projectId = useProjectIdParam();
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
        variant={chartVariant.incompleteTaskStatus}
        data={data?.reportSummary.incompleteTaskStatus}
      />
    </>
  );
};

export default IncompleteTasks;

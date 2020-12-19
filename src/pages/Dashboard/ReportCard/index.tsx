import {
  Container,
  Box,
  Flex,
  Divider,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import React from "react";
import Spinner from "../../../components/Spinner";
import { useGetReportSummaryQuery } from "../../../generated/graphql";
import { useQuery } from "../../../hooks/useQuery";

export const ReportCard: React.FC = () => {
  const urlQuery = useQuery();
  const projectId = urlQuery.get("projectId");
  if (!projectId) return null;

  const { data, loading } = useGetReportSummaryQuery({
    variables: { projectId },
  });
  if (loading) return <Spinner />;

  return (
    <Container maxW="60%">
      <Flex
        boxShadow="lg"
        borderRadius="12px"
        border="1px"
        borderColor="achromatic.200"
        pt={4}
        pb={4}
      >
        <Stack
          direction="row"
          h="100px"
          p={2}
          w="25%"
          justifyContent="center"
          textAlign="center"
          flexDirection="column"
        >
          <Text fontSize="2rem" fontWeight="bold" color="achromatic.700">
            {data?.reportSummary.taskCountSummary?.totalTasksCount}
          </Text>
          <Text fontSize="sm" color="achromatic.600">
            Total Task
          </Text>
        </Stack>

        <Stack direction="row" h="100px" w="25%">
          <Divider orientation="vertical" borderLeftWidth="2px" />
          <Center flexDirection="column" width="100%" mr="0.5rem">
            <Text fontSize="2rem" fontWeight="bold">
              {data?.reportSummary.taskCountSummary?.incompleteTasksCount}
            </Text>
            <Text fontSize="sm" color="achromatic.600">
              Incompleted Task
            </Text>
          </Center>
        </Stack>

        <Stack direction="row" h="100px" w="25%">
          <Divider orientation="vertical" borderLeftWidth="2px" />
          <Center flexDirection="column" width="100%" mr="0.5rem">
            <Text fontSize="2rem" fontWeight="bold">
              {data?.reportSummary.taskCountSummary?.completedTasksCount}
            </Text>
            <Text fontSize="sm" color="achromatic.600">
              Completed Task
            </Text>
          </Center>
        </Stack>

        <Stack direction="row" h="100px" w="25%">
          <Divider orientation="vertical" borderLeftWidth="2px" />
          <Center flexDirection="column" width="100%" mr="0.5rem">
            <Text fontSize="2rem" fontWeight="bold">
              {data?.reportSummary.taskCountSummary?.overdueTasksCount}
            </Text>
            <Text fontSize="sm" color="achromatic.600">
              Overdue Task
            </Text>
          </Center>
        </Stack>
      </Flex>

      {/* <Flex borderRadius="1rem" w="100%" p={6} boxShadow="base">
        <Box w="25%">
          <Text>{`${data.overdueTasksCount}`}</Text>
        </Box>
        <Stack direction="row" w="100%" h="100%" p={1}>
          <Divider orientation="vertical" size="5px" />
        </Stack>
        <Box w="25%">{data.completedTasksCount}</Box>
        <Stack direction="row">
          <Divider justifySelf="flex-end" orientation="vertical" />
        </Stack>
        <Box w="25%">{data.incompleteTasksCount}</Box>
        <Stack direction="row">
          <Divider orientation="vertical" />
        </Stack>
        <Box w="25%">
          <Stack direction="row">
            {data.totalTasksCount}
            <Divider orientation="vertical" />
          </Stack>
        </Box>
      </Flex> */}
    </Container>
  );
};

export default ReportCard;

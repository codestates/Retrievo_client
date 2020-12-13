import React from "react";
import { Grid, GridItem, Center, Box } from "@chakra-ui/react";
import IncompleteTasks from "./IncompleteTasks";
import TasksCountSummary from "./taskCountSummary";
import TasksByAssignee from "./TasksByAssignee";

export const Charts: React.FC = () => {
  return (
    <Center>
      <Grid
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
        h="40rem"
        w="60%"
      >
        <GridItem
          rowSpan={1}
          colSpan={1}
          boxShadow="lg"
          borderRadius="8px"
          p={9}
        >
          <IncompleteTasks />
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          boxShadow="lg"
          borderRadius="8px"
          p={9}
          alignItems="center"
        >
          <TasksByAssignee />
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={2}
          boxShadow="lg"
          borderRadius="8px"
          p={9}
        >
          <TasksCountSummary />
        </GridItem>
      </Grid>
    </Center>
  );
};

export default Charts;

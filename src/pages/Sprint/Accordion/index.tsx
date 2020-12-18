import React from "react";
import { Accordion, Box } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";
import SprintItem from "./SprintItem";
import {
  GetSprintsDocument,
  useGetSprintsQuery,
  useUpdateSprintMutation,
} from "../../../generated/graphql";
import Spinner from "../../../components/Spinner";

export const Sprints: React.FC = () => {
  const location = useLocation();
  const projectId = location.pathname.split("/").pop() || "";
  const { data, loading } = useGetSprintsQuery({
    variables: { projectId },
    fetchPolicy: "cache-and-network",
  });
  const sprints = data?.getSprints.sprints;

  const [updateSprintMutation] = useUpdateSprintMutation();

  if (loading) return <Spinner />;
  if (!sprints) return <Spinner />;

  const startedSprint = sprints.find((sprint) => sprint.didStart);
  const completedSprint = sprints.find((sprint) => sprint.isCompleted);

  const onDragEnd = (result: Record<string, any>) => {
    if (!result.destination) return;

    /* fe dnd logic */
    // const items = Array.from(sprints);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);

    updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: result.draggableId,
          row: result.destination.index,
        },
      },
      refetchQueries: [{ query: GetSprintsDocument, variables: { projectId } }],
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box>
        <Droppable droppableId="droppableSprint">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              <Accordion
                allowToggle
                defaultIndex={startedSprint ? startedSprint.row : undefined}
              >
                {sprints ? (
                  sprints.map((sprint: any) => {
                    return (
                      <SprintItem
                        key={sprint.id}
                        sprintData={sprint}
                        row={sprint.row}
                        tasks={sprint.task}
                        startedSprint={startedSprint}
                        completedSprint={completedSprint}
                      />
                    );
                  })
                ) : (
                  <Box>Error</Box>
                )}
              </Accordion>
              {provided.placeholder}
              {/* <pre>{JSON.stringify(sprints, null, 2)}</pre> */}
            </Box>
          )}
        </Droppable>
      </Box>
    </DragDropContext>
  );
};

export default Sprints;

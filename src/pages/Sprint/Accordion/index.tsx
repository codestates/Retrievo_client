import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";
import SprintItem from "./SprintItem";
import {
  useGetSprintsQuery,
  useUpdateSprintMutation,
} from "../../../generated/graphql";
import Spinner from "../../../components/Spinner";

export const Sprints: React.FC = () => {
  const location = useLocation();
  const projectId = location.pathname.split("/").pop() || "";
  const [sprints, setSprints] = useState<Record<string, any>[]>([]);
  const { data, loading, error } = useGetSprintsQuery({
    variables: { projectId },
    fetchPolicy: "cache-and-network",
  });

  const [updateSprintMutation] = useUpdateSprintMutation();

  useEffect(() => {
    if (data?.getSprints.sprints) {
      setSprints(data?.getSprints.sprints);
    }
    console.log("howmany times am i rendering?");
  }, [data]);

  if (loading) return <Spinner />;
  if (!data?.getSprints.sprints) return <Spinner />;

  const onDragEnd = (result: Record<string, any>) => {
    if (!result.destination) return;
    console.log("result", result);

    updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: result.draggableId,
          row: result.destination.index,
        },
      },
      update: (cache, { data }) => {
        console.log(data);
        if (!data) return;
        if (!data.updateSprint.sprint) return;
        const cacheId = cache.identify(data.updateSprint.sprint);
        if (!cacheId) return;
        cache.modify({
          fields: {
            getSprints: (existingSprints, { toReference }) => {
              return [...existingSprints.sprints, toReference(cacheId)];
            },
          },
        });
      },
    });
    const items = Array.from(sprints); // items = sprints
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);
    setSprints(items);
  };

  console.log(data?.getSprints.sprints);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* <pre>{JSON.stringify(sprints, null, 2)}</pre> */}
      <Box>
        <Droppable droppableId="droppableSprint">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {sprints.map((sprint: any) => {
                return (
                  <SprintItem
                    key={sprint.id}
                    sprintData={sprint}
                    row={sprint.row}
                    tasks={sprint.task}
                  />
                );
              })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Box>
    </DragDropContext>
  );
};

export default Sprints;

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Accordion, Box, useToast, useDisclosure } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SprintItem from "./SprintItem";
import {
  GetSprintsDocument,
  useGetSprintsQuery,
  useUpdateSprintMutation,
} from "../../../generated/graphql";
import Spinner from "../../../components/Spinner";
import TaskBar from "../../../layouts/TaskBar";
import useQuery from "../../../hooks/useQuery";

export const Sprints: React.FC = () => {
  const query = useQuery();
  const projectId = query.get("projectId");
  const [selected, setSelected] = useState<null | string>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updateSprintMutation] = useUpdateSprintMutation();
  const toast = useToast();

  if (!projectId) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading } = useGetSprintsQuery({
    variables: { projectId },
  });
  const sprints = data?.getSprints.sprints;

  if (loading) return <Spinner />;
  if (!sprints) return <Spinner />;

  const startedSprint = sprints.find((sprint) => sprint.didStart);
  const completedSprint = sprints.find((sprint) => sprint.isCompleted);

  const onDragEnd = (result: Record<string, any>) => {
    if (!result.destination) return;
    if (startedSprint) {
      if (
        result.draggableId !== startedSprint.id &&
        result.destination.index === 0
      ) {
        toast({
          position: "bottom-right",
          title: "Invalid Action!",
          description: "Started Sprint always has to be on top of the list!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
    }
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
    <>
      {selected ? (
        <TaskBar
          taskId={selected}
          isOpen={isOpen}
          onClose={() => {
            setSelected(null);
            onClose();
          }}
        />
      ) : null}

      <DragDropContext onDragEnd={onDragEnd}>
        <Box>
          <Droppable droppableId="droppableSprint">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                <Accordion
                  allowToggle
                  defaultIndex={startedSprint ? 0 : undefined}
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
                          setSelectedTask={setSelected}
                          selectedTask={selected}
                          onTaskOpen={onOpen}
                        />
                      );
                    })
                  ) : (
                    <Box>Error</Box>
                  )}
                </Accordion>
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      </DragDropContext>
    </>
  );
};

export default Sprints;

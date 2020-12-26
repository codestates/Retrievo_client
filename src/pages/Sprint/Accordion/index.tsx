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
import useProjectIdParam from "../../../hooks/useProjectParam";

export const Sprints: React.FC = () => {
  const projectId = useProjectIdParam();
  const [selected, setSelected] = useState<null | string>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [
    updateSprintMutation,
    { loading: updateSprintLoading },
  ] = useUpdateSprintMutation();
  const toast = useToast();

  if (!projectId) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading } = useGetSprintsQuery({
    variables: { projectId },
  });
  const sprints = data?.getSprints.sprints;

  if (loading) return <Spinner />;
  if (updateSprintLoading) return <Spinner />;
  if (!sprints) return <Spinner />;

  const startedSprint = sprints.find((sprint) => sprint.didStart);
  const completedSprint = sprints.find((sprint) => sprint.isCompleted);

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = async (result: Record<string, any>) => {
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

      if (
        result.draggableId === startedSprint.id &&
        result.destination.index !== 0
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

    const draggableSprint = sprints.find(
      (sprint) => sprint.id === result.draggableId
    );
    if (!draggableSprint?.title) return;

    const res = await updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: result.draggableId,
          row: result.destination.index,
        },
      },
      update: (cache, { data }) => {
        const existingSprintsRef = cache.readQuery<any>({
          query: GetSprintsDocument,
          variables: { projectId },
        });
        console.log(data);
        const existingSprints = existingSprintsRef.getSprints.sprints;
        console.log(result.source.index);
        console.log(result.destination.index);
        if (!data) return;
        if (!data.updateSprint.sprint) return;
        const newSprints = reorder(
          existingSprints,
          result.source.index,
          data.updateSprint.sprint.row
        );
        const newSprintsRef = {
          ...existingSprintsRef,
          getSprints: { sprints: newSprints },
        };
        cache.writeQuery({
          query: GetSprintsDocument,
          variables: { projectId },
          data: newSprintsRef,
        });
        console.log(newSprintsRef);
      },
      // optimisticResponse: {
      //   updateSprint: {
      //     __typename: "SprintResponse",
      //     sprint: {
      //       __typename: "Sprint",
      //       id: result.draggableId,
      //       row: result.destination.index,
      //       title: draggableSprint.title,
      //     },
      //   },
      // },
      // refetchQueries: [{ query: GetSprintsDocument, variables: { projectId } }],
    });

    if (res.data?.updateSprint.error) {
      toast({
        position: "bottom-right",
        title: "Error",
        description: "Server Error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
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
                    sprints.map((sprint) => {
                      return (
                        <SprintItem
                          key={sprint.id}
                          sprintData={sprint}
                          row={sprint.row}
                          tasks={sprint.task}
                          startedSprint={startedSprint}
                          completedSprint={completedSprint}
                          setSelectedTask={setSelected}
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

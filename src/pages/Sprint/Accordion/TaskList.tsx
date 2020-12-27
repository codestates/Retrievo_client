import { AccordionPanel, Box, useToast } from "@chakra-ui/react";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Spinner from "../../../components/Spinner";
import {
  Task,
  useUpdateTaskMutation,
  GetSprintsDocument,
} from "../../../generated/graphql";
import useProjectIdParams from "../../../hooks/useProjectParam";
import TaskListEntry from "./TaskListEntry";

type TaskListPropType = {
  taskData: Task[];
  setSelectedTask: () => void;
  onTaskOpen: () => void;
};

export const TaskList: React.FC<TaskListPropType> = ({
  taskData,
  setSelectedTask,
  onTaskOpen,
}) => {
  const projectId = useProjectIdParams();

  const [updateTaskMutation, { loading }] = useUpdateTaskMutation();
  const toast = useToast();
  if (!projectId) return null;
  if (loading) return <Spinner />;

  const onDragEnd = async (result: Record<string, any>) => {
    if (!result.destination) return;
    const res = await updateTaskMutation({
      variables: {
        projectId,
        options: {
          id: result.draggableId,
          newSprintRowIndex: result.destination.index,
        },
      },
      refetchQueries: [{ query: GetSprintsDocument, variables: { projectId } }],
    });

    if (res.data?.updateTask.error) {
      toast({
        position: "bottom-right",
        title: "Task Update Failed!",
        description: res.data?.updateTask.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AccordionPanel paddingBottom="0.2rem">
        <Droppable droppableId="droppableTask">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {taskData.map((task) => {
                if (typeof task.sprintRowIndex !== "number") return undefined;

                return (
                  <TaskListEntry
                    setSelectedTask={setSelectedTask}
                    onTaskOpen={onTaskOpen}
                    key={task.id}
                    taskData={task}
                    mappedIndex={task.sprintRowIndex}
                  />
                );
              })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </AccordionPanel>
    </DragDropContext>
  );
};

export default TaskList;

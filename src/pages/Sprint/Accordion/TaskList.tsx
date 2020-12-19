import { AccordionPanel, Box } from "@chakra-ui/react";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  Task,
  useUpdateTaskMutation,
  GetSprintsDocument,
} from "../../../generated/graphql";
import useQuery from "../../../hooks/useQuery";
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
  const query = useQuery();
  const projectId = query.get("projectId");

  const [
    updateTaskMutation,
    { data, loading, error },
  ] = useUpdateTaskMutation();

  if (!projectId) return null;

  const onDragEnd = (result: Record<string, any>) => {
    if (!result.destination) return;
    updateTaskMutation({
      variables: {
        projectId,
        options: {
          id: result.draggableId,
          newSprintRowIndex: result.destination.index,
        },
      },
      refetchQueries: [{ query: GetSprintsDocument, variables: { projectId } }],
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AccordionPanel>
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

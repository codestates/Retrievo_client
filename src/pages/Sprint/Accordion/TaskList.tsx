import { AccordionPanel, Box } from "@chakra-ui/react";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Spinner from "../../../components/Spinner";
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
  selectedTask: string | null;
};

export const TaskList: React.FC<TaskListPropType> = ({
  taskData,
  setSelectedTask,
  selectedTask,
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
                if (!task.sprintRowIndex) return undefined;

                return (
                  <TaskListEntry
                    setSelectedTask={setSelectedTask}
                    selectedTask={selectedTask}
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

import { AccordionPanel, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Spinner from "../../../components/Spinner";
import {
  Task,
  useUpdateTaskMutation,
  GetSprintsDocument,
} from "../../../generated/graphql";
import useQuery from "../../../hooks/useQuery";
import TaskListEntry from "./TaskListEntry";

// const taskData = [
//   {
//     id: "2c067988-4650-4f47-8f40-dceb12485e77",
//     taskIndex: 123,
//     sprintRowIndex: 0,
//     title: "Personal Loan Account Pants infomediaries",
//     board: {
//       title: "TODO",
//     },
//     userTask: [
//       {
//         user: {
//           src: undefined,
//           name: "Stephan Shields",
//         },
//       },
//       {
//         user: {
//           src: undefined,
//           name: "Stephan Greider",
//         },
//       },
//     ],
//   },
//   {
//     id: "f5334e05-f203-491b-802a-98e71e7bd36c",
//     taskIndex: 126,
//     sprintRowIndex: 1,
//     title: "adapter",
//     board: {
//       title: "TODO",
//     },
//     userTask: [
//       {
//         user: {
//           src: undefined,
//           name: "Caden Gorczany",
//         },
//       },
//     ],
//   },
//   {
//     id: "7e4369f5-a747-4e4e-a57a-20eccc3954b5",
//     taskIndex: 129,
//     sprintRowIndex: 2,
//     title: "SCSI Practical Metal Table",
//     board: {
//       title: "TODO",
//     },
//     userTask: [
//       {
//         user: {
//           src: undefined,
//           name: "Vincenzo Quitzon",
//         },
//       },
//     ],
//   },
//   {
//     id: "5828d6cd-2f9b-4f9f-ae0f-bf64c2c7f6fd",
//     taskIndex: 132,
//     sprintRowIndex: 3,
//     title: "mint green",
//     board: {
//       title: "Done",
//     },
//     userTask: [
//       {
//         user: {
//           src: undefined,
//           name: "Lionel Mueller",
//         },
//       },
//     ],
//   },
//   {
//     id: "2d205988-1d8d-4fac-b2db-b837145ff37a",
//     taskIndex: 135,
//     sprintRowIndex: 4,
//     title: "compressing",
//     board: {
//       title: "TODO",
//     },
//     userTask: [
//       {
//         user: {
//           src: undefined,
//           name: "Laurel Denesik",
//         },
//       },
//     ],
//   },
//   {
//     id: "74504c5b-10a1-4d20-9aef-981c531f06d5",
//     taskIndex: 138,
//     sprintRowIndex: 5,
//     title: "RSS",
//     board: {
//       title: "In Progress",
//     },
//     userTask: [
//       {
//         user: {
//           src: undefined,
//           name: "Mr. Rafaela Welch",
//         },
//       },
//     ],
//   },
//   {
//     id: "637dbd65-472f-4a8a-a9dd-75055cce3294",
//     taskIndex: 141,
//     sprintRowIndex: 6,
//     title: "Deposit into an account",
//     board: {
//       title: "In Progress",
//     },
//     userTask: [
//       {
//         user: {
//           src: undefined,
//           name: "Kaitlyn Mante",
//         },
//       },
//     ],
//   },
//   {
//     id: "4d57822e-7329-48c9-abaa-848eef60eb56",
//     taskIndex: 144,
//     sprintRowIndex: 7,
//     title: "Avon Credit Card Account grid-enabled",
//     board: {
//       title: "In Progress",
//     },
//     userTask: [
//       {
//         user: {
//           src: undefined,
//           name: "Katlynn Hirthe",
//         },
//       },
//     ],
//   },
//   {
//     id: "e2cb8ad4-6f8e-4422-a2fa-3719cb66d4a0",
//     taskIndex: 147,
//     sprintRowIndex: 8,
//     title: "infrastructure compress brand",
//     board: {
//       title: "Todo",
//     },
//     userTask: [
//       {
//         user: {
//           src: undefined,
//           name: "Justina Parisian",
//         },
//       },
//     ],
//   },
//   {
//     id: "3cbbe054-739b-4576-b68d-0c57dc4bfaa2",
//     taskIndex: 150,
//     sprintRowIndex: 9,
//     title: "hey jude",
//     board: {
//       title: "In Progress",
//     },
//     userTask: [
//       {
//         user: {
//           src: undefined,
//           name: "Isobel Willms",
//         },
//       },
//     ],
//   },
// ];

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
  // const { data, loading } = useGetSprintsQuery({
  //   variables: { projectId },
  //   fetchPolicy: "cache-and-network",
  // });
  // const onDragEnd = (result: Record<string, any>) => {
  //   if (!result.destination) return;

  //   /* fe dnd logic */
  //   // const items = Array.from(sprints);
  //   // const [reorderedItem] = items.splice(result.source.index, 1);
  //   // items.splice(result.destination.index, 0, reorderedItem);

  //   updateSprintMutation({
  //     variables: {
  //       projectId,
  //       options: {
  //         id: result.draggableId,
  //         row: result.destination.index,
  //       },
  //     },
  //     refetchQueries: [{ query: GetSprintsDocument, variables: { projectId } }],
  //   });
  // };

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
          sprintRowIndex: result.destination.index,
        },
      },
      refetchQueries: [{ query: GetSprintsDocument, variables: { projectId } }],
    });
    // if (!result.destination) return;
    // const items = Array.from(taskData);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.desttask.sprintRowIndextion.index, 0, reorderedItem);
  };

  // if (tasks.length < 1 && taskData.length > 1) {
  //   setTasks(taskData);
  // }

  /*
      update
      result.destination.index,
      sprint.id
    */

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

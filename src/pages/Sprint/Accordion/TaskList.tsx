import { AccordionPanel, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskListEntry from "./TaskListEntry";

const taskData = [
  {
    id: "2c067988-4650-4f47-8f40-dceb12485e77",
    taskIndex: 123,
    sprintRowIndex: 0,
    title: "Personal Loan Account Pants infomediaries",
    board: {
      title: "TODO",
    },
    userTask: [
      {
        user: {
          src: null,
          name: "Stephan Shields",
        },
      },
      {
        user: {
          src: null,
          name: "Stephan Greider",
        },
      },
    ],
  },
  {
    id: "f5334e05-f203-491b-802a-98e71e7bd36c",
    taskIndex: 126,
    sprintRowIndex: 1,
    title: "adapter",
    board: {
      title: "TODO",
    },
    userTask: [
      {
        user: {
          src: null,
          name: "Caden Gorczany",
        },
      },
    ],
  },
  {
    id: "7e4369f5-a747-4e4e-a57a-20eccc3954b5",
    taskIndex: 129,
    sprintRowIndex: 2,
    title: "SCSI Practical Metal Table",
    board: {
      title: "TODO",
    },
    userTask: [
      {
        user: {
          src: null,
          name: "Vincenzo Quitzon",
        },
      },
    ],
  },
  {
    id: "5828d6cd-2f9b-4f9f-ae0f-bf64c2c7f6fd",
    taskIndex: 132,
    sprintRowIndex: 3,
    title: "mint green",
    board: {
      title: "Done",
    },
    userTask: [
      {
        user: {
          src: null,
          name: "Lionel Mueller",
        },
      },
    ],
  },
  {
    id: "2d205988-1d8d-4fac-b2db-b837145ff37a",
    taskIndex: 135,
    sprintRowIndex: 4,
    title: "compressing",
    board: {
      title: "TODO",
    },
    userTask: [
      {
        user: {
          src: null,
          name: "Laurel Denesik",
        },
      },
    ],
  },
  {
    id: "74504c5b-10a1-4d20-9aef-981c531f06d5",
    taskIndex: 138,
    sprintRowIndex: 5,
    title: "RSS",
    board: {
      title: "In Progress",
    },
    userTask: [
      {
        user: {
          src: null,
          name: "Mr. Rafaela Welch",
        },
      },
    ],
  },
  {
    id: "637dbd65-472f-4a8a-a9dd-75055cce3294",
    taskIndex: 141,
    sprintRowIndex: 6,
    title: "Deposit into an account",
    board: {
      title: "In Progress",
    },
    userTask: [
      {
        user: {
          src: null,
          name: "Kaitlyn Mante",
        },
      },
    ],
  },
  {
    id: "4d57822e-7329-48c9-abaa-848eef60eb56",
    taskIndex: 144,
    sprintRowIndex: 7,
    title: "Avon Credit Card Account grid-enabled",
    board: {
      title: "In Progress",
    },
    userTask: [
      {
        user: {
          src: null,
          name: "Katlynn Hirthe",
        },
      },
    ],
  },
  {
    id: "e2cb8ad4-6f8e-4422-a2fa-3719cb66d4a0",
    taskIndex: 147,
    sprintRowIndex: 8,
    title: "infrastructure compress brand",
    board: {
      title: "Todo",
    },
    userTask: [
      {
        user: {
          src: null,
          name: "Justina Parisian",
        },
      },
    ],
  },
  {
    id: "3cbbe054-739b-4576-b68d-0c57dc4bfaa2",
    taskIndex: 150,
    sprintRowIndex: 9,
    title: "hey jude",
    board: {
      title: "In Progress",
    },
    userTask: [
      {
        user: {
          src: null,
          name: "Isobel Willms",
        },
      },
    ],
  },
];

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState(taskData);
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);

    /*
      update
      result.destination.index,
      sprint.id
    */
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AccordionPanel>
        <Droppable droppableId="droppableTask">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, idx) => (
                <TaskListEntry
                  key={task.id}
                  taskData={task}
                  mappedIndex={idx}
                />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </AccordionPanel>
    </DragDropContext>
  );
};

export default TaskList;

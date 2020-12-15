import React, { ReactElement, useState } from "react";
import { Box, useToast } from "@chakra-ui/react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import TaskBoard, { TaskBoardProps } from "../TaskBoard";
import SkeletonBoard, { SkeletonBoardProps } from "../TaskBoard/SkeletonBoard";
import { Board as boardType } from "../../../generated/graphql";

export type TaskBoardListProps = TaskBoardProps &
  SkeletonBoardProps & {
    boards: boardType[];
    projectId: string;
  };

const TaskBoardList: React.FC<TaskBoardListProps> = ({
  boards,
  projectId,
  ...props
}): ReactElement => {
  const [boardLists, setBoardLists] = useState(boards);
  const toast = useToast();

  const {
    handleBoardCreate,
    handleBoardDelete,
    handleTaskClick,
    handleTaskCreate,
    handleTaskDelete,
  } = props;
  const boardConfig = {
    handleBoardCreate,
    handleBoardDelete,
    handleTaskClick,
    handleTaskCreate,
    handleTaskDelete,
  };

  const renderBoards = (boards: boardType[]) => {
    return boards.map((currentBoard) => {
      return (
        <Draggable
          index={currentBoard.boardColumnIndex}
          draggableId={currentBoard.id}
          key={currentBoard.id}
          isDragDisabled={currentBoard.boardColumnIndex === boards.length - 1}
        >
          {(provided) => (
            <Box
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <TaskBoard board={currentBoard} {...boardConfig} />
            </Box>
          )}
        </Draggable>
      );
    });
  };

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    // reorder
    const { destination, source, draggableId, type } = result;
    console.log("type:", type);

    if (!destination) return;

    if (type === "TASK") {
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const sourceBoard = boardLists.find(
        (boardList) => boardList.id === source.droppableId
      );
      const sourceBoardIndex = boardLists.findIndex(
        (boardList) => boardList.id === source.droppableId
      );

      const destinationBoard = boardLists.find(
        (boardList) => boardList.id === destination.droppableId
      );
      const destinationBoardIndex = boardLists.findIndex(
        (boardList) => boardList.id === destination.droppableId
      );

      if (
        !sourceBoard ||
        !destinationBoard ||
        !sourceBoard.task ||
        !destinationBoard.task
      )
        return;

      const sourceTask = sourceBoard.task.splice(source.index, 1);
      destinationBoard.task.splice(destination.index, 0, sourceTask[0]);

      const copyBoardList = [...boardLists];
      copyBoardList.splice(sourceBoardIndex, 1, sourceBoard);
      copyBoardList.splice(destinationBoardIndex, 1, destinationBoard);

      setBoardLists(copyBoardList);
    }

    if (type === "BOARD") {
      if (destination.index === boardLists.length - 1) {
        toast({
          title: "마지막 보드는 이동할 수 없습니다",
          description: "Board is not draggable to the last",
          status: "warning",
          position: "bottom-right",
          duration: 4000,
          isClosable: true,
        });
        return;
      }

      const copyBoardLists = [...boardLists];
      const temp = copyBoardLists[source.index];
      copyBoardLists[source.index] = copyBoardLists[destination.index];
      copyBoardLists[destination.index] = temp;

      setBoardLists(copyBoardLists);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="BOARD" direction="horizontal">
        {(provided) => (
          <>
            <Box
              display="flex"
              flexDir="row"
              // minH={1000}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {renderBoards(boardLists)}
              {provided.placeholder}
              <SkeletonBoard
                handleBoardCreate={handleBoardCreate}
                projectId={projectId}
              />
            </Box>
          </>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskBoardList;

// const initialData = {
//   tasks: {
//     "task-1": { id: "task-1", content: "Take out the garbage" },
//     "task-2": { id: "task-2", content: "Watch my favorite show" },
//     "task-3": { id: "task-3", content: "Charge my phone" },
//     "task-4": { id: "task-4", content: "Cook dinner" },
//   },
//   columns: {
//     "column-1": {
//       id: "column-1",
//       title: "To do",
//       taskIds: ["task-1", "task-2", "task-3", "task-4"],
//     },
//   },
//   // Facilitate reordering of the columns
//   columnOrder: ["column-1"],
// };

/*
{
  "data": {
    "getBoards": {
      "boards": [
        {
          "title": "Hat Rustic Frozen Hat",
          "boardColumnIndex": 0,
          "task": [
            {
              "title": "Liberian Dollar Ball Director",
              "boardRowIndex": null,
              "sprintRowIndex": 1,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Katlynn Smitham DDS"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "Borders",
                    "color": "PINK"
                  }
                }
              ]
            },
            {
              "title": "payment Cliffs indigo",
              "boardRowIndex": null,
              "sprintRowIndex": 3,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Vickie Beer"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "California",
                    "color": "RED"
                  }
                }
              ]
            },
            {
              "title": "Keys Borders Berkshire",
              "boardRowIndex": null,
              "sprintRowIndex": 5,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Camille Morissette"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "backing up",
                    "color": "PINK"
                  }
                }
              ]
            },
            {
              "title": "matrices payment asymmetric",
              "boardRowIndex": null,
              "sprintRowIndex": 6,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Bill Witting III"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "sky blue",
                    "color": "RED"
                  }
                }
              ]
            },
            {
              "title": "Michigan payment Graphic Interface",
              "boardRowIndex": null,
              "sprintRowIndex": 8,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Gina Emmerich"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "Clothing",
                    "color": "PINK"
                  }
                }
              ]
            }
          ]
        }
      ],
      "error": null
    }
  }
}

*/

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
  sprintId,
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
    handleBoardUpdate,
  } = props;
  const boardConfig = {
    handleBoardCreate,
    handleBoardDelete,
    handleTaskClick,
    handleTaskCreate,
    handleTaskDelete,
    handleBoardUpdate,
    boards,
    projectId,
    sprintId,
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

  const onDragEnd = async (result: DropResult, provided: ResponderProvided) => {
    // reorder
    const { destination, source, draggableId, type } = result;
    console.log("type:", type);

    if (!destination) return;
    console.log("destination", destination);
    console.log("source", source);

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

      console.log("sourceBoard", sourceBoard.task);
      console.log("sourceIndex", source.index);
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
          title: "Not Available",
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
      // TODO : 프론트엔드 상으로도 index를 바꿔주기

      await handleBoardUpdate(
        {
          id: temp.id,
          boardColumnIndex: destination.index,
        },
        projectId
      );

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

import React, { ReactElement, useState, useEffect } from "react";
import { FetchResult } from "@apollo/client";
import { Box, useToast } from "@chakra-ui/react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import TaskBoard, { Boardoptions, TaskBoardProps } from "../TaskBoard";
import SkeletonBoard, { SkeletonBoardProps } from "../TaskBoard/SkeletonBoard";
import { TaskUpdateOptions } from "../../../pages/Board";
import {
  Board as boardType,
  UpdateTaskMutation,
} from "../../../generated/graphql";

export type TaskBoardListProps = TaskBoardProps &
  SkeletonBoardProps & {
    boards: boardType[];
    projectId: string;
    boardLoading: boolean;
    taskLoading: boolean;
    handleTaskUpdate: (
      options: TaskUpdateOptions,
      projectId: string
    ) => Promise<
      FetchResult<UpdateTaskMutation, Record<string, any>, Record<string, any>>
    >;
  };

const TaskBoardList: React.FC<TaskBoardListProps> = ({
  boards,
  projectId,
  sprintId,
  handleTaskUpdate,
  handleBoardUpdate,
  boardLoading,
  taskLoading,
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

  const handleTaskUpdateToServer = async (options: TaskUpdateOptions) => {
    await handleTaskUpdate(options, projectId);
  };

  const handleBoardUpdateToServer = async (options: Boardoptions) => {
    await handleBoardUpdate(options, projectId);
  };

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

  useEffect(() => {
    setBoardLists(boards);
  }, [boards]);

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
    const { destination, source, draggableId, type } = result;

    if (boardLoading || taskLoading) return;
    if (!destination) return;
    // console.log("destination", destination);
    // console.log("source", source);
    // console.log("------destination droppableId", destination.droppableId);
    // console.log("------source droppableId", source.droppableId);

    /* TASK의 DND인 경우 */
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

      // 1. 기존 보드에서 sourceTask 삭제
      const allSourceTasks = sourceBoard.task.slice();
      const sourceTask = allSourceTasks.splice(source.index, 1);

      // 2. 기존 보드의 테스크 중 이동한 테스크보다 큰 인덱스 - 1
      const changedIndexSourceBoardTasks = allSourceTasks.map((task) => {
        if (task.boardRowIndex === undefined || task.boardRowIndex === null)
          return task;
        if (task.boardRowIndex > source.index) {
          return { ...task, boardRowIndex: task.boardRowIndex - 1 };
        }
        return task;
      });
      // console.log("sourceTask: 삭제된 index", source.index);
      // console.log("sourceTask: 삭제된 것", sourceTask);
      let changedSourceBoard = {
        ...sourceBoard,
        task: changedIndexSourceBoardTasks,
      };

      /* TASK-CASE-1 : TASK가 같은 보드로 이동한 경우 */
      if (destination.droppableId === source.droppableId) {
        // 1. changedSourceBoard에서 destination index보다 큰 애들을 +1해줌
        const doubleChangedSourceTask = changedSourceBoard.task.map((task) => {
          if (task.boardRowIndex === undefined || task.boardRowIndex === null)
            return task;
          if (task.boardRowIndex >= destination.index) {
            return { ...task, boardRowIndex: task.boardRowIndex + 1 };
          }
          return task;
        });

        // 2. destination index로 task의 index 수정
        const changedTask = {
          ...sourceTask[0],
          boardId: source.droppableId,
          boardRowIndex: destination.index,
        };
        doubleChangedSourceTask.splice(destination.index, 0, changedTask);

        // 3. changedSourceBoard에 task 다시 추가
        changedSourceBoard = {
          ...changedSourceBoard,
          task: doubleChangedSourceTask,
        };

        // 4. changedSourceBoard setState해주기
        const copyBoardList = [...boardLists];
        copyBoardList[sourceBoardIndex] = changedSourceBoard;
        setBoardLists(copyBoardList);

        // 5. server update
        handleTaskUpdateToServer({
          id: changedTask.id,
          newBoardRowIndex: destination.index,
        });

        return;
      }

      /* TASK-CASE-2 : TASK가 다른 보드로 이동한 경우 */
      // 1. destinationBoard의 destination index와 같거나 큰 애들을 +1해줌
      const changeDestinationTasks = destinationBoard.task.map((task) => {
        if (task.boardRowIndex === undefined || task.boardRowIndex === null)
          return task;
        if (task.boardRowIndex >= destination.index) {
          return { ...task, boardRowIndex: task.boardRowIndex + 1 };
        }
        return task;
      });

      // 2. task의 boardRowIndex와 boardId 수정
      const changedTask = {
        ...sourceTask[0],
        boardId: destination.droppableId,
        boardRowIndex: destination.index,
      };

      // 3. destination board에 task 추가
      changeDestinationTasks.splice(destination.index, 0, changedTask);
      const changedDestinationBoard = {
        ...destinationBoard,
        task: changeDestinationTasks,
      };

      // 4. changedSourceBoard, destinationBoard 모두 setState해주기
      const copyBoardList2 = [...boardLists];
      copyBoardList2[destinationBoardIndex] = changedDestinationBoard;
      copyBoardList2[sourceBoardIndex] = changedSourceBoard;
      setBoardLists(copyBoardList2);

      // 5. server update
      handleTaskUpdateToServer({
        id: changedTask.id,
        boardId: destination.droppableId,
        newBoardRowIndex: destination.index,
      });
    }

    /* 보드의 DND인 경우 */
    if (type === "BOARD") {
      /* 마지막 보드로 이동하지 못하게 방지 */
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

      /* source와 destination 스왑하면서 boardColumnIndex도 수정하기 */
      const copyBoardLists = [...boardLists];
      const sourceBoard = copyBoardLists[source.index];
      copyBoardLists.splice(source.index, 1);
      copyBoardLists.splice(destination.index, 0, sourceBoard);

      const changedIndexBoardList = copyBoardLists.map((board, index) => {
        return { ...board, boardColumnIndex: index };
      });

      /* 서버에 업데이트 */
      handleBoardUpdateToServer({
        id: sourceBoard.id,
        boardColumnIndex: destination.index,
      });

      setBoardLists(changedIndexBoardList);
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
                // lazyGetBoard={lazyGetBoard}
              />
            </Box>
          </>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskBoardList;

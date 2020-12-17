/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

/* Layouts & types */
import { Box, useDisclosure, Text, Flex } from "@chakra-ui/react";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import PageHeading from "../../layouts/PageHeader";
import TaskBoardList from "../../layouts/TaskBoard/TaskBoardList";
import TaskBoardContainer from "../../layouts/TaskBoard/TaskBoardContainer";
import { TaskBar } from "../../layouts/TaskBar";
import { Boardoptions, TaskOptions } from "../../layouts/TaskBoard/TaskBoard";

/* GraphQL & Apollo */
import {
  Board as BoardType,
  GetBoardsDocument,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useSetStartedSprintQuery,
  useGetBoardsQuery,
  useUpdateBoardMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../generated/graphql";
import { client } from "../../index";
import Heading, { headingEnum } from "../../components/Heading";
import Button, { buttonColor } from "../../components/Button";

interface BoardProps {
  projectId: string;
}

export interface TaskUpdateOptions {
  id: string;
  boardRowIndex?: number;
  boardId?: string;
  newBoardRowIndex?: number;
}

export const Board: React.FC<RouteComponentProps<BoardProps>> = ({
  ...args
}) => {
  const { projectId } = args.match.params;
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [curBoards, setCurBoard] = useState<BoardType[] | []>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  /* Mutation, Query */
  const { loading, data } = useGetBoardsQuery({
    variables: { projectId },
    fetchPolicy: "cache-and-network",
  });
  const { data: sprintData } = useSetStartedSprintQuery({
    variables: { projectId },
    fetchPolicy: "cache-and-network",
  });
  const [createBoard] = useCreateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    if (data?.getBoards && data?.getBoards?.boards) {
      setCurBoard(data.getBoards.boards);
    }
  }, [data]);

  /* Function Props */
  const handleBoardCreate = async (title: string, projectId: string) => {
    return await createBoard({
      variables: { title, projectId },
      update: (cache, { data }) => {
        const newBoardRes = data?.createBoard.boards;
        const newBoard = newBoardRes && newBoardRes[newBoardRes.length - 2];
        const existingBoards: any = cache.readQuery({
          query: GetBoardsDocument,
          variables: { projectId },
        });
        console.log("existingBoards", existingBoards);
        console.log("newBoard", newBoard);
        // console.log("data", newBoardRes);
        // if (!data?.createBoard) return null;
        // eslint-disable-next-line no-underscore-dangle
        // if (!newBoard || !newBoard.__typename) return null;
        // const cacheId = cache.identify(data.createBoard);
        // console.log("cacheId", cacheId);
        // cache.modify({
        //   fields: {
        //     getBoards: (existingFieldData, { toReference }) => {
        //       console.log("existing", existingFieldData);
        //       return Object.assign(existingFieldData, {
        //         id: `Board:${newBoard.id}`,
        //       });
        //     },
        //   },
        // });
        const newFormat = {
          getBoards: {
            boards: [...existingBoards?.getBoards.boards, newBoard],
            error: null,
            __typename: "BoardResponse",
          },
        };
        const updatedBoard = { ...existingBoards, ...newFormat };
        cache.writeQuery({
          query: GetBoardsDocument,
          variables: { projectId },
          data: {
            getBoards: {
              boards: updatedBoard,
            },
          },
        });
        return "hello";
      },
    });
  };

  const handleBoardDelete = async (
    id: string,
    newBoardId: string,
    projectId: string
  ) => {
    return await deleteBoard({
      variables: {
        id,
        newBoardId,
        projectId,
      },
      update: (cache, { data }) => {
        const newBoardRes = data?.deleteBoard.boards;
        if (!newBoardRes) return;
        client.writeQuery({
          query: GetBoardsDocument,
          variables: { projectId },
          data: {
            getBoards: {
              boards: [...newBoardRes],
            },
          },
        });
        console.log("deleteboard", newBoardRes);
        // if (refetch) refetch();
      },
    });
  };

  const handleTaskCreate = async (options: TaskOptions, projectId: string) => {
    return await createTask({
      variables: {
        options,
        projectId,
      },
    });
  };

  const handleTaskDelete = async (id: string, projectId: string) => {
    return await deleteTask({
      variables: {
        id,
        projectId,
      },
    });
  };

  const handleTaskClick = (id: string) => {
    setSelectedTask(id);
  };

  useEffect(() => {
    if (selectedTask) onOpen();
  }, [selectedTask, onOpen]);

  if (!sprintData || !sprintData) return null;

  return (
    <>
      <Box>
        <TopNav {...args} />
        <SideNav {...args} />
        <Box display="flex">
          <Box w="100%" p={9} ml={210} mt={50}>
            <PageHeading />
            <Flex alignItems="flex-end" mt={7} mb={5} ml={5}>
              <Heading mr={3} headingType={headingEnum.sprint}>
                {!sprintData?.getStartedSprint.sprint?.title
                  ? ""
                  : sprintData?.getStartedSprint.sprint?.title}
              </Heading>
              {sprintData?.getStartedSprint.sprint ? (
                <Button size="sm" buttontype={buttonColor.primary}>
                  Sprint complete
                </Button>
              ) : null}
            </Flex>
            <Box mt={9}>
              {loading ||
              !data?.getBoards.boards ||
              !sprintData?.getStartedSprint.sprint?.id ? (
                <TaskBoardContainer />
              ) : (
                <TaskBoardList
                  projectId={projectId}
                  sprintId={sprintData?.getStartedSprint.sprint?.id}
                  handleBoardCreate={handleBoardCreate}
                  handleBoardDelete={handleBoardDelete}
                  handleTaskClick={handleTaskClick}
                  handleTaskCreate={handleTaskCreate}
                  handleTaskDelete={handleTaskDelete}
                  // boards={data !== null ? data?.getBoards.boards : []}
                  boards={curBoards}
                />
              )}
            </Box>
          </Box>
        </Box>
        {selectedTask ? (
          <TaskBar
            taskId={selectedTask}
            {...args}
            isOpen={isOpen}
            onClose={onClose}
          />
        ) : (
          <Text>oh?</Text>
        )}
      </Box>
    </>
  );
};

export default Board;

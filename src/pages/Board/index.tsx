/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { gql } from "@apollo/client";

/* Layouts & types */
import {
  Box,
  useDisclosure,
  Text,
  Flex,
  useToast,
  Container,
} from "@chakra-ui/react";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import PageHeading from "../../layouts/PageHeader";
import TaskBoardList from "../../layouts/TaskBoard/TaskBoardList";
import TaskBoardContainer from "../../layouts/TaskBoard/TaskBoardContainer";
import { TaskBar } from "../../layouts/TaskBar";
import { Boardoptions, TaskOptions } from "../../layouts/TaskBoard/TaskBoard";
import Spinner from "../../components/Spinner";

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
  useUpdateSprintMutation,
  SetStartedSprintDocument,
} from "../../generated/graphql";
import { client } from "../../index";
import Heading, { headingEnum } from "../../components/Heading";
import Button, { buttonColor } from "../../components/Button";
// import { sprintListDropdown } from "../../layouts/TaskBar/SprintSelector/sprintSelector.stories";

interface BoardProps {
  projectId: string;
}

export interface TaskUpdateOptions {
  id: string;
  boardRowIndex?: number;
  boardId?: string;
  newBoardRowIndex?: number;
}

export interface SprintUpdateOptions {
  id: string;
  didStart: boolean;
}

export const Board: React.FC<RouteComponentProps<BoardProps>> = ({
  ...args
}) => {
  const { projectId } = args.match.params;
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  // const [curBoards, setCurBoard] = useState<BoardType[] | []>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
  const [
    updateBoard,
    { data: boardData, loading: boardLoading },
  ] = useUpdateBoardMutation();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateSprint] = useUpdateSprintMutation();
  const [
    updateTask,
    { data: taskData, loading: taskLoading },
  ] = useUpdateTaskMutation();

  // useEffect(() => {
  //   if (data?.getBoards && data?.getBoards?.boards) {
  //     setCurBoard(data.getBoards.boards);
  //   }
  // }, [data]);

  /* Function Props */
  const handleBoardCreate = async (title: string, projectId: string) => {
    return await createBoard({
      variables: { title, projectId },
      // TODO : refetch 시도하기
      // TODO : 이거 안되면 코드 자체를 그냥 뜯어보기 어디서 막히는고여ㅑㅁ

      // update: (cache, { data }) => {
      //   if (!data) return;
      //   if (!data.createBoard) return;

      //   const allBoards = data?.createBoard.boards;
      //   if (!allBoards) return;

      //   const cacheId = cache.identify(allBoards[allBoards.length - 2]);
      //   if (!cacheId) return;

      //   cache.modify({
      //     fields: {
      //       getBoards: (existingBoards, { toReference }) => {
      //         const newData = existingBoards.boards.slice();
      //         const insertedData = toReference(cacheId);

      //         newData.splice(newData.length - 2, 0, insertedData);
      //         console.log("newData", newData);
      //         // const newBoards = [
      //         //   ...existingBoards.boards,
      //         //   toReference(cacheId),
      //         // ];
      //         return { ...existingBoards, boards: newData };
      //       },
      //     },
      //   });
      // },
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

  const handleBoardUpdate = async (
    options: Boardoptions,
    projectId: string
  ) => {
    return await updateBoard({
      variables: { options, projectId },
      // update: (cache, { data }) => {
      //   const existingBoards = cache.readQuery({
      //     query: GetBoardsDocument,
      //     variables: { projectId },
      //   });
      // },
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

  const handleTaskUpdate = async (
    options: TaskUpdateOptions,
    projectId: string
  ) => {
    return await updateTask({
      variables: { projectId, options },
    });
  };

  const handleTaskClick = (id: string) => {
    setSelectedTask(id);
  };

  const handleUpdateSprint = async (
    projectId: string,
    options: SprintUpdateOptions
  ) => {
    if (options.id === "") {
      toast({
        title: "Sprint Completion Failed😂",
        description: "Connot find sprint",
        duration: 5000,
        status: "error",
        position: "bottom-right",
      });
    }
    const res = await updateSprint({
      variables: { projectId, options },
      refetchQueries: [
        { query: SetStartedSprintDocument, variables: { projectId } },
      ],
      // update: async (cache, { data }) => {
      //   if (!data) return;
      //   cache.modify({
      //     fields: {
      //       getStartedSprint: () => {
      //         return {};
      //       },
      //     },
      //   });
      // },
    });
    if (res.errors) {
      toast({
        title: "Sprint Completion Failed😂",
        description: `${res.errors}`,
        duration: 5000,
        status: "error",
        position: "bottom-right",
      });
    } else {
      toast({
        title: "Sprint Completion Succeed🥳",
        description: "Sprint is completed",
        duration: 5000,
        status: "success",
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    if (selectedTask) onOpen();
  }, [selectedTask, onOpen]);

  if (!sprintData && loading)
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Spinner />
      </Flex>
    );

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
                {!sprintData?.getStartedSprint ||
                !sprintData?.getStartedSprint.sprint ||
                !sprintData?.getStartedSprint.sprint?.title
                  ? ""
                  : sprintData?.getStartedSprint.sprint?.title}
              </Heading>
              {sprintData?.getStartedSprint.sprint?.id ? (
                <Button
                  size="sm"
                  buttontype={buttonColor.primary}
                  onClick={() =>
                    handleUpdateSprint(projectId, {
                      id: sprintData?.getStartedSprint.sprint?.id || "",
                      didStart: false,
                    })
                  }
                >
                  Sprint complete
                </Button>
              ) : null}
            </Flex>
            <Box mt={9}>
              {!data?.getBoards.boards ||
              !sprintData?.getStartedSprint.sprint?.id ? (
                <TaskBoardContainer />
              ) : (
                <TaskBoardList
                  projectId={projectId}
                  sprintId={sprintData?.getStartedSprint.sprint?.id}
                  handleBoardCreate={handleBoardCreate}
                  handleBoardDelete={handleBoardDelete}
                  handleBoardUpdate={handleBoardUpdate}
                  handleTaskClick={handleTaskClick}
                  handleTaskCreate={handleTaskCreate}
                  handleTaskDelete={handleTaskDelete}
                  handleTaskUpdate={handleTaskUpdate}
                  boards={data?.getBoards.boards}
                  // boards={data !== null ? data?.getBoards.boards : []}
                  // boards={curBoards}
                  boardLoading={boardLoading}
                  taskLoading={taskLoading}
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
        ) : null}
      </Box>
    </>
  );
};

export default Board;

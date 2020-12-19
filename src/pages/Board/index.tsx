/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
/* Layouts & types */
import { Box, useDisclosure, Flex, useToast } from "@chakra-ui/react";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import PageHeading from "../../layouts/PageHeader";
import TaskBoardList from "../../layouts/TaskBoard/TaskBoardList";
import TaskBoardContainer from "../../layouts/TaskBoard/TaskBoardContainer";
import { TaskBar } from "../../layouts/TaskBar";
import { Boardoptions, TaskOptions } from "../../layouts/TaskBoard/TaskBoard";
import Spinner from "../../components/Spinner";
import Heading, { headingEnum } from "../../components/Heading";
import Button, { buttonColor } from "../../components/Button";
/* GraphQL */
import {
  GetBoardsDocument,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useSetStartedSprintQuery,
  useGetBoardsQuery,
  useUpdateBoardMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  SetStartedSprintDocument,
  useDeleteSprintMutation,
  // useUpdateSprintMutation,
  // GetSprintsDocument,
} from "../../generated/graphql";
/* hooks */
import { useQuery } from "../../hooks/useQuery";

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

export const Board: React.FC<Record<string, never>> = () => {
  /* get projectId */
  const query = useQuery();
  const projectId = query.get("projectId");
  if (!projectId) return null;

  /* state & hooks */
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  /* Mutation, Query */
  const { loading, data } = useGetBoardsQuery({
    variables: { projectId },
  });
  const { data: sprintData, loading: sprintLoading } = useSetStartedSprintQuery(
    {
      variables: { projectId },
    }
  );
  const [createBoard] = useCreateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();
  const [updateBoard, { loading: boardLoading }] = useUpdateBoardMutation();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask, { loading: taskLoading }] = useUpdateTaskMutation();
  const [deleteSprint] = useDeleteSprintMutation();
  // const [updateSprint] = useUpdateSprintMutation();

  if (!projectId) return null;

  /* Function Props */
  const handleBoardCreate = async (title: string, projectId: string) => {
    return await createBoard({
      variables: { title, projectId },
      refetchQueries: [{ query: GetBoardsDocument, variables: { projectId } }],
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
      refetchQueries: [{ query: GetBoardsDocument, variables: { projectId } }],
    });
  };

  const handleBoardUpdate = async (
    options: Boardoptions,
    projectId: string
  ) => {
    return await updateBoard({
      variables: { options, projectId },
      refetchQueries: [{ query: GetBoardsDocument, variables: { projectId } }],
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
    // TODO : sprint update로 바꾸기
    // const res = await updateSprint({
    //   variables: { projectId, options },
    //   refetchQueries: [
    //     { query: SetStartedSprintDocument, variables: { projectId } },
    //   ],
    // });
    const res = await deleteSprint({
      variables: { id: options.id, projectId },
      refetchQueries: [
        { query: SetStartedSprintDocument, variables: { projectId } },
      ],
    });

    if (res.data?.deleteSprint.error) {
      toast({
        title: "Sprint Completion Failed😂",
        description: `${res.data?.deleteSprint.error.message}`,
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

  // if (!sprintData && loading)
  // if (!sprintData)
  // -> 드래그앤드롭 심리스
  // -> 보드 update x
  // -> 보드 create X
  // -> 보드 delete X
  // -> 테스크 업데이트 x

  // if (!sprintData || loading)
  // if (loading)
  // -> 드래그앤드롭 심리스 x
  // -> 보드 update O
  // -> 보드 create O
  // -> 보드 delete X
  // -> 테스크 update O
  // -> 테스크 create X
  // -> 테스크 delete X

  // sprint -> start를 하고 나서 board에 오면 반영이 안 되는 문제

  if (!sprintData || sprintLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      <Box>
        <TopNav />
        <SideNav />
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
                  // lazyGetBoard={lazyGetBoard}
                />
              )}
            </Box>
          </Box>
        </Box>
        {selectedTask ? (
          <TaskBar
            taskId={selectedTask}
            isOpen={isOpen}
            onClose={() => {
              onClose();
              setSelectedTask(null);
            }}
          />
        ) : null}
      </Box>
    </>
  );
};

export default Board;

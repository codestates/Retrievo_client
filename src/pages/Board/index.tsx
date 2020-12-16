/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

/* Layouts & types */
import { Box, useDisclosure, Text } from "@chakra-ui/react";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import PageHeading from "../../layouts/PageHeader";
import TaskBoardList from "../../layouts/TaskBoard/TaskBoardList";
import TaskBoardContainer from "../../layouts/TaskBoard/TaskBoardContainer";
import { TaskBar } from "../../layouts/TaskBar";
import { Boardoptions, TaskOptions } from "../../layouts/TaskBoard/TaskBoard";

/* GraphQL & Apollo */
import {
  GetBoardsDocument,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useSetStartedSprintQuery,
  useGetBoardsQuery,
  useUpdateBoardMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} from "../../generated/graphql";
import { client } from "../../index";

interface BoardProps {
  projectId: string;
}

const projectArgs = {
  projects: [
    {
      id: "1",
      name: "Rock Paper Queens",
    },
    {
      id: "2",
      name: "My Blueberry",
    },
    {
      id: "3",
      name: "Current Project",
    },
    {
      id: "4",
      name: "Retrievo",
    },
  ],
  currentProject: {
    id: "4",
    name: "Retrievo",
  },
  onProjectSelect: (id: string) => console.log(id),
  avatars: [
    {
      name: "stupy",
      src:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "prettie",
      src:
        "https://images.unsplash.com/photo-1592159371936-61a70cbeb5f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGhhbXN0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "bunny",
      src:
        "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "cuttie pie",
      src:
        "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
  ],
};

export const Board: React.FC<RouteComponentProps<BoardProps>> = ({
  ...args
}) => {
  // FIXME
  const projectId = "14ab38e8-91a0-4644-ad05-ca476387e678";
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // no sprint "14ab38e8-91a0-4644-ad05-ca476387e678";

  /* Mutation, Query */
  const { loading, data } = useGetBoardsQuery({
    variables: { projectId },
  });
  const { data: sprintData } = useSetStartedSprintQuery({
    variables: { projectId },
  });
  const [createBoard] = useCreateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  /* Function Props */
  const handleBoardCreate = async (title: string, projectId: string) => {
    return await createBoard({
      variables: { title, projectId },
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
      variables: {
        options,
        projectId,
      },
      update: (cache, { data }) => {
        const newBoardRes = data?.updateBoard.boards;
        const existingBoards = client.readQuery({
          query: GetBoardsDocument,
          variables: { projectId },
        });
        if (!newBoardRes) return;
        // console.log(existingBoards);
        const copyExistingBoards = existingBoards.getBoards.boards.slice();
        copyExistingBoards.splice(
          newBoardRes[0].boardColumnIndex,
          1,
          newBoardRes
        );
        client.writeQuery({
          query: GetBoardsDocument,
          variables: { projectId },
          data: {
            getBoards: {
              boards: copyExistingBoards,
            },
          },
        });
        console.log("updatedboard", newBoardRes);
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

  return (
    <>
      <Box>
        <TopNav {...projectArgs} />
        <SideNav />
        <Box display="flex">
          <Box w="100%" p={9} ml={210} mt={50}>
            <PageHeading />
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
                  boards={data !== null ? data?.getBoards.boards : []}
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

// TODO : task dnd
// TODO : board dnd
// TODO : rerendering

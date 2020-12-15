import React from "react";

/* Layouts */
import { Box } from "@chakra-ui/react";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import PageHeading from "../../layouts/PageHeader";
import TaskBoardList from "../../layouts/TaskBoard/TaskBoardList";
import TaskBoardContainer from "../../layouts/TaskBoard/TaskBoardContainer";

/* GraphQL */
import {
  GetBoardsDocument,
  useGetBoardsLazyQuery,
  useGetBoardsQuery,
} from "../../generated/graphql";

// interface indexProps {

// }
import dummyBoardData from "./dummyData";

const args = {
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

export const Board: React.FC = () => {
  const projectId = "04f025f8-234c-49b7-b9bf-7b7f94415569";
  const handleBoardCreate = () => console.log("create!");
  const handleBoardDelete = (id: string) => console.log("delete", id);
  const handleTaskClick = (id: string) => console.log("click", id);
  const handleTaskCreate = () => console.log("create!");
  const handleTaskDelete = (id: string) => console.log("delete", id);
  // const [getBoards, { loading, data, refetch }] = useGetBoardsLazyQuery({
  //   variables:
  //     projectId: "04f025f8-234c-49b7-b9bf-7b7f94415569",
  //   },
  // });
  const { loading, data } = useGetBoardsQuery({
    variables: { projectId },
  });
  if (loading || !data?.getBoards.boards) return <p>Loading</p>;

  // const boards = data?.getBoards.boards.map((board) => {});
  console.log("data", data?.getBoards.boards);
  // FIXME : board가 왜 들어가는고얌..
  return (
    <>
      <Box>
        <TopNav {...args} />
        <SideNav />
        <Box display="flex">
          <Box w="100%" p={9} ml={210} mt={50}>
            <PageHeading />
            <Box mt={9}>
              {/* TODO: getBoards에서 특정 에러가 난다면 -> 스프린트가 없는 것 */}
              {/* <TaskBoardContainer /> */}
              <TaskBoardList
                projectId={projectId}
                handleBoardCreate={handleBoardCreate}
                handleBoardDelete={handleBoardDelete}
                handleTaskClick={handleTaskClick}
                handleTaskCreate={handleTaskCreate}
                handleTaskDelete={handleTaskDelete}
                boards={data?.getBoards ? data?.getBoards.boards : []}
                // boards={dummyBoardData.boards}
                board={data?.getBoards.boards[0]}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Board;

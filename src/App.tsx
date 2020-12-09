import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";

const GET_BOARDS = gql`
  query getBoards {
    boards {
      boardColumnIndex
      title
      task {
        description
        title
        boardRowIndex
      }
    }
  }
`;
const App: React.FC<Record<string, never>> = () => {
  const { loading, data } = useQuery(GET_BOARDS);

  return (
    <>
      <ChakraProvider theme={theme}>
        <p>{loading ? "로딩중" : data}</p>
      </ChakraProvider>
    </>
  );
};

export default App;

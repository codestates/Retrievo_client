import React, { useState } from "react";
import {
  useCreateBoardMutation,
  useGetBoardsQuery,
} from "../../generated/graphql";

const Test = () => {
  const projectId = "3c330904-ab9c-4d0d-a5bc-7749fbc5e1ff";
  const { loading, data } = useGetBoardsQuery({
    variables: { projectId },
  });
  const [createBoard] = useCreateBoardMutation();

  const renderBoards = () => {
    if (!data || !data.getBoards || !data.getBoards.boards) return null;
    return data?.getBoards?.boards.map((board) => {
      return <li>{board.title}</li>;
    });
  };

  if (loading) return <p>Loading</p>;

  return (
    <>
      <ul>{renderBoards()}</ul>
      <button
        type="submit"
        onClick={async () => {
          await createBoard({
            variables: {
              title: "deleted",
              projectId,
            },
          });
        }}
      >
        Create
      </button>
    </>
  );
};

export default Test;

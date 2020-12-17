import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";
import SprintItem from "./SprintItem";
import {
  useGetSprintsQuery,
  useUpdateSprintMutation,
} from "../../../generated/graphql";
import Spinner from "../../../components/Spinner";

// const sprintData = [
//   {
//     id: "e999bacc-85c6-48e4-b340-fe9f6910543c",
//     title: "Sprint1",
//     description: "Nemo voluptatem quo est mollitia.",
//     row: 0,
//     dueDate: "1621834955531",
//     startedAt: "1607357759529",
//     didStart: false,
//     isCompleted: false,
//   },
//   {
//     id: "e2a2a6c7-422b-48e4-a35a-ab4758910746",
//     title: "Sprint2",
//     description: "Delectus nostrum voluptatibus sint molestias dicta.",
//     row: 1,
//     dueDate: "1637817791649",
//     startedAt: "1607335484474",
//     didStart: false,
//     isCompleted: false,
//   },
//   {
//     id: "434fccb5-d6f4-420a-b902-230f83233",
//     title: "Sprint3",
//     description: "Eveniet repudiandae esse.",
//     row: 2,
//     dueDate: "1637545643303",
//     startedAt: "1607334950962",
//     didStart: false,
//     isCompleted: false,
//   },
//   {
//     id: "e999bacc-85c6-48e4-b340-dsfsdfsfds",
//     title: "Sprint4",
//     description: "Nemo voluptatem quo est mollitia.",
//     row: 3,
//     dueDate: "1621834955531",
//     startedAt: "1607357759529",
//     didStart: false,
//     isCompleted: false,
//   },
//   {
//     id: "e2a2a6c7-422b-48e4-a35a-ab4758910712412",
//     title: "Sprint5",
//     description: "Delectus nostrum voluptatibus sint molestias dicta.",
//     row: 4,
//     dueDate: "1637817791649",
//     startedAt: "1607335484474",
//     didStart: false,
//     isCompleted: false,
//   },
//   {
//     id: "434fccb5-d6f4-420a-b902-230f8e414a32",
//     title: "Sprint6",
//     description: "Eveniet repudiandae esse.",
//     row: 5,
//     dueDate: "1637545643303",
//     startedAt: "1607334950962",
//     didStart: false,
//     isCompleted: false,
//   },
// ];

// export type sprintType = {
//   id: string;
//   title: string;
//   description: string;
//   row: number;
//   dueDate: string;
//   startedAt: string;
//   didStart: boolean;
//   isCompleted: boolean;
//   task: Task[];
// };

export const Sprints: React.FC = () => {
  const location = useLocation();
  const projectId = location.pathname.split("/").pop() || "";
  const [sprints, setSprints] = useState<Record<string, any>[]>([]);
  const { data, loading, error } = useGetSprintsQuery({
    variables: { projectId },
    fetchPolicy: "cache-and-network",
  });
  const [updateSprintMutation] = useUpdateSprintMutation();

  useEffect(() => {
    if (data?.getSprints.sprints) {
      setSprints(data?.getSprints.sprints);
    }
    console.log("howmany times am i rendering?");
  }, [data]);

  if (loading) return <Spinner />;

  const onDragEnd = (result: Record<string, any>) => {
    if (!result.destination) return;
    console.log("result", result);

    updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: result.draggableId,
          row: result.destination.index,
        },
      },
      update: (cache, { data }) => {
        console.log(data);
        // const cacheId = cache.identify(data.sprint);
        // cache.modify();
      },
    });
    const items = Array.from(sprints); // items = sprints
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);
    setSprints(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* <pre>{JSON.stringify(sprints, null, 2)}</pre> */}
      <Box>
        <Droppable droppableId="droppableSprint">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {sprints.map((sprint: any) => {
                return (
                  <SprintItem
                    key={sprint.id}
                    sprintData={sprint}
                    row={sprint.row}
                    tasks={sprint.task}
                  />
                );
              })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Box>
    </DragDropContext>
  );
};

export default Sprints;

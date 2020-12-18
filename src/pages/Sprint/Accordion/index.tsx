import React, { useEffect, useState } from "react";
import { Accordion, Box } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";
import SprintItem from "./SprintItem";
import {
  useGetSprintsQuery,
  useUpdateSprintMutation,
} from "../../../generated/graphql";
import Spinner from "../../../components/Spinner";

export const Sprints: React.FC = () => {
  const location = useLocation();
  const projectId = location.pathname.split("/").pop() || "";
  // const [sprints, setSprints] = useState<Record<string, any>[]>([]);
  const { data, loading, error } = useGetSprintsQuery({
    variables: { projectId },
    fetchPolicy: "cache-and-network",
  });
  const sprints = data?.getSprints.sprints;

  const [updateSprintMutation] = useUpdateSprintMutation();

  // useEffect(() => {
  //   if (data?.getSprints.sprints) {
  //     setSprints(data?.getSprints.sprints);
  //   }
  //   console.log("howmany times am i rendering?");
  // }, [data]);

  if (loading) return <Spinner />;
  if (!sprints) return <Spinner />;

  const onDragEnd = (result: Record<string, any>) => {
    if (!result.destination) return;
    console.log("result", result);

    /* fe dnd logic */
    const items = Array.from(sprints);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    /*
        모든 데이터에 대한 로우 변경은 서버에 들어가면 알아서 자동 처리 됨.
        문제는 캐쉬임. 캐쉬도 결국에는  일괄 업데이트를 해주어야함
        위의 fe dnd 로직이 array 자체는 바뀐 어레이를 되돌려주고 있다.
        문제는 캐시의 데이터 형태랑 저 위에 애들이랑 안맞는다는 점.
        (1)물론 캐쉬에도 id가 남아있기 때문에 스플릿 하고 맵을 하면 어찌저찌 가능하긴 함.
        단 스프린트 자체는 무한대로 늘어날 수 있어서 loop 을 하면 성능에 영향이 올 수 있음.

        (2) 업데이트가 끝나면 바로 refetching 을 해오는 방식도 존제. 문제는 db 에 대한 자료요청량이 늘어난다.

        (3) dnd 결과에 따라 일괄적으로 처리할 수 있는 방식이 존재할 것인가?
        아니면 변경된 캐쉬를 통해 빠르게 업데이트를 해야하는가.
      */

    updateSprintMutation({
      variables: {
        projectId,
        options: {
          id: result.draggableId,
          row: result.destination.index,
        },
      },
      update: (cache, { data }) => {
        if (!data) return;
        if (!data.updateSprint.sprint) return;
        const cacheId = cache.identify(data.updateSprint.sprint);
        if (!cacheId) return;
        cache.modify({
          fields: {
            getSprints: (existingSprints, { toReference }) => {
              return [...existingSprints.sprints, toReference(cacheId)];
            },
          },
        });
      },
    });
    // setSprints(items);
  };

  console.log(data?.getSprints.sprints);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box>
        <Droppable droppableId="droppableSprint">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              <Accordion
                allowToggle
                // onChange={() => setSelected(!selected)}
                defaultIndex={0}
              >
                {sprints ? (
                  sprints.map((sprint: any) => {
                    return (
                      <SprintItem
                        key={sprint.id}
                        sprintData={sprint}
                        row={sprint.row}
                        tasks={sprint.task}
                      />
                    );
                  })
                ) : (
                  <Box>Error</Box>
                )}
              </Accordion>
              {provided.placeholder}
              <pre>{JSON.stringify(sprints, null, 2)}</pre>
            </Box>
          )}
        </Droppable>
      </Box>
    </DragDropContext>
  );
};

export default Sprints;

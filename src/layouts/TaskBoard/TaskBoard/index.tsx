import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import { BsPlusCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Heading, { headingEnum } from "../../../components/Heading";
import Text from "../../../components/Text";
import TaskCard, { TaskCardProps } from "../TaskCard";
import IconButton from "../../../components/IconButton";
import {
  Board as boardType,
  Task as taskType,
} from "../../../generated/graphql";
// export type board = {
//   __typename?: "Board" | undefined;
//   id: string;
//   title: string;
//   boardColumnIndex: number;
//   task: task[];
// };

export type TaskBoardProps = TaskCardProps & {
  board: boardType;
  // ref: (element: HTMLElement | null) => any;
  handleBoardCreate: () => void;
  handleBoardDelete: (id: string) => void;
  handleTaskCreate: () => void;
  handleTaskDelete: (id: string) => void;
  handleTaskClick: (id: string) => void;
};

const TaskBoard: React.FC<TaskBoardProps> = ({
  handleBoardDelete,
  handleTaskCreate,
  board,
  // ref,
  ...props
}): ReactElement => {
  const { handleTaskDelete, handleTaskClick } = props;
  const taskConfig = { handleTaskDelete, handleTaskClick };
  const changeIconColor = (icon: ReactElement, color: string, size: string) => {
    return (
      <Box mx={3}>
        <IconContext.Provider value={{ color, size }}>
          {icon}
        </IconContext.Provider>
      </Box>
    );
  };

  // FIXME : index -> boardRowIndex
  const renderTasks = (tasks: taskType[]) => {
    if (!tasks.length) return null;
    return tasks.map((task, index) => {
      return (
        <Draggable index={index} draggableId={task.id} key={task.id}>
          {(provided) => (
            <Box
              mb={4}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <TaskCard key={task.id} task={task} {...taskConfig} />
            </Box>
          )}
        </Draggable>
      );
    });
  };

  // column
  return (
    <Box w={330} mr={4} minH={1000}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        px={5}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Heading mr={2} headingType={headingEnum.board}>
            {board.title}
          </Heading>
          <Text color="primary.300">{`${board.task?.length}`}</Text>
        </Box>
        <IconButton
          aria-label="delete board"
          iconButtonType="deleteBin"
          color="achromatic.600"
          onClick={() => handleBoardDelete(board.id)}
        />
      </Box>
      <Box
        bgColor="primary.400"
        h="100%"
        p={4}
        mb={4}
        borderRadius={10}
        display="flex"
        flexDir="column"
        alignItems="center"
        minH={170}
      >
        <Droppable droppableId={board.id} type="TASK">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              key={board.id}
            >
              {renderTasks(board.task || [])}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Box
          display="flex"
          justifyContent="center"
          onClick={handleTaskCreate}
          _hover={{ cursor: "pointer" }}
          w={300}
        >
          {changeIconColor(<BsPlusCircleFill />, "#828282", "25")}
        </Box>
      </Box>
    </Box>
  );
};

export default TaskBoard;

/*
{
  "data": {
    "getBoards": {
      "boards": [
        {
          "title": "Hat Rustic Frozen Hat",
          "boardColumnIndex": 0,
          "task": [
            {
              "title": "Liberian Dollar Ball Director",
              "boardRowIndex": null,
              "sprintRowIndex": 1,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Katlynn Smitham DDS"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "Borders",
                    "color": "PINK"
                  }
                }
              ]
            },
            {
              "title": "payment Cliffs indigo",
              "boardRowIndex": null,
              "sprintRowIndex": 3,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Vickie Beer"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "California",
                    "color": "RED"
                  }
                }
              ]
            },
            {
              "title": "Keys Borders Berkshire",
              "boardRowIndex": null,
              "sprintRowIndex": 5,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Camille Morissette"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "backing up",
                    "color": "PINK"
                  }
                }
              ]
            },
            {
              "title": "matrices payment asymmetric",
              "boardRowIndex": null,
              "sprintRowIndex": 6,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Bill Witting III"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "sky blue",
                    "color": "RED"
                  }
                }
              ]
            },
            {
              "title": "Michigan payment Graphic Interface",
              "boardRowIndex": null,
              "sprintRowIndex": 8,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Gina Emmerich"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "Clothing",
                    "color": "PINK"
                  }
                }
              ]
            }
          ]
        }
      ],
      "error": null
    }
  }
}

*/

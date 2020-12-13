import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import TaskBoard, { board, TaskBoardProps } from "../TaskBoard";
import SkeletonBoard from "../TaskBoard/SkeletonBoard";

export type TaskBoardListProps = TaskBoardProps & {
  boards: board[];
  didSprintStart?: boolean;
  projectId: string;
};

const TaskBoardList: React.FC<TaskBoardListProps> = ({
  boards,
  projectId,
  ...props
}): ReactElement => {
  const {
    handleBoardCreate,
    handleBoardDelete,
    handleTaskClick,
    handleTaskCreate,
    handleTaskDelete,
  } = props;
  const boardConfig = {
    handleBoardCreate,
    handleBoardDelete,
    handleTaskClick,
    handleTaskCreate,
    handleTaskDelete,
  };

  const renderBoards = (boards: board[]) => {
    return boards.map((currentBoard) => {
      return (
        <TaskBoard
          key={currentBoard.id}
          board={currentBoard}
          {...boardConfig}
        />
      );
    });
  };
  return (
    <Box display="flex" flexDir="row" minH={1000}>
      {renderBoards(boards)}
      <SkeletonBoard
        handleBoardCreate={handleBoardCreate}
        projectId={projectId}
      />
    </Box>
  );
};

export default TaskBoardList;

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

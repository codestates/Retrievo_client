/* eslint-disable no-nested-ternary */
import { Flex, Box, Text, Divider } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Avatar, { AvatarSize } from "../../../components/Avatar";
import AvatarGroup from "../../../components/AvatarGroup";
import Label from "../../../components/Label";
import Spinner from "../../../components/Spinner";
import { Task } from "../../../generated/graphql";

// import TaskBar from "../../../layouts/TaskBar";
// type userTaskUserType = {
//   src?: string;
//   name?: string;
// };

// type taskDataType = {
//   id: string;
//   taskIndex: number;
//   sprintRowIndex: number;
//   title: string;
//   board: Record<string, string>;
//   userTask: userTaskType[];
// };

type taskListEntryProps = {
  taskData: Task;
  mappedIndex: number;
  setSelectedTask: (id: string | null) => void;
  onTaskOpen: () => void;
  selectedTask: string | null;
};

export const TaskListEntry: React.FC<taskListEntryProps> = ({
  taskData,
  mappedIndex,
  selectedTask,
  setSelectedTask,
  onTaskOpen,
}) => {
  // const [isDesktop] = useMediaQuery("(min-width: 1280px)");

  if (!taskData) return <Spinner />;

  return (
    <>
      <Draggable
        key={taskData.id}
        draggableId={taskData.id}
        index={mappedIndex}
      >
        {(provided) => (
          <>
            <Box
              display="grid"
              gridTemplateColumns="1fr 8rem 5rem"
              gridColumnGap="2rem"
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              alignItems="center"
              p={2}
            >
              <Box>
                <Flex>
                  <Label>{`No. ${taskData.taskIndex}`}</Label>
                  <Text
                    ml={2}
                    fontSize="base"
                    onClick={() => {
                      console.log("마음은 열릴 것입니다.", selectedTask);
                      setSelectedTask(taskData.id);
                      onTaskOpen();
                      console.log("마음이 열렸습니다", selectedTask);
                    }}
                    _hover={{
                      cursor: "pointer",
                      borderBottom: "1px solid",
                    }}
                  >
                    {taskData.title}
                  </Text>
                </Flex>
              </Box>
              <Flex justifyContent="flex-end">
                {taskData.board ? <Label>{taskData.board.title}</Label> : null}
              </Flex>
              <Flex justifyContent="flex-end">
                {taskData.userTask && taskData.userTask.length ? (
                  taskData.userTask.length > 1 ? (
                    <AvatarGroup
                      max={3}
                      size={AvatarSize.sm}
                      avatars={taskData.userTask.map((user: any) => user.user)}
                    />
                  ) : (
                    <Avatar
                      name={taskData.userTask[0].user.username}
                      src={
                        taskData.userTask[0].user.avatar
                          ? taskData.userTask[0].user.avatar
                          : undefined
                      }
                      size="sm"
                    />
                  )
                ) : undefined}
              </Flex>
            </Box>
            <Divider />
          </>
        )}
      </Draggable>
    </>
  );
};

export default TaskListEntry;

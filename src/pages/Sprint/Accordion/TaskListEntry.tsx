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
  setSelectedTask: (id: string) => void;
  onTaskOpen: () => void;
};

export const TaskListEntry: React.FC<taskListEntryProps> = ({
  taskData,
  mappedIndex,
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
            <Flex
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              alignItems="center"
              p={2}
            >
              <Box w="130px">
                <Label>{`No. ${taskData.taskIndex}`}</Label>
              </Box>
              <Box minW="30%" maxW="65%">
                {/* <TaskBar taskId={taskData.id} /> */}
                <Flex>
                  <Text
                    fontSize="base"
                    onClick={() => {
                      setSelectedTask(taskData.id);
                      onTaskOpen();
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
              {/* <Flex w="100%" justifyContent="flex-end">
              </Flex> */}
              <Flex w="100%" justifyContent="flex-end" mr="2rem">
                {taskData.board ? (
                  <Label mr={9}>{taskData.board.title}</Label>
                ) : null}
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
            </Flex>
            <Divider />
          </>
        )}
      </Draggable>
    </>
  );
};

export default TaskListEntry;

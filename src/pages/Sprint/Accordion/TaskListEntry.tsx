import { Flex, Box, Text, Divider } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Avatar, { AvatarSize } from "../../../components/Avatar";
import AvatarGroup from "../../../components/AvatarGroup";
import Label from "../../../components/Label";
// import TaskBar from "../../../layouts/TaskBar";

type userTaskUserType = {
  src?: string;
  name?: string;
};

type userTaskType = {
  user: userTaskUserType;
};

type taskDataType = {
  id: string;
  taskIndex: number;
  sprintRowIndex: number;
  title: string;
  board: Record<string, string>;
  userTask: userTaskType[];
};

type taskListEntryProps = {
  taskData: taskDataType;
  mappedIndex: number;
};

export const TaskListEntry: React.FC<taskListEntryProps> = ({
  taskData,
  mappedIndex,
}) => {
  // const [isDesktop] = useMediaQuery("(min-width: 1280px)");
  return (
    <Draggable key={taskData.id} draggableId={taskData.id} index={mappedIndex}>
      {(provided) => (
        <>
          <Flex
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            alignItems="center"
            p={2}
          >
            <Box w="80px">
              <Label>{`No. ${taskData.taskIndex}`}</Label>
            </Box>
            <Box w="65%">
              {/* <TaskBar taskId={taskData.id} /> */}
              <Text fontSize="base">{taskData.title}</Text>
            </Box>
            <Box w="20%">
              <Label>{taskData.board.title}</Label>
            </Box>
            <Box w="10%">
              {taskData.userTask.length > 1 ? (
                <AvatarGroup
                  max={3}
                  size={AvatarSize.sm}
                  avatars={taskData.userTask.map(
                    (user: userTaskType) => user.user
                  )}
                />
              ) : (
                <Avatar
                  name={taskData.userTask[0].user.name}
                  src={taskData.userTask[0].user.src}
                  size="sm"
                />
              )}
            </Box>
          </Flex>
          <Divider />
        </>
      )}
    </Draggable>
  );
};

export default TaskListEntry;

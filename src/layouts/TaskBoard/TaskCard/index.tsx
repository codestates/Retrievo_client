import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { format } from "date-fns";
import { Task as taskType } from "../../../generated/graphql";
import Heading, { headingEnum } from "../../../components/Heading";
import Text from "../../../components/Text";
import Label from "../../../components/Label";
// import AvatarGroup, { AvatarSize } from "../../../components/AvatarGroup";

export type TaskCardProps = {
  task?: taskType;
  projectId: string;
  handleTaskClick: (id: string) => void;
  setIsDeleteTaskModalOpen?: (isOpen: boolean) => void;
  setDeletedTaskId?: (taskId: string) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  handleTaskClick,
  setDeletedTaskId,
  setIsDeleteTaskModalOpen,
}): ReactElement | null => {
  const renderLabels = () => {
    return task?.taskLabel?.map((labelObj) => {
      const { label } = labelObj;
      return (
        <Label mx={1} key={label.id} bgColor={label.color}>
          {label.name}
        </Label>
      );
    });
  };

  const isoToDate = (date: string | null | undefined): string => {
    if (!date) return "";
    return format(new Date(Number(date)), "MMM d");
  };

  // FIXME
  const renderUsers = () => {
    if (!task) return [];
    const { userTask } = task;
    return userTask?.map((userTaskObj) => {
      const { user } = userTaskObj;
      return { name: user.username, src: user.avatar || "" };
    });
  };

  if (!task) return null;
  if (!setIsDeleteTaskModalOpen) return null;
  if (!setDeletedTaskId) return null;

  return (
    <Box
      w={300}
      minH={160}
      p={4}
      bgColor="achromatic.100"
      borderRadius={10}
      boxShadow="1px 2px 5px rgba(0,0,0,0.2)"
      position="relative"
      _hover={{ cursor: "pointer" }}
      onClick={() => handleTaskClick(task.id)}
    >
      <Box
        position="absolute"
        right={4}
        top={4}
        onClick={() => {
          setIsDeleteTaskModalOpen(true);
          setDeletedTaskId(task.id);
        }}
      >
        <CgClose />
      </Box>
      <Box>
        <Box
          display="flex"
          flexDir="row"
          alignItems="flex-start"
          mb={2}
          _hover={{ cursor: "pointer" }}
        >
          <Text
            fontSize="xs"
            mr={2}
            color="primary.200"
          >{`${task?.taskIndex}`}</Text>
          <Text
            fontSize="xs"
            mr={2}
            color="fail"
          >{`${task?.boardRowIndex}`}</Text>
          <Heading
            pr="1.5rem"
            fontWeight="normal"
            headingType={headingEnum.taskCard}
          >
            {task?.title}
          </Heading>
        </Box>
        <Box display="flex" flexDir="row" alignItems="center" mb={50}>
          {renderLabels()}
        </Box>
      </Box>
      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        position="absolute"
        bottom={5}
        justifyContent="space-between"
      >
        {/* <AvatarGroup size={AvatarSize.sm} avatars={renderUsers()} max={3} /> */}
        <Text ml={2} fontSize="xs" color="achromatic.600">{`${isoToDate(
          task.startDate
        )} ~ ${isoToDate(task.endDate)}`}</Text>
      </Box>
    </Box>
  );
};

export default TaskCard;

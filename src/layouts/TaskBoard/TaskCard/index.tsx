import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { format } from "date-fns";
import { Task as taskType } from "../../../generated/graphql";
import Heading, { headingEnum } from "../../../components/Heading";
import Text from "../../../components/Text";
import Label from "../../../components/Label";
import AvatarGroup, { AvatarSize } from "../../../components/AvatarGroup";

export type TaskCardProps = {
  task?: taskType;
  projectId: string;
  handleTaskClick: (id: string) => void;
  setIsDeleteTaskModalOpen?: (isOpen: boolean) => void;
  setDeletedTaskId?: (taskId: string) => void;
};

interface taskLabelType {
  label: { id: string; name: string; color: string };
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  handleTaskClick,
  setDeletedTaskId,
  setIsDeleteTaskModalOpen,
}): ReactElement | null => {
  const sortLabel = (a: taskLabelType, b: taskLabelType) => {
    if (!a.label || !b.label) return -1;
    return a.label.name.toUpperCase() < b.label.name.toUpperCase() ? -1 : 1;
  };

  const renderLabels = () => {
    const copyTaskLabel = task?.taskLabel?.slice();
    if (!copyTaskLabel) return null;
    return copyTaskLabel.sort(sortLabel).map((labelObj) => {
      const { label } = labelObj;
      return (
        <Label mr="2px" mb="3px" key={label.id} bgColor={label.color}>
          {label.name}
        </Label>
      );
    });
  };

  const isoToDate = (date: string | null | undefined): string => {
    if (!date) return "";
    return format(new Date(Number(date)), "MMM d");
  };

  const renderUsers = () => {
    if (!task) return [];
    const { userTask } = task;
    if (!userTask) return null;
    return userTask.map((userTaskObj) => {
      const { user } = userTaskObj;
      return { name: user.username, src: user.avatar || undefined };
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
      <Box
        minH={120}
        _hover={{ cursor: "pointer" }}
        onClick={() => handleTaskClick(task.id)}
      >
        <Box>
          <Box mb={2} _hover={{ cursor: "pointer" }}>
            <Text
              fontSize="xs"
              color="primary.200"
            >{`Task-${task?.taskIndex}`}</Text>
            <Heading
              pr="1.5rem"
              fontWeight="normal"
              headingType={headingEnum.taskCard}
            >
              {task?.title}
            </Heading>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            flexDir="row"
            alignItems="center"
            mb={6}
          >
            {renderLabels()}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDir="row"
          alignItems="flex-end"
          bottom={5}
          justifyContent="space-between"
        >
          {/* <Text
            fontSize="xs"
            mr={2}
            color="fail"
          >{`${task?.boardRowIndex}`}</Text> */}
          {renderUsers() ? (
            <AvatarGroup size={AvatarSize.sm} avatars={renderUsers()} max={3} />
          ) : null}
          <Text ml={2} fontSize="xs" color="achromatic.600">
            {!task.startDate && !task.endDate
              ? ""
              : `${isoToDate(task.startDate)} ~ ${isoToDate(task.endDate)}`}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskCard;

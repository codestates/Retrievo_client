import React, { ReactElement } from "react";
import { Box, Container } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { RiArrowRightLine } from "react-icons/ri";
import { format } from "date-fns";
import Heading, { headingEnum } from "../../../components/Heading";
import Text from "../../../components/Text";
import Label from "../../../components/Label";
import AvatarGroup, { AvatarSize } from "../../../components/AvatarGroup";

export type label = {
  label: {
    id: string;
    name: string;
    color?: string;
  };
};

export type user = {
  user: {
    id: string;
    username: string;
    avatar: string | null;
  };
};

export type task = {
  id: string;
  title: string;
  startDate: string | null;
  endDate: string | null;
  taskIndex: number;
  userTask: user[];
  taskLabel: label[];
};

export type TaskCardProps = {
  task: task;
  handleTaskDelete: (id: string) => void;
  isDragPositionCard: boolean;
  fromToBoardArr: string[];
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  handleTaskDelete,
  isDragPositionCard = false,
  fromToBoardArr,
}): ReactElement => {
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

  const isoToDate = (date: string | null): string => {
    if (!date) return "";
    return format(new Date(Number(date)), "MMM d");
  };

  const renderUsers = () => {
    if (!task) return [];
    const { userTask } = task;
    return userTask?.map((userTaskObj) => {
      const { user } = userTaskObj;
      return { name: user.username, src: user.avatar || "" };
    });
  };

  if (isDragPositionCard) {
    return (
      <Container
        bgColor="violetBg"
        w={300}
        h={160}
        p={5}
        borderRadius={10}
        border="2px dotted #3949AB"
        boxShadow="1px 2px 5px rgba(0,0,0,0.2)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="violet">{`${fromToBoardArr[0]}`}</Text>
        <Box mx={2}>
          <RiArrowRightLine color="#3949AB" />
        </Box>
        <Text color="violet">{`${fromToBoardArr[1]}`}</Text>
      </Container>
    );
  }

  return (
    <Container
      // bgColor="violetBg"
      w={300}
      h={160}
      p={4}
      borderRadius={10}
      boxShadow="1px 2px 5px rgba(0,0,0,0.2)"
      position="relative"
    >
      <Box
        position="absolute"
        right={4}
        top={4}
        onClick={() => handleTaskDelete(task?.id)}
      >
        <CgClose />
      </Box>
      <Box>
        <Box
          display="flex"
          flexDir="row"
          alignItems="center"
          mb={2}
          _hover={{ cursor: "pointer" }}
        >
          <Text mr={2} color="primary.200">{`${task?.taskIndex}`}</Text>
          <Heading headingType={headingEnum.taskCard}>{task?.title}</Heading>
        </Box>
        <Box display="flex" flexDir="row" alignItems="center">
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
        <AvatarGroup size={AvatarSize.sm} avatars={renderUsers()} max={3} />
        <Text ml={2} fontSize="sm" color="achromatic.600">{`${isoToDate(
          task.startDate
        )} ~ ${isoToDate(task.endDate)}`}</Text>
      </Box>
    </Container>
  );
};

export default TaskCard;

import React from "react";
import { Divider, Container, Box, Flex } from "@chakra-ui/react";
import { ImClipboard } from "react-icons/im";
import { GoChevronDown, GoChevronUp, GoChevronRight } from "react-icons/go";

import { useLocation } from "react-router-dom";
import useLoadMore from "../../../hooks/useLoadMore";
import Heading, { headingEnum } from "../../../components/Heading";
import Text from "../../../components/Text";
import StyledListItem from "./MyTasks.styled";
import { useGetMeQuery } from "../../../generated/graphql";
import Spinner from "../../../components/Spinner";
import Label from "../../../components/Label";

export const MyTasks: React.FC = () => {
  const location = useLocation();
  const projectId = location.pathname.split("/").pop() || "";

  const { data: meData, loading: meLoading } = useGetMeQuery();

  const [items, setItems, visible, loadMore, reset] = useLoadMore([], 3);

  if (meLoading) return <Spinner />;

  if (meData?.getMe?.user?.userTask && items.length === 0) {
    const taskData = meData.getMe.user.userTask.filter((userTask) => {
      return userTask.task.project?.id === projectId;
    });
    setItems(taskData);
  }

  const renderVisible = () => {
    return items.slice(0, visible).map((item) => {
      return (
        <>
          <StyledListItem p={3} bg="achromatic.100" w="100%">
            <Flex ml={9}>{item.task.title}</Flex>
            <Flex ml={5}>
              <Label>{item.task.board.title}</Label>
            </Flex>
            <Flex
              w="100%"
              alignItems="center"
              justifyContent="flex-end"
              color="achromatic.600"
              mr={3}
            >
              <GoChevronRight className="_icon" opacity="0" />
            </Flex>
          </StyledListItem>
          <Divider orientation="horizontal" />
        </>
      );
    });
  };

  return (
    <Box bg="achromatic.200" borderRadius={6} p="0" boxShadow="base">
      <Flex alignItems="center" p={4}>
        <ImClipboard />
        <Box pl={2}>
          <Heading headingType={headingEnum.table}>My Tasks</Heading>
        </Box>
      </Flex>
      {renderVisible()}
      <Flex width="100%" justifyContent="center">
        <button
          type="button"
          onClick={() => (visible >= items.length ? reset(3) : loadMore(3))}
        >
          <Flex alignItems="center" color="achromatic.600" p={2}>
            {visible >= items.length ? <GoChevronUp /> : <GoChevronDown />}
            <Text pl={1} color="achromatic.600" fontSize="sm">
              {visible >= items.length ? "No More" : "See More"}
            </Text>
          </Flex>
        </button>
      </Flex>
    </Box>
  );
};

export default MyTasks;

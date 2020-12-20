import React from "react";
import { Divider, Box, Flex } from "@chakra-ui/react";
import { FiActivity } from "react-icons/fi";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import _ from "lodash";
import { useGetProjectQuery } from "../../../generated/graphql";
import useQuery from "../../../hooks/useQuery";
// import { formatDistanceStrict } from "date-fns";
import useLoadMore from "../../../hooks/useLoadMore";
import Heading, { headingEnum } from "../../../components/Heading";
import Text from "../../../components/Text";
import StyledActivityStream from "./ActivityStream.styled";
import CustomAvatar from "../../../components/Avatar";
import Spinner from "../../../components/Spinner";

export const ActivityStream: React.FC = () => {
  const urlQuery = useQuery();
  const projectId = urlQuery.get("projectId");
  const [items, setItems, visible, loadMore, reset] = useLoadMore([], 2);
  if (!projectId) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading } = useGetProjectQuery({
    variables: {
      projectId,
    },
  });

  if (loading) return <></>;

  if (data?.project.project?.projectPermissions && items.length === 0) {
    const userData = data.project.project.projectPermissions.map(
      (projectPermission) => {
        const storage = {};
        Object.assign(storage, { username: projectPermission.user.username });
        Object.assign(storage, { avatar: projectPermission.user.avatar });

        return storage;
      }
    );
    setItems(userData);
  }

  const dummyItems: { username: string; avatar: string; message: string }[] = [
    {
      username: "Ben award",
      avatar: "",
      message: "update new Video on Youtube",
    },
    {
      username: "Kim Coding ",
      avatar: "",
      message: "write the comment to you",
    },
    { username: "Nomard", avatar: "", message: "create New Task for Sichoi" },
    {
      username: "Kim JungEun",
      avatar: "",
      message: "like Dongoc's new project",
    },
    { username: "Buzz", avatar: "", message: "complete 3 tasks" },
    { username: "Paul Kim", avatar: "", message: "sing a new song" },
    { username: "Pomeranian", avatar: "", message: "assign task to Si Choi" },
    {
      username: "Codestates",
      avatar: "",
      message: "have a new plan for everyone",
    },
    { username: "DKJE", avatar: "", message: "write comment to you" },
    { username: "Sichoi", avatar: "", message: "leave a message on Task 215" },
  ];

  const renderVisible = () => {
    // TODO : dummy를 items로 바꾸기 Notification 생성 후
    return dummyItems.slice(0, visible).map((item) => {
      return (
        <>
          <StyledActivityStream p={2} bg="achromatic.100" w="100%">
            <Flex w="6rem" justifyContent="center" alignItems="center">
              <CustomAvatar name={`${item.username}`} src={`${item.avatar}`} />
            </Flex>
            <Flex w="70%">
              <Text fontWeight="bold" pr={2}>{`${item.username}`}</Text>
              <Text>{item.message}</Text>
            </Flex>
            <Flex
              w="25%"
              alignItems="center"
              justifyContent="flex-end"
              color="achromatic.600"
              pr={4}
            />
          </StyledActivityStream>
          <Divider orientation="horizontal" />
        </>
      );
    });
  };

  return (
    <Box bg="achromatic.200" borderRadius={6} p="0" boxShadow="base">
      <Flex alignItems="center" p={4}>
        <FiActivity />
        <Box pl={2}>
          <Heading headingType={headingEnum.table}>Activity Stream</Heading>
        </Box>
      </Flex>
      {renderVisible()}
      <Flex width="100%" justifyContent="center">
        <button
          type="button"
          onClick={() => (visible >= items.length ? reset(2) : loadMore(2))}
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

export default ActivityStream;

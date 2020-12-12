import React from "react";
import { Divider, Container, Box, Flex } from "@chakra-ui/react";
import { FiActivity } from "react-icons/fi";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { formatDistanceStrict } from "date-fns";
import useLoadMore from "../../../hooks/useLoadMore";
import Heading, { headingEnum } from "../../../components/Heading";
import Text from "../../../components/Text";
import StyledActivityStream from "./ActivityStream.styled";
import CustomAvatar from "../../../components/Avatar";
// data.filter((task) => task.project.id === "182254ec-c66c-4935-85fd-a1796f009a0")
const data = [
  {
    id: "0aac4f5b-8bff-4cf6-944d-7379831bb915",
    avatar:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    username: "Si Choi",
    notification: {
      type: "CREATED",
      createdAt: "1607697173849",
    },
  },
  {
    id: "0aac4f5b-8bff-4cf6-944d-7379831bb915",
    avatar:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    username: "Paul Kim",
    notification: {
      type: "STATUS_CHANGED",
      createdAt: "1507697173866",
    },
  },
  {
    id: "0aac4f5b-8bff-4cf6-944d-7379831bb915",
    avatar:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    username: "Hajeong Song",
    notification: {
      type: "CREATED",
      createdAt: "1407697173849",
    },
  },

  {
    id: "0aac4f5b-8bff-4cf6-944d-7379831bb915",
    avatar:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    username: "JungEun Kim",
    notification: {
      type: "CREATED",
      createdAt: "1607697173884",
    },
  },

  {
    id: "0aac4f5b-8bff-4cf6-944d-7379831bb915",
    avatar:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    username: "Chank Knight",
    notification: {
      type: "STATUS_CHANGED",
      createdAt: "1607697173849",
    },
  },
];

/*
display 되야 하는 저옵(task Notification)
Avatar
Username
Notification : {

  created
}

type: status_changed, created
*/

// formatDistance(subDays(new Date(), 3), 현재)
// //=> "3 days ago"
export const ActivityStream: React.FC = () => {
  // const [data, loading, error] = useSprintsQuery()
  // if(!loading) return spinner
  const [items, setItems, visible, loadMore, reset] = useLoadMore(data, 2);

  const renderVisible = () => {
    return items.slice(0, visible).map((item) => {
      if (typeof item.notification !== "string") {
        return (
          <>
            <StyledActivityStream p={2} bg="achromatic.100" w="100%">
              <Flex w="6rem" justifyContent="center" alignItems="center">
                <CustomAvatar
                  name={`${item.username}`}
                  src={`${item.avatar}`}
                />
              </Flex>
              <Flex w="70%">
                <Text fontWeight="bold" pr={2}>{`${item.username}`}</Text>
                <Text>did something</Text>
              </Flex>
              <Flex
                w="25%"
                alignItems="center"
                justifyContent="flex-end"
                color="achromatic.600"
                pr={4}
              >
                {`${formatDistanceStrict(
                  new Date(Number(item.notification.createdAt)),
                  new Date(),
                  { addSuffix: true }
                )}`}
              </Flex>
            </StyledActivityStream>
            <Divider orientation="horizontal" />
          </>
        );
      }
      return null;
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

import React from "react";
import { Divider, Container, Box, Flex } from "@chakra-ui/react";
import { ImClipboard } from "react-icons/im";
import { GoChevronDown, GoChevronUp, GoChevronRight } from "react-icons/go";

import useLoadMore from "../../../hooks/useLoadMore";
import Heading, { headingEnum } from "../../../components/Heading";
import Text from "../../../components/Text";
import StyledListItem from "./MyTasks.styled";

// data.filter((task) => task.project.id === "182254ec-c66c-4935-85fd-a1796f009a0")
const data = [
  {
    id: "0aac4f5b-8bff-4cf6-944d-7379831bb915",
    title: "initiatives",
    project: {
      id: "182254ec-c66c-4935-85fd-a1796f009a02",
    },
  },
  {
    id: "6b938e35-87f8-4002-8bfd-7fe2f594e8b3",
    title: "cross-platform leverage models",
    project: {
      id: "96b5e054-0954-4692-bfef-61dccf39bbfd",
    },
  },
  {
    id: "0806054f-e118-4e2c-a3af-70808f6a113a",
    title: "collaboration Tactics Tanzanian Shilling",
    project: {
      id: "30d86344-3e54-40ae-94ea-721b02d31e06",
    },
  },

  {
    id: "a607c918-1da7-484a-a8ad-b7b3e9566924",
    title: "virtual",
    project: {
      id: "0c7ff0c8-2bfe-4c82-9163-43281327cc8c",
    },
  },

  {
    id: "844cb460-fa58-4307-8540-c82e12ac093b",
    title: "Eritrea AGP Vista",
    project: {
      id: "0e7e4773-6b4f-4dd3-b775-5da97bfefe1a",
    },
  },

  {
    id: "d5a06121-bddf-4856-93d0-cabba39fa76b",
    title: "Bedfordshire system",
    project: {
      id: "625e8b8a-382c-4967-b847-365e085f349e",
    },
  },
  {
    id: "e6658ef4-7c36-4e12-9f02-a15be5b738ab",
    title: "e-business",
    project: {
      id: "9293ffde-f26d-45a8-b10c-2173ae1fdec6",
    },
  },

  {
    id: "0563b101-5c6c-41da-a13b-738462a5463b",
    title: "Pakistan Rupee XML",
    project: {
      id: "fa5e3a2d-0df1-44a0-aef6-d22cb6d4ef9d",
    },
  },

  {
    id: "f7c3ab10-1c05-40ed-8719-8853cf0c012e",
    title: "Rand Namibia Dollar West Virginia Soap",
    project: {
      id: "d2f760d8-b027-4303-b3a7-ce4cb0726069",
    },
  },
  {
    id: "c7600b2d-e599-48f4-9cb2-480e1f5aae3d",
    title: "Phased Analyst plum",
    project: {
      id: "b8f31576-5714-4b91-be2e-9ecd40e4c190",
    },
  },
];

export const MyTasks: React.FC = () => {
  // const [data, loading, error] = useSprintsQuery()
  // if(!loading) return spinner

  const [items, setItems, visible, loadMore, reset] = useLoadMore(data, 3);

  const renderVisible = () => {
    return items.slice(0, visible).map((item) => {
      return (
        <>
          <StyledListItem p={2} bg="achromatic.100" w="100%">
            <Flex w="70%">{item.title}</Flex>
            <Flex
              w="30%"
              alignItems="center"
              justifyContent="flex-end"
              color="achromatic.600"
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
    <Container
      bg="achromatic.200"
      borderRadius={6}
      p="0"
      boxShadow="base"
      maxW="70%"
    >
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
    </Container>
  );
};

export default MyTasks;

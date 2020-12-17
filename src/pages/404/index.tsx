import React, { ReactElement } from "react";
import { Box, Flex, Center } from "@chakra-ui/react";
import Dog from "../Auth/Image/Dog";
import Heading, { headingEnum } from "../../components/Heading";
import Text from "../../components/Text";
import RoundButton, { RoundButtonColor } from "../../components/RoundButton";

const NotFound = (): ReactElement => {
  return (
    <Flex
      w="100%"
      h="100vh"
      bgColor="achromatic.200"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box borderTopRadius={10}>
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          bgColor="primary.200"
          w="45rem"
          py={2}
          px={3}
          borderTopRadius={10}
        >
          <RoundButton
            aria-label="decoration button"
            buttonColor={RoundButtonColor.yellow}
            size="xs"
            mr={2}
          />
          <RoundButton
            aria-label="decoration button"
            buttonColor={RoundButtonColor.red}
            size="xs"
          />
        </Flex>
        <Flex
          bgColor="white"
          w="45rem"
          h="30rem"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Dog />
          <Text>Woof Woof!</Text>
          <Heading headingType={headingEnum.auth}>Page Not Found</Heading>
        </Flex>
      </Box>
    </Flex>
  );
};

export default NotFound;

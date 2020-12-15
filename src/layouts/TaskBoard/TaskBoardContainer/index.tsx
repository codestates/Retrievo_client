import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import Text from "../../../components/Text";
import Button, { buttonColor } from "../../../components/Button";

const TaskBoardContainer = (): ReactElement => {
  return (
    <Box
      w="100%"
      h="80vh"
      borderRadius={10}
      border="2px dotted #31D5BF"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="primary.200">Woof, woof! No Active Sprint!</Text>
      <Text color="primary.200">Create a new one.</Text>
      <a href="/project/sprint">
        <Button
          px={10}
          my={2}
          fontSize="sm"
          buttontype={buttonColor.primary}
          isFullWidth={false}
        >
          View Sprint
        </Button>
      </a>
    </Box>
  );
};

export default TaskBoardContainer;

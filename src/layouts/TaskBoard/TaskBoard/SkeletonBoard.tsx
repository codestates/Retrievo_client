import React, { ReactElement, useState } from "react";
import { FetchResult } from "@apollo/client";
import { Box, useToast, Input } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import { IconContext } from "react-icons";
import Text from "../../../components/Text";
import Heading, { headingEnum } from "../../../components/Heading";
import Modal from "../../Modal/index";
import { CreateBoardMutation } from "../../../generated/graphql";
import Spinner from "../../../components/Spinner";

export type boardType = {
  [key: string]: any;
};

export type SkeletonBoardProps = {
  projectId: string;
  handleBoardCreate: (
    title: string,
    projectId: string
  ) => Promise<
    FetchResult<CreateBoardMutation, Record<string, any>, Record<string, any>>
  >;
  setIsChanged: (status: boolean) => void;
};

const SkeletonBoard: React.FC<SkeletonBoardProps> = ({
  handleBoardCreate,
  projectId,
  setIsChanged,
}): ReactElement => {
  const [isCreating, setIsCreating] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const changeIconColor = (icon: ReactElement, color: string, size: string) => {
    return (
      <Box mx={3}>
        <IconContext.Provider value={{ color, size }}>
          {icon}
        </IconContext.Provider>
      </Box>
    );
  };

  const handleBoardCreateSubmit = async () => {
    try {
      const res = await handleBoardCreate(inputValue, projectId);
      console.log("create", res.data);
      if (res.errors) {
        toast({
          title: "Board Creation Failed😂",
          description: `${res.errors}`,
          duration: 5000,
          status: "error",
          position: "bottom-right",
        });
      } else {
        toast({
          title: "Board Creation Succeed🥳",
          description: "Board is created",
          duration: 5000,
          status: "success",
          position: "bottom-right",
        });

        setTimeout(() => {
          setIsChanged(true);
        }, 800);
      }
    } catch (err) {
      console.log(err);
    }
    setIsCreating(false);
  };

  return (
    <Box w={330}>
      <Heading
        mt={2}
        mb={3}
        w={330}
        headingType={headingEnum.board}
        color="achromatic.500"
      >
        Add New Board
      </Heading>
      <Box
        h="100%"
        mb={4}
        p={4}
        borderRadius={10}
        bgColor={isCreating ? "primary.400" : "transparent"}
        border={isCreating ? "none" : "2px dotted #31D5BF"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        _hover={isCreating ? {} : { bgColor: "violetBg", cursor: "pointer" }}
        onClick={() => setIsCreating(true)}
      >
        {isCreating ? null : (
          <>
            <Box my={2} w={300} display="flex" justifyContent="center">
              {changeIconColor(<GoPlus />, "#31D5BF", "25")}
            </Box>
            <Text color="primary.200">Add Board...</Text>
          </>
        )}
      </Box>
      <Modal
        title="Create New Board"
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        secondaryText="Submit"
        secondaryAction={handleBoardCreateSubmit}
        buttonColor="primary.200"
        buttonFontColor="white"
      >
        <Input onChange={(e) => setInputValue(e.target.value)} />
      </Modal>
    </Box>
  );
};

export default SkeletonBoard;

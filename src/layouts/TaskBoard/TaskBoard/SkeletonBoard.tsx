import React, { ReactElement, useState } from "react";
import { FetchResult } from "@apollo/client";
import * as yup from "yup";
import { Box, useToast, Input } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { GoPlus } from "react-icons/go";
import { IconContext } from "react-icons";
import Text from "../../../components/Text";
import Heading, { headingEnum } from "../../../components/Heading";
import Form from "../../../components/Form";
import Modal from "../../Modal/index";
import { CreateBoardMutation } from "../../../generated/graphql";

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
  lazyGetBoard: (options: Record<string, string>) => void;
};

const SkeletonBoard: React.FC<SkeletonBoardProps> = ({
  handleBoardCreate,
  projectId,
  lazyGetBoard,
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
      }
      // history.push(`/project/board/${projectId}`);
    } catch (err) {
      console.log(err);
      // setIsCreating(false);
    }
    setIsCreating(false);
    // history.push(`/project/board/${projectId}`);
  };

  const validationSchema = yup.object({
    board: yup.string().required(),
  });

  const renderHeaderOrInput = () => {
    return isCreating ? (
      <Form
        initialValues={{ board: "" }}
        validationSchema={validationSchema}
        buttonPosition="right"
        onSubmit={handleBoardCreateSubmit}
        isOnBlurSubmit={false}
        // isFullButton={false}
        // isSubmitButton
        // isCancelButton
        onCancel={() => setIsCreating(false)}
      >
        <Box display="flex" flexDir="row" alignItems="center" px={2} w={330}>
          <Input
            isEditable={false}
            isLabelNonVisible
            label="board"
            name="board"
            type="text"
          />
          <Box
            ml={2}
            _hover={{ cursor: "pointer" }}
            onClick={() => setIsCreating(false)}
          >
            <CgClose />
          </Box>
        </Box>
      </Form>
    ) : null;
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
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          // defaultValue={board.title}
        />
      </Modal>
    </Box>
  );
};

export default SkeletonBoard;

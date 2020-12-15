import React, { ReactElement, useState } from "react";
import * as yup from "yup";
import { Box } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { GoPlus } from "react-icons/go";
import { IconContext } from "react-icons";
import Text from "../../../components/Text";
import Heading, { headingEnum } from "../../../components/Heading";
import Form from "../../../components/Form";
import Input from "../../../components/Input";

export type boardType = {
  [key: string]: any;
};

export type SkeletonBoardProps = {
  handleBoardCreate: (title: string, projectId: string) => Promise<any>;
  projectId: string;
};

const SkeletonBoard: React.FC<SkeletonBoardProps> = ({
  handleBoardCreate,
  projectId,
}): ReactElement => {
  const [isCreating, setIsCreating] = useState(false);

  const changeIconColor = (icon: ReactElement, color: string, size: string) => {
    return (
      <Box mx={3}>
        <IconContext.Provider value={{ color, size }}>
          {icon}
        </IconContext.Provider>
      </Box>
    );
  };

  const handleBoardCreateSubmit = async (
    value: boardType,
    { setFieldError }: any
  ) => {
    await handleBoardCreate(value.board, projectId);
    // console.log(res);
    // if (res.data?.createBoard.error) {
    //   console.log("error");
    //   setFieldError(
    //     res.data.createBoard.error.field,
    //     res.data.createBoard.error.message
    //   );
    // } else {
    //   console.log("success");
    setIsCreating(false);
    // }
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
    ) : (
      <Heading
        mt={2}
        mb={3}
        headingType={headingEnum.board}
        color="achromatic.500"
      >
        Add Board
      </Heading>
    );
  };

  return (
    <Box w={330}>
      {renderHeaderOrInput()}
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
    </Box>
  );
};

export default SkeletonBoard;

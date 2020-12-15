import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import Text from "../../../components/Text";

export type DragPositionCardProps = {
  fromToBoardArr: string[];
};

const DragPositionCard: React.FC<DragPositionCardProps> = ({
  fromToBoardArr,
}): ReactElement | null => {
  return (
    <Box
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
      <Text color="violet">{`${fromToBoardArr && fromToBoardArr[0]}`}</Text>
      <Box mx={2}>
        <RiArrowRightLine color="#3949AB" />
      </Box>
      <Text color="violet">{`${fromToBoardArr && fromToBoardArr[1]}`}</Text>
    </Box>
  );
};

export default DragPositionCard;

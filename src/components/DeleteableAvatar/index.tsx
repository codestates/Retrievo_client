import React from "react";
import { IconButton } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import Avatar, { BetterAvatarProps } from "../Avatar";
import { AvatarBox } from "./DeleteableAvatar.styled";

type indexProps = BetterAvatarProps & {
  userId?: string;
  handleDelete: (id: string | undefined) => void;
};

const DeleteableAvatar: React.FC<indexProps> = ({
  handleDelete,
  userId,
  ...props
}) => {
  return (
    <AvatarBox position="relative">
      <Avatar {...props} />
      <IconButton
        position="absolute"
        top="0"
        right="0"
        size="full"
        borderRadius="full"
        colorScheme="teal"
        aria-label="Delete assignee"
        icon={<IoMdClose />}
        onClick={() => handleDelete(userId)}
      />
    </AvatarBox>
  );
};

export default DeleteableAvatar;

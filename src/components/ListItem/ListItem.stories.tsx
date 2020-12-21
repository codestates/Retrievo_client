import { Avatar } from "@chakra-ui/react";
import React from "react";
import ListItem, { listItemProps } from ".";

export const basicItemList = (args: listItemProps): React.ReactElement => {
  return (
    <ListItem {...args}>
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      List Item 1
    </ListItem>
  );
};

basicItemList.args = {
  width: "100%",
  bg: "achromatic.200",
};

const ListItemStories = {
  title: "components/ListItem",
  component: ListItem,
  argTypes: {},
};

export default ListItemStories;

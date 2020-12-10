import React from "react";
import Avatar, { BetterAvatarProps } from "./index";

export const basicAvatar = (arg: BetterAvatarProps): React.ReactElement => (
  <Avatar {...arg} />
);

basicAvatar.args = {
  name: "Kim JungEun",
  src:
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
};

const AvatarStories = {
  title: "components/Avatar",
  component: Avatar,
  argTypes: {
    name: {
      control: {
        type: "text",
      },
    },
    src: {
      control: {
        type: "text",
      },
    },
    size: {
      control: {
        type: "select",
        options: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"],
      },
    },
  },
};

export default AvatarStories;

import React from "react";
import UserSelector from "./index";

export const basicUserSelector = ({ ...args }): React.ReactElement => {
  return <UserSelector {...args} />;
};

const users = [
  {
    id: "aksdkakd",
    value: "stupy",
    label: "stupy",
    username: "stupy",
    avatar:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    id: "afwws",
    value: "prettie",
    label: "prettie",
    username: "prettie",
    avatar:
      "https://images.unsplash.com/photo-1592159371936-61a70cbeb5f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGhhbXN0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    id: "akdnsbamk",
    value: "bunny",
    label: "bunny",
    username: "bunny",
    avatar:
      "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    id: "5asfja",
    value: "cuttie pie",
    label: "cuttie pie",
    username: "cuttie pie",
    avatar:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
];

const defaultValue = [
  {
    id: "akdnsbamk",
    value: "bunny",
    label: "bunny",
    username: "bunny",
    avatar:
      "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
];

basicUserSelector.args = {
  defaultValue,
  options: users,
};

const ListItemStories = {
  title: "components/UserSelector",
  component: UserSelector,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          "추가, 삭제 이벤트 시 서버에 api 리퀘스트 후 변경된 state로 다시 Component들을 렌더링 해야합니다",
      },
    },
  },
};

export default ListItemStories;

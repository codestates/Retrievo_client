import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
// import Button from "./components/Button";
// import Heading, { headingStyle } from "./components/Heading";
import LabelSearchInput from "./components/UserDropDownList";

// const fruits = [
//   { id: "1", value: "apple", label: "Apple" },
//   { id: "2", value: "banana", label: "Banana" },
//   { id: "3", value: "mango", label: "Mango" },
//   { id: "4", value: "kiwi", label: "Kiwi" },
//   { id: "5", value: "치킨밸류", label: "치킨" },
//   { id: "6", value: "만두", label: "만두" },
//   { id: "7", value: "탕수육", label: "탕수육" },
//   { id: "8", value: "초밥", label: "초밥" },
// ];

// const defaultValue = [
//   { id: "4", value: "kiwi", label: "Kiwi" },
//   { id: "5", value: "치킨밸류", label: "치킨" },
// ];

const users = [
  {
    id: "aksdkakd",
    value: "stupy",
    label: "stupy",
    username: "stupy",
    src:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    id: "afwws",
    value: "prettie",
    label: "prettie",
    username: "prettie",
    src:
      "https://images.unsplash.com/photo-1592159371936-61a70cbeb5f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGhhbXN0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    id: "akdnsbamk",
    value: "bunny",
    label: "bunny",
    username: "bunny",
    src:
      "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
  {
    id: "5asfja",
    value: "cuttie pie",
    label: "cuttie pie",
    username: "cuttie pie",
    src:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
];

const defaultValue = [
  {
    id: "akdnsbamk",
    value: "bunny",
    label: "bunny",
    username: "bunny",
    src:
      "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
  },
];

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        {/* <Heading headingType={headingStyle.board}>Retrievo</Heading> */}
        <LabelSearchInput options={users} defaultValue={defaultValue} />
        <p>이거 밀리는지 확인</p>
      </ChakraProvider>
    </>
  );
};

export default App;

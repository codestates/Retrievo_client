import { Button, useToast } from "@chakra-ui/react";
import React from "react";

export const BasicToast = (): React.ReactElement => {
  const toast = useToast();
  return (
    <>
      <p>toast는 custom hook형태로 사용된다</p>
      <Button
        onClick={() =>
          toast({
            title: "제목",
            description: "설명할 내용을 친절하게 적는다",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          })
        }
      >
        누르면 scuess toast가 생성되는 버튼
      </Button>
      <Button
        onClick={() =>
          toast({
            title: "제목",
            description: "설명할 내용을 친절하게 적는다",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          })
        }
      >
        누르면 fail toast가 생성되는 버튼
      </Button>
    </>
  );
};

const ToastStories = {
  title: "components/Toast",
  component: BasicToast,
  argTypes: {},
};

export default ToastStories;

import React, { useState } from "react";

interface dataProps {
  [key: string]: string;
}

interface dataObject {
  [key: string]: string | dataProps;
}

// eslint-disable-next-line no-unused-vars
type loadMoreFunc = (itemNum: number) => void;
// eslint-disable-next-line no-unused-vars
type resetFunc = (visibleNum: number) => void;

export const useLoadMore = (
  initialItems: dataObject[],
  initialVisible: number
): [
  dataObject[],
  React.Dispatch<dataObject[]>,
  number,
  loadMoreFunc,
  resetFunc
] => {
  const [items, setItems] = useState<dataObject[]>(initialItems);
  const [visible, setVisible] = useState(initialVisible);

  const loadMore = (itemNum: number): void => {
    setVisible((prev) => prev + itemNum);
  };

  const reset = (visibleNum: number) => {
    setVisible(visibleNum);
  };

  return [items, setItems, visible, loadMore, reset];
};

export default useLoadMore;

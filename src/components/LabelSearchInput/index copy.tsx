/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable indent */
import React from "react";
import Downshift from "downshift";
import { Input, List, ListItem, Box } from "@chakra-ui/react";
import Label from "../Label";

export type item = {
  id?: string;
  value: string;
  label?: string;
  // color: string; TODO
};

export type LabelSearchInputProps = {
  items: item[];
};

// TODO : input을 formik으로
const LabelSearchInput: React.FC<LabelSearchInputProps> = ({ items }) => {
  // TODO : delete 기능을 넣어야 하는데... 어떻게 넣을 것인가....
  // const deleteSeletedItem = (selectedItem: item) => {
  //   selectedItem = null;
  // };

  const renderSeletedItems = (selectedItem: item) => {
    if (!selectedItem) return null;
    console.log("selectedItem", selectedItem);
    return (
      <Label hasCloseButton onClose={() => console.log("close")}>
        {selectedItem.value}
      </Label>
    );
  };

  return (
    <Downshift
      // onChange={(selection) =>
      //   alert(selection ? `You selected ${selection.value}` : "Selection Cleared")
      // }
      itemToString={(item) => (item ? item.value : "")}
    >
      {({
        // props
        getInputProps, // v
        getItemProps, // seletedItem
        getLabelProps, // v
        getMenuProps,
        // getRootProps,

        // state
        isOpen, // dropdown open (boolean)
        inputValue, // filtering
        highlightedIndex, // selected background
        selectedItem, // add items
      }) => (
        <div style={{ position: "relative", maxWidth: "30rem" }}>
          <label {...getLabelProps()} style={{ display: "block" }}>
            Label
          </label>
          <Box padding="sm">{renderSeletedItems(selectedItem)}</Box>
          <div
          // {...getRootProps({}, { suppressRefError: true })} // << 얘가 뭔지 모르겠어영... // This ref is used to catch a common set of errors around composite components.
          >
            <Input
              {...getInputProps()}
              border="1px"
              borderColor="achromatic.400"
              placeholder="select your label"
              isFullWidth
            />
          </div>
          <List
            border="1px"
            borderColor="achromatic.400"
            borderRadius="md"
            display={isOpen ? "block" : "none"}
            position="absolute"
            right="0"
            background="achromatic.100"
            w="100%"
            maxH="xs"
            zIndex="999"
            // px="sm"
            {...getMenuProps({ style: { overflowY: "scroll" } })}
          >
            {isOpen
              ? items
                  .filter((item) => {
                    if (!inputValue && item?.value === selectedItem?.value)
                      return false;
                    if (!inputValue || item.value.includes(inputValue))
                      return true;
                    return false;
                  })
                  .map((item, index) => (
                    <ListItem
                      color={
                        selectedItem === item ? "primary.200" : "achromatic.800"
                      }
                      bgColor={
                        highlightedIndex === index
                          ? "violetBg"
                          : "achromatic.100"
                      }
                      // py="md"
                      {...getItemProps({
                        key: item.value,
                        index,
                        item, // 무엇을 render할 것인지 명시
                        // style: {
                        //   backgroundColor:
                        //     highlightedIndex === index
                        //       ? "violetBg"
                        //       : "achromatic.100",
                        //   fontWeight: selectedItem === item ? "bold" : "normal",
                        // },
                      })}
                    >
                      {item.value}
                    </ListItem>
                  ))
              : null}
          </List>
        </div>
      )}
    </Downshift>
  );
};

export default LabelSearchInput;

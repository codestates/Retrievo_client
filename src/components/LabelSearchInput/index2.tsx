/* eslint-disable indent */
import React from "react";

import AsyncCreatableSelect from "react-select/async-creatable";

const options = [
  { label: "testLabel1", value: "testValue1", id: "testId1" },
  { label: "testLabel2", value: "testValue2", id: "testId2" },
  { label: "testLabel3", value: "testValue3", id: "testId3" },
  { label: "testLabel4", value: "testValue4", id: "testId4" },
  { label: "testLabel5", value: "testValue5", id: "testId5" },
  { label: "testLabel6", value: "testValue6", id: "testId6" },
];

const defaultValue = [
  { label: "testLabel1", value: "testValue1", id: "testId1" },
  { label: "testLabel2", value: "testValue2", id: "testId2" },
];

enum actionTypes {
  selectOption = "select-option",
  deselectOption = "deselect-option",
  removeValue = "remove-value",
  popValue = "pop-value",
  setValue = "set-value",
  clear = "clear",
  createOption = "create-option",
}

export type labelItem = {
  id: string;
  value: string;
  label: string;
  color: string;
};

const filterColors = (inputValue: string) => {
  const currentOptions = options.filter(
    (i) => !i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
  return currentOptions;
};

// const getCreatedValue = (newValue: labelItem[]): labelItem[] => {
//   return _.difference(newValue, currentOptions);
// };

// const deleteValueFromValues = (deletedValue: labelItem): labelItem[] => {
//   return _.without(currentOptions, deletedValue);
// };

// const handleCreateChange = (newValue: labelItem[]) => {
//   const created = getCreatedValue(newValue);
//   createTaskLabel(created[0]);
//   setCurrentOptions(newValue);
// };

// const handleDeleteChange = (deletedValue: labelItem) => {
//   const newValue = deleteValueFromValues(deletedValue);
//   deleteTaskLabel(deletedValue);
//   setCurrentOptions(newValue);
// };

const promiseOptions = (inputValue: any) => {
  console.log("promise inputValue:", inputValue);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 500);
  });
};

const createLabel = (newValue: string) => {
  console.log("newValue:", newValue);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleChange = (newValue: any, { action }: { action: string }) => {
  switch (action) {
    case actionTypes.selectOption:
      console.log("selectOption:", newValue);
      break;
    case actionTypes.createOption:
      console.log("createOptions:", newValue);
      break;

    case actionTypes.removeValue:
      console.log("removeValue:", newValue);
      break;
    case actionTypes.popValue:
      console.log("popValue:", newValue);
      break;

    default:
      break;
  }
};

export const LabelSearchInput: React.FC<Record<string, never>> = () => {
  return (
    <AsyncCreatableSelect
      cacheOptions
      defaultValue={defaultValue}
      isMulti
      onChange={handleChange}
      onCreateOption={createLabel}
      loadOptions={promiseOptions}
    />
  );
};

export default LabelSearchInput;

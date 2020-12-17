/* eslint-disable react/jsx-fragments */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import React from "react";
import CreatableSelect from "react-select/creatable";
import { Box } from "@chakra-ui/react";
import _ from "lodash";
import { createLabel } from "typescript";
import Label from "../Label";

export type labelItem = {
  id: string;
  value: string;
  label: string;
  color: string;
};

export type OptionsType = {
  options: labelItem[] | null | undefined;
  defaultValue?: labelItem[] | null | undefined;
  createTaskLabel: (name: string) => void;
  deleteTaskLabel: (item: labelItem) => void;
};

enum actionTypes {
  selectOption = "select-option",
  deselectOption = "deselect-option",
  removeValue = "remove-value",
  popValue = "pop-value",
  setValue = "set-value",
  clear = "clear",
  createOption = "create-option",
}

const LabelSearchInput: React.FC<OptionsType> = ({
  options,
  defaultValue,
  createTaskLabel,
  deleteTaskLabel,
}) => {
  // const getCreatedValue = (newValue: labelItem[]): labelItem[] => {
  //   return _.difference(newValue, currentOptions);
  // };

  // const deleteValueFromValues = (deletedValue: labelItem): labelItem[] => {
  //   return _.without(currentOptions, deletedValue);
  // };

  const handleCreateChange = (newValue: labelItem[]) => {
    console.log("handleCreateChange", newValue);
    // const created = getCreatedValue(newValue);
    // createTaskLabel(created[0]);
  };

  const handleDeleteChange = (deletedValue: labelItem) => {
    console.log("handleDeleteChange", deletedValue);
    // const newValue = deleteValueFromValues(deletedValue);
    // deleteTaskLabel(deletedValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (newValue: any, { action }: { action: string }) => {
    switch (action) {
      case actionTypes.selectOption:
      case actionTypes.createOption:
        handleCreateChange(newValue);
        break;

      case actionTypes.removeValue:
      case actionTypes.popValue:
        handleDeleteChange(newValue);
        break;

      default:
        break;
    }
  };

  const renderLabels = () => {
    return defaultValue?.map((label) => {
      return (
        <Label
          key={label.id}
          m={1}
          bgColor={label.color}
          hasCloseButton
          onClose={() => handleDeleteChange(label)}
        >
          {label.value}
        </Label>
      );
    });
  };

  const onCreate = (input: string) => {
    createTaskLabel(input);
  };

  return (
    <React.Fragment>
      <Box spacing="5px" marginBottom="0.5rem">
        {renderLabels()}
      </Box>
      <CreatableSelect
        isMulti
        onChange={handleChange}
        options={options || undefined}
        onCreateOption={onCreate}
        defaultValue={defaultValue}
        placeholder="Select Task's Label"
        styles={{
          multiValue: (base) => ({
            ...base,
            display: "none",
            backgroundColor: "primary.100",
          }),
          clearIndicator: (base) => ({
            ...base,
            display: "none",
          }),
        }}
      />
    </React.Fragment>
  );
};

export default LabelSearchInput;

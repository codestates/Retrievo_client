/* eslint-disable react/jsx-fragments */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import React from "react";
import CreatableSelect from "react-select/creatable";
import { Box } from "@chakra-ui/react";
import _ from "lodash";
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
  const handleCreatedValue = (values: labelItem[]): void => {
    if (!defaultValue || defaultValue.length < 1) {
      createTaskLabel(values[0].label);
      return;
    }
    console.log("-------delete start");
    console.log("values:", values);
    console.log("defaultValue:", defaultValue);
    const newValue = values.filter(
      (el) => !defaultValue.find((oldValue) => oldValue.id === el.id)
    );
    console.log("-------newValue:", newValue);
    console.log("-------delete end:");
    createTaskLabel(newValue[0].label);
  };
  const handleDeleteChange = (selectedValue: labelItem) => {
    deleteTaskLabel(selectedValue);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (newValue: any, { action }: { action: string }) => {
    switch (action) {
      // case actionTypes.createOption:
      case actionTypes.selectOption:
        handleCreatedValue(newValue);
        break;
      case actionTypes.removeValue:
        handleDeleteChange(newValue);
        break;
      default:
        break;
    }
  };
  const renderLabels = () => {
    console.log("defaultValue:", defaultValue);
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

  const renderSelect = () => {
    console.log("renderSelect");
    return (
      <CreatableSelect
        isMulti
        onChange={handleChange}
        options={options || undefined}
        onCreateOption={onCreate}
        defaultValue={defaultValue}
        value={defaultValue}
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
    );
  };

  return (
    <React.Fragment>
      <Box spacing="5px" marginBottom="0.5rem">
        {renderLabels()}
      </Box>
      {renderSelect()}
    </React.Fragment>
  );
};
export default LabelSearchInput;

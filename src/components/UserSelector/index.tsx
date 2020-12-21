/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react/jsx-fragments */
import React, { useState } from "react";
import Select, { components } from "react-select";
import { Box, HStack } from "@chakra-ui/react";
import _ from "lodash";
import DeleteableAvatar from "../DeleteableAvatar";

const MultiValueContainer = (props: any) => {
  return <components.MultiValueContainer {...props} />;
};

const ClearIndicator = (props: any) => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles("clearIndicator", props)}
    />
  );
};

export type userItem = {
  id?: string;
  value?: string;
  label?: string;
  username?: string;
  avatar?: string | null;
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

export type UserSelectPropTypes = {
  options: userItem[] | undefined;
  defaultValue?: userItem[] | undefined | null;
  deleteAssignee: (id: string) => void;
  createAssignee: (id: string) => void;
};

const UserSelect: React.FC<UserSelectPropTypes> = ({
  options,
  defaultValue,
  deleteAssignee,
  createAssignee,
}) => {
  const handleCreatedValue = (values: userItem[]) => {
    if (!defaultValue || defaultValue.length < 1) {
      if (values[0].id) {
        createAssignee(values[0].id);
      }
      return;
    }
    const newValue = values.filter(
      (el) => !defaultValue.find((oldValue) => oldValue.id === el.id)
    );

    if (newValue[0].id) {
      createAssignee(newValue[0].id);
    }
  };

  const handleDeleteChange = (newValue: userItem) => {
    if (!newValue.id) return;
    deleteAssignee(newValue.id);
  };

  const handleChange = (newValue: any, { action }: { action: string }) => {
    switch (action) {
      case actionTypes.selectOption:
      case actionTypes.createOption:
        handleCreatedValue(newValue);
        break;

      case actionTypes.removeValue:
        handleDeleteChange(newValue);
        break;

      default:
        break;
    }
  };

  const sortUserName = (a: userItem, b: userItem) => {
    if (!a.username || !b.username) return -1;
    return a.username.toUpperCase() < b.username.toUpperCase() ? -1 : 1;
  };

  const renderMembers = () => {
    return defaultValue
      ? defaultValue.sort(sortUserName).map((user) => {
          return (
            <DeleteableAvatar
              key={user.id}
              src={user.avatar || ""}
              name={user.username}
              userId={user.id}
              handleDelete={(id) => {
                if (!id) return;
                deleteAssignee(id);
              }}
              size="sm"
              mr={1}
              mb={1}
            />
          );
        })
      : null;
  };

  return (
    <React.Fragment>
      <HStack spacing="5px" marginBottom="0.5rem" wrap="wrap">
        {renderMembers()}
      </HStack>
      <Box position="relative">
        <Select
          closeMenuOnSelect={false}
          components={{ MultiValueContainer, ClearIndicator }}
          styles={{
            multiValue: (base) => ({
              ...base,
              display: "none",
            }),
            clearIndicator: (base) => ({
              ...base,
              display: "none",
            }),
          }}
          value={defaultValue}
          defaultValue={defaultValue}
          isMulti
          placeholder="add user to assignee"
          options={options?.sort(sortUserName)}
          onChange={handleChange}
        />
      </Box>
    </React.Fragment>
  );
};

export default UserSelect;

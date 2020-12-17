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
  const [currentOptions, setCurrentOptions] = useState<userItem[]>(
    defaultValue || []
  );

  const getCreatedValue = (newValue: userItem[]): userItem => {
    return _.difference(newValue, currentOptions)[0];
  };

  const getDeletedValue = (newValue: userItem[]): userItem => {
    return _.difference(currentOptions, newValue)[0];
  };

  const handleCreateChange = (newValue: userItem[]) => {
    const newUser = getCreatedValue(newValue);
    // TODO: create api 실행
    if (!newUser.id) return;
    createAssignee(newUser.id);
    setCurrentOptions(newValue);
  };

  const handleDeleteChange = (newValue: userItem[]) => {
    getDeletedValue(newValue);
    // TODO: delete Mutation
    setCurrentOptions(newValue);
  };

  const handleChange = (newValue: any, { action }: { action: string }) => {
    switch (action) {
      case actionTypes.selectOption:
      case actionTypes.createOption:
        // selectOption: 리스트 선택시
        // createOption: 없던 옵션 생성시
        // TODO : create mutation
        handleCreateChange(newValue);
        break;

      case actionTypes.removeValue:
        handleDeleteChange(newValue);
        // removeValue: 라벨 하나의 x 버튼 눌렀을시
        setCurrentOptions(newValue);
        break;

      case actionTypes.clear:
        console.log("clear");
        // 전체삭제 버튼 눌렀을 시
        break;

      case actionTypes.deselectOption:
        console.log("deselectOption");
        break;

      case actionTypes.setValue:
        console.log("setValue");
        break;

      default:
        break;
    }
  };

  const renderMembers = () => {
    return currentOptions
      ? currentOptions.map((user) => {
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
            />
          );
        })
      : null;
  };

  return (
    <React.Fragment>
      <HStack spacing="5px" marginBottom="0.5rem">
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
          defaultValue={defaultValue}
          isMulti
          placeholder="add user to assignee"
          options={options}
          onChange={handleChange}
        />
      </Box>
    </React.Fragment>
  );
};

export default UserSelect;

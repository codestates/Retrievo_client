/* eslint-disable indent */
/* eslint-disable react/jsx-fragments */
import React, { useState } from "react";
import Select, { components } from "react-select";
import { HStack } from "@chakra-ui/react";
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

type item = {
  id: string;
  value?: string;
  label?: string;
  username: string;
  avatar?: string;
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

type OptionsType = {
  options: item[];
  defaultValue: item[];
};

const MemberSelect: React.FC<OptionsType> = ({ options, defaultValue }) => {
  const [currentOptions, setCurrentOptions] = useState<item[]>(defaultValue);

  const getCreatedValue = (newValue: item[]): item[] => {
    return _.difference(newValue, currentOptions);
  };

  const getDeletedValue = (newValue: item[]): item[] => {
    return _.difference(currentOptions, newValue);
  };

  const handleCreateChange = (newValue: item[]) => {
    getCreatedValue(newValue);
    // TODO: create api 실행
    setCurrentOptions(newValue);
  };

  const handleDeleteChange = (newValue: item[]) => {
    getDeletedValue(newValue);
    // TODO : delete Mutation
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
      case actionTypes.popValue:
        handleDeleteChange(newValue);

        // console.log(deleted);
        // removeValue: 라벨 하나의 x 버튼 눌렀을시
        // popvalue: 백스페이스로 삭제시
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
    return currentOptions.map((user) => {
      return (
        <DeleteableAvatar
          src={user.avatar}
          name={user.username}
          userId={user.id}
          handleDelete={(id) => console.log(id)}
        />
      );
    });
  };

  return (
    <React.Fragment>
      <HStack spacing="5px" marginBottom="0.5rem">
        {renderMembers()}
      </HStack>
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
        options={options}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

export default MemberSelect;

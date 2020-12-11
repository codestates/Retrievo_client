/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import _ from "lodash";

type item = { id: string; value: string; label: string };

type OptionsType = {
  options: item[];
  defaultValue: item[];
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

const ReactSelect: React.FC<OptionsType> = ({ options, defaultValue }) => {
  const [currentOptions, setCurrentOptions] = useState<item[]>(defaultValue);

  const getCreatedValue = (newValue: item[]): item[] => {
    return _.difference(newValue, currentOptions);
  };

  const getDeletedValue = (newValue: item[]): item[] => {
    return _.difference(currentOptions, newValue);
  };
  // label, value, __isNew__: true;

  const handleChange = (newValue: any, { action }: { action: string }) => {
    console.log("newValue:", newValue);

    switch (action) {
      case actionTypes.selectOption:
      case actionTypes.createOption:
        // selectOption: 리스트 선택시
        // createOption: 없던 옵션 생성시
        // TODO : create mutation
        const created = getCreatedValue(newValue);
        console.log(created);
        setCurrentOptions(newValue);
        break;

      case actionTypes.removeValue:
      case actionTypes.popValue:
        const deleted = getDeletedValue(newValue);
        console.log(deleted);
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

  return (
    <CreatableSelect
      isMulti
      onChange={handleChange}
      options={options}
      defaultValue={defaultValue}
    />
  );
};

export default ReactSelect;

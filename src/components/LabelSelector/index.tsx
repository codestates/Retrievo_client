import React, { useState } from "react";

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";

export type labelSelectorItemType = {
  value: string;
  id: string;
  label: string;
};

export interface labelSelectorProps {
  defaultOption: labelSelectorItemType | undefined;
  options: labelSelectorItemType[] | undefined;
  onChange: (id: Record<string, any>) => void;
}

export const BoardSelector: React.FC<labelSelectorProps> = ({
  defaultOption,
  options,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const renderOptions = () => {
    if (!options) return null;
    return options.map((el) => {
      return (
        <MenuItem
          fontSize=".7rem"
          size="sm"
          key={el.id}
          onClick={() => {
            console.log("el:", el);
            setSelectedOption(el);
            onChange({ boardId: el.id });
          }}
        >
          {el.value}
        </MenuItem>
      );
    });
  };

  return (
    <Menu>
      <MenuButton
        fontSize=".7rem"
        as={Button}
        size="sm"
        height="1.4rem"
        bgColor="primary.300"
        color="achromatic.100"
        rightIcon={<BiChevronDown />}
      >
        {selectedOption && selectedOption.value}
      </MenuButton>
      <MenuList>{defaultOption && renderOptions()}</MenuList>
    </Menu>
  );
};

export default BoardSelector;

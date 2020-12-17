export {};

// /* eslint-disable react/jsx-fragments */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-case-declarations */
// /* eslint-disable indent */
// import React, { useState } from "react";
// import AsyncSelect from "react-select/async";
// import { Box } from "@chakra-ui/react";
// import _ from "lodash";
// import Label from "../Label";

// export type labelItem = {
//   id: string;
//   value: string;
//   label: string;
//   color: string;
// };

// export type OptionsType = {
//   options: labelItem[] | null | undefined;
//   defaultValue?: labelItem[] | null | undefined;
//   createTaskLabel: (item: labelItem) => void;
//   deleteTaskLabel: (item: labelItem) => void;
// };

// enum actionTypes {
//   selectOption = "select-option",
//   deselectOption = "deselect-option",
//   removeValue = "remove-value",
//   popValue = "pop-value",
//   setValue = "set-value",
//   clear = "clear",
//   createOption = "create-option",
// }

// const LabelSearchInput: React.FC<OptionsType> = (
//   {
//     // options,
//     // defaultValue,
//     // createTaskLabel,
//     // deleteTaskLabel,
//   }
// ) => {
//   const filterColors = (inputValue: string) => {
//     return colourOptions.filter((i) =>
//       i.label.toLowerCase().includes(inputValue.toLowerCase())
//     );
//   };

//   const promiseOptions = (inputValue) =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(filterColors(inputValue));
//       }, 1000);
//     });

//   return (
//     <React.Fragment>
//       <Box spacing="5px" marginBottom="0.5rem">
//         {/* {renderLabels()} */}
//       </Box>
//       <AsyncSelect
//         cacheOptions
//         defaultOptions
//         isMulti
//         loadOptions={promiseOptions}
//       />
//     </React.Fragment>
//   );
// };

// export default LabelSearchInput;

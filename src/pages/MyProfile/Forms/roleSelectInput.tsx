import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useField } from "formik";

type role = { id: string; roleName: string };
type roleType = {
  [key: string]: string | number | readonly string[] | undefined;
};
// interface roleSelectInputProps {
//   currentRole: string;
// }

const roles = [
  { key: "Admin", value: "admin" },
  { key: "Member", value: "member" },
];

const RoleSelectInput: React.FC = () => {
  const [field, meta, helpers] = useField("role");
  const renderRoleOptions = () => {
    return roles?.map((role: roleType) => {
      return <option value={role.value}>{role.key}</option>;
    });
  };

  return (
    <FormControl>
      <FormLabel fontWeight="base" m={0}>
        Role
      </FormLabel>
      <Select
        {...field}
        placeholder="Select a role"
        borderColor="achromatic.400"
      >
        {renderRoleOptions()}
      </Select>
    </FormControl>
  );
};

export default RoleSelectInput;

import React from "react";
import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { Formik } from "formik";
import { useLocation } from "react-router-dom";
import Heading, { headingEnum } from "../../../components/Heading";

import CustomAvatar from "../../../components/Avatar";
import useLoadMore from "../../../hooks/useLoadMore";
import { roleType } from "../../MyProfile/Forms/roleSelectInput";
import {
  useUpdateProjectPermissionMutation,
  useGetProjectQuery,
} from "../../../generated/graphql";
import Spinner from "../../../components/Spinner";

// const data = [
//   {
//     id: "0aac4f5b-8bff-4cf6-944d-7379831bb915",
//     avatar:
//       "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
//     username: "Si Choi",
//     role: "member",
//   },
//   {
//     id: "0aac4f5b-8bff-4cf6-944d-7379831bb915",
//     avatar:
//       "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
//     username: "Paul Kim",
//     role: "member",
//   },
//   {
//     id: "0aac4f5b-8bff-4cf6-944d-7379831bb915",
//     avatar:
//       "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
//     username: "Hajeong Song",
//     role: "Admin",
//   },

//   {
//     id: "0aac4f5b-8bff-4cf6-944d-7379831bb915",
//     avatar:
//       "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
//     username: "JungEun Kim",
//     role: "member",
//   },

//   {
//     id: "0aac4f5b-8bff-4cf6-944d-7379831bb915",
//     avatar:
//       "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
//     username: "Chank Knight",
//     role: "member",
//   },
// ];

export const AccessPermission: React.FC = () => {
  const location = useLocation();
  const toast = useToast();
  const projectId = location.pathname.split("/").pop() || "";

  const [items, setItems, visible, loadMore, reset] = useLoadMore([], 5);
  const [isDesktop] = useMediaQuery("(min-width: 1440px)");
  const { data, loading } = useGetProjectQuery({ variables: { projectId } });

  if (data?.project?.project?.projectPermissions) {
    const userData = data?.project?.project?.projectPermissions.map(
      (projectPermission) => projectPermission.user
    );
    if (items.length < 1) {
      setItems(userData);
    }
  }

  const [
    updateProjectPermissionMutation,
    { loading: updateProjectLoading },
  ] = useUpdateProjectPermissionMutation();

  const onSubmit = async (values: Record<string, string>, userId: string) => {
    await updateProjectPermissionMutation({
      variables: {
        projectId,
        isAdmin: values.role === "ADMIN",
        userId,
      },
    });
    toast({
      position: "bottom-right",
      title: "Role Update Success!.",
      description: "User role has been updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const roles = [
    { key: "Admin", value: "ADMIN" },
    { key: "Member", value: "MEMBER" },
  ];

  const renderRoleOptions = () => {
    return roles?.map((role: roleType) => {
      return <option value={role.value}>{role.key}</option>;
    });
  };

  const renderVisible = () => {
    return items.slice(0, visible).map((item) => {
      if (typeof item.notification !== "string") {
        return (
          <>
            <Flex p={2} bg="achromatic.100" w="100%">
              <Flex alignItems="center" w="100%">
                <Flex w="6rem" justifyContent="center" alignItems="center">
                  <CustomAvatar
                    name={`${item.username}`}
                    src={`${item.avatar}`}
                    size="md"
                  />
                </Flex>
                <Flex w={isDesktop ? "75%" : "100%"}>
                  <Text fontWeight="bold" pr={2}>{`${item.username}`}</Text>
                </Flex>
                <Box style={isDesktop ? { width: "15%" } : { width: "33%" }}>
                  <Formik
                    initialValues={{ role: item.role }}
                    onSubmit={(values) => onSubmit(values, item.id)}
                  >
                    {({ values, submitForm, handleChange }) => {
                      return (
                        <FormControl pr={3} justifySelf="flex-end">
                          <FormLabel fontWeight="base" m={0} />
                          <Select
                            name="role"
                            onChange={(e) => {
                              handleChange(e);
                              submitForm();
                            }}
                            defaultValue={item.role}
                            borderColor="achromatic.400"
                          >
                            {renderRoleOptions()}
                          </Select>
                        </FormControl>
                      );
                    }}
                  </Formik>
                </Box>
              </Flex>
            </Flex>
            <Divider orientation="horizontal" />
          </>
        );
      }
      return null;
    });
  };

  if (loading) return <Spinner />;

  return (
    <Box bg="primary.400" mt={12}>
      <Flex alignItems="center" p={4}>
        <Box w="85%">
          <Heading headingType={headingEnum.table}>Access Permission</Heading>
        </Box>
        <Box w="15%">
          <Heading headingType={headingEnum.table} fontWeight="base">
            Role
          </Heading>
        </Box>
      </Flex>
      {renderVisible()}
      <Flex width="100%" justifyContent="center">
        <button
          type="button"
          onClick={() => (visible >= items.length ? reset(5) : loadMore(5))}
        >
          <Flex alignItems="center" color="achromatic.600" p={2}>
            {visible >= items.length ? <GoChevronUp /> : <GoChevronDown />}
            <Text pl={1} color="achromatic.600" fontSize="sm">
              {visible >= items.length ? "" : "See More"}
            </Text>
          </Flex>
        </button>
      </Flex>
    </Box>
  );
};

export default AccessPermission;

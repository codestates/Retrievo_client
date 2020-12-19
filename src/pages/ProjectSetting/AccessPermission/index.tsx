/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Heading, { headingEnum } from "../../../components/Heading";

import CustomAvatar from "../../../components/Avatar";
import useLoadMore from "../../../hooks/useLoadMore";
import { roleType } from "../../MyProfile/Forms/roleSelectInput";
import {
  useUpdateProjectPermissionMutation,
  useGetProjectQuery,
  useInviteUserMutation,
} from "../../../generated/graphql";
import Spinner from "../../../components/Spinner";
import ModalLayout from "../../../layouts/Modal";
import { useQuery } from "../../../hooks/useQuery";

export const AccessPermission: React.FC = () => {
  const urlQuery = useQuery();
  const projectId = urlQuery.get("projectId");
  const toast = useToast();

  if (!projectId) {
    toast({
      position: "bottom-right",
      title: "Bad Request",
      description: "Project ID doesn't Exist",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
    return <p>ProjectId does not exist</p>;
  }

  const [items, setItems, visible, loadMore, reset] = useLoadMore([], 5);
  const [isDesktop] = useMediaQuery("(min-width: 1440px)");
  const { data, loading } = useGetProjectQuery({ variables: { projectId } });
  const [numInvitation, setNumInvitation] = useState<number>(1);

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
  ] = useUpdateProjectPermissionMutation();

  const [inviteUserMutation] = useInviteUserMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (loading) return <Spinner />;

  const onSubmit = async (values: Record<string, string>, userId: string) => {
    const res = await updateProjectPermissionMutation({
      variables: {
        projectId,
        isAdmin: values.role === "ADMIN",
        userId,
      },
    });

    if (res.data?.updateProjectPermission.error) {
      toast({
        position: "bottom-right",
        title: "Role Update Failed!",
        description: res.data?.updateProjectPermission.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    toast({
      position: "bottom-right",
      title: "Role Update Success!",
      description: "User role has been updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const onInvitation = async (values: Record<string, string>) => {
    const filtered = Object.values(values).filter((email) => email.length > 1);
    const res = await inviteUserMutation({
      variables: { projectId, emails: filtered },
    });

    if (res.data?.inviteUser.error) {
      toast({
        position: "bottom-right",
        title: "User Invitation Failed!",
        description: res.data?.inviteUser.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    onClose();
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
                    {({ submitForm, handleChange }) => {
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
      <Flex p={3} bg="achromatic.100" w="100%">
        <Flex
          ml={7}
          alignItems="center"
          color="achromatic.500"
          onClick={() => onOpen()}
          _hover={{ cursor: "pointer", color: "black" }}
        >
          <AiOutlinePlusCircle size="2rem" />

          <Text pl={3}>Invite New Member...</Text>
        </Flex>
      </Flex>
      <ModalLayout
        title="Invite Member(s)"
        display="none"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={() => {
          setNumInvitation(1);
          onClose();
        }}
        footer={false}
      >
        <Formik
          initialValues={{
            email0: "",
            email1: "",
            email2: "",
            email3: "",
            email4: "",
            email5: "",
            email6: "",
            email7: "",
            email8: "",
            email9: "",
          }}
          onSubmit={onInvitation}
          validationSchema={Yup.object({
            email0: Yup.string()
              .email("Must be valid Email Format")
              .required("Please enter email address"),
            email1: Yup.string().email("Must be valid Email Format"),

            email2: Yup.string().email("Must be valid Email Format"),

            email3: Yup.string().email("Must be valid Email Format"),

            email4: Yup.string().email("Must be valid Email Format"),

            email5: Yup.string().email("Must be valid Email Format"),

            email6: Yup.string().email("Must be valid Email Format"),

            email7: Yup.string().email("Must be valid Email Format"),

            email8: Yup.string().email("Must be valid Email Format"),

            email9: Yup.string().email("Must be valid Email Format"),
          })}
        >
          {({ values, handleChange, submitForm, isSubmitting }: any) => {
            const elements = new Array(numInvitation).fill("");
            return (
              <>
                {/* {JSON.stringify(numInvitation, null, 2)} */}
                <Box>
                  <ErrorMessage component="div" name="email0" />
                  <ErrorMessage component="div" name="email1" />
                  <ErrorMessage component="div" name="email2" />
                  <ErrorMessage component="div" name="email3" />
                  <ErrorMessage component="div" name="email4" />
                  <ErrorMessage component="div" name="email5" />
                  <ErrorMessage component="div" name="email6" />
                  <ErrorMessage component="div" name="email7" />
                  <ErrorMessage component="div" name="email8" />
                  <ErrorMessage component="div" name="email9" />
                </Box>
                {elements.map((el, count) => (
                  <Flex alignItems="center" mt={3}>
                    <Input
                      type="text"
                      name={`email${count}`}
                      placeholder="Enter email..."
                      value={values[`email${count}`]}
                      onChange={handleChange}
                    />
                    <Box>
                      <Flex
                        ml={3}
                        onClick={() => {
                          if (numInvitation >= 10) {
                            toast({
                              title: "Invalid Action",
                              description:
                                "You cannot invite more than 10 people at once",
                              status: "error",
                              duration: 9000,
                              isClosable: true,
                            });
                            return;
                          }
                          setNumInvitation((prev) => prev + 1);
                        }}
                        color="lightGrey"
                        _hover={{ color: "grey", cursor: "pointer" }}
                        display={count > 0 ? "none" : undefined}
                      >
                        <AiOutlinePlusCircle size="2rem" />
                      </Flex>
                      <Flex
                        ml={3}
                        onClick={() => setNumInvitation((prev) => prev - 1)}
                        color="lightGrey"
                        _hover={{ color: "grey", cursor: "pointer" }}
                        display={count < 1 ? "none" : undefined}
                      >
                        <AiOutlineMinusCircle size="2rem" />
                      </Flex>
                    </Box>
                  </Flex>
                ))}
                <Flex justifyContent="flex-end" w="100%">
                  <Button
                    mr={6}
                    mt={6}
                    mb={3}
                    onClick={() => submitForm()}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Invite Member(s)
                  </Button>
                </Flex>
              </>
            );
          }}
        </Formik>
      </ModalLayout>
      <Divider orientation="horizontal" />
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

/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, useDisclosure } from "@chakra-ui/react";
import { GiSittingDog } from "react-icons/gi";
import { IconContext } from "react-icons";
import Heading, { headingEnum } from "../../components/Heading";
import ProjectListDropdown from "./ProjectListDropdown";
import IconButton, { IconButtonType } from "../../components/IconButton";
import AvatarGroup, { AvatarSize } from "../../components/AvatarGroup";
import {
  useGetMeQuery,
  useGetProjectQuery,
  Project as ProjectType,
} from "../../generated/graphql";
import ROUTES from "../../utils/RoutePath";
import useProjectIdParam from "../../hooks/useProjectParam";
import ModalLayout from "../Modal";
import MyProfile from "../MyProfile";
import Spinner from "../../components/Spinner";

export type TopNavPropsType = {
  projectId: string;
};

const TopNav: React.FC<Record<string, never>> = () => {
  /* Project Query & Props */
  const history = useHistory();
  const projectId = useProjectIdParam();

  if (!projectId) {
    history.push("/");
    return null;
  }

  const { data, loading } = useGetMeQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: userData, loading: userLoading } = useGetProjectQuery({
    variables: { projectId },
  });

  if (loading) return <Spinner />;
  if (!data) {
    history.push("/");
    return null;
  }

  const projectPermissions = data?.getMe.user?.projectPermissions;
  const currentProject = projectPermissions?.find(
    ({ project }: { project: ProjectType }) => project.id === projectId
  );

  if (!currentProject) {
    history.push("/new-project");
  }

  const projectConfig = { projectPermissions, currentProject };

  const usersInProject = userData?.project?.project?.projectPermissions;
  const mapUserToAvatar = () => {
    if (!usersInProject) return null;
    return usersInProject.map(({ user }) => {
      return {
        name: user.username,
        src: user.avatar || undefined,
      };
    });
  };

  const changeIconColor = () => {
    return (
      <>
        <IconContext.Provider value={{ color: "#4F4F4F", size: "25" }}>
          <GiSittingDog />
        </IconContext.Provider>
      </>
    );
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      zIndex={999}
      bg="achromatic.200"
      w="100%"
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={10}
      h={50}
      boxShadow="0 2px 2px rgba(0,0,0,0.1)"
      z-index="1"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width={450}
      >
        <Box display="flex" alignItems="center">
          {changeIconColor()}
          <Link to={ROUTES.LANDING}>
            <Heading ml={1} headingType={headingEnum.homepage}>
              Retrievo
            </Heading>
          </Link>
        </Box>
        {loading || !data?.getMe.user?.projectPermissions ? null : (
          <ProjectListDropdown {...projectConfig} />
        )}
      </Box>
      <Box display="flex">
        {!userLoading && mapUserToAvatar() ? (
          <AvatarGroup
            avatars={mapUserToAvatar()}
            size={AvatarSize.sm}
            max={3}
          />
        ) : null}
        <Box>
          <IconButton
            fontSize="xl"
            color="achromatic.700"
            aria-label="notification"
            iconButtonType={IconButtonType.notification}
          />

          <ModalLayout
            title=""
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            css={{ display: "none" }}
            footer={false}
          >
            <MyProfile />
          </ModalLayout>
          <IconButton
            onClick={onOpen}
            fontSize="xl"
            color="achromatic.700"
            aria-label="profile"
            iconButtonType={IconButtonType.user}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TopNav;

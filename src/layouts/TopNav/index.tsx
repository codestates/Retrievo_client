import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { GiSittingDog } from "react-icons/gi";
import { IconContext } from "react-icons";
import Heading, { headingEnum } from "../../components/Heading";
import ProjectListDropdown from "./ProjectListDropdown";
import IconButton, { IconButtonType } from "../../components/IconButton";
import AvatarGroup, { AvatarSize } from "../../components/AvatarGroup";
import { useGetMeQuery, useGetProjectQuery } from "../../generated/graphql";
import useQuery from "../../hooks/useQuery";
import ROUTES from "../../utils/RoutePath";

export type TopNavPropsType = {
  projectId: string;
};

const TopNav: React.FC<Record<string, never>> = () => {
  /* Project Query & Props */
  const query = useQuery();
  const projectId = query.get("projectId");
  const { data, loading } = useGetMeQuery();

  if (!projectId) return null;

  const projectPermissions = data?.getMe.user?.projectPermissions;
  const currentProject = projectPermissions?.find(
    ({ project }) => project.id === projectId
  );
  const projectConfig = { projectPermissions, currentProject };

  /* User Query */
  const { data: userData, loading: userLoading } = useGetProjectQuery({
    variables: { projectId },
  });
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
          {/* <Link to="/notification"> */}
          <IconButton
            fontSize="xl"
            color="achromatic.700"
            aria-label="notification"
            iconButtonType={IconButtonType.notification}
          />
          {/* </Link> */}
          <Link to={`${ROUTES.MY_PROFILE}?projectId=${projectId}`}>
            <IconButton
              fontSize="xl"
              color="achromatic.700"
              aria-label="project member list"
              iconButtonType={IconButtonType.user}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default TopNav;

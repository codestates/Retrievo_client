import { Center, Container, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import Avatar from "../../components/Avatar";
import Form from "./Forms";

import Heading, { headingEnum } from "../../components/Heading";
import RoundButton, {
  IconType,
  RoundButtonColor,
  ShadowType,
} from "../../components/RoundButton";
import StyledProfileWrapper from "./MyProfile.styled";
import TopNav from "../../layouts/TopNav";

const args = {
  projects: [
    {
      id: "1",
      name: "Rock Paper Queens",
    },
    {
      id: "2",
      name: "My Blueberry",
    },
    {
      id: "3",
      name: "Current Project",
    },
    {
      id: "4",
      name: "Retrievo",
    },
  ],
  currentProject: {
    id: "4",
    name: "Retrievo",
  },
  onProjectSelect: (id: string) => console.log(id),
  avatars: [
    {
      name: "stupy",
      src:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "prettie",
      src:
        "https://images.unsplash.com/photo-1592159371936-61a70cbeb5f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGhhbXN0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "bunny",
      src:
        "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "cuttie pie",
      src:
        "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
  ],
};

export const MyProfile: React.FC = () => {
  const [isTablet] = useMediaQuery("(max-width: 80em)");

  const maxW = isTablet ? "560px" : "30%";

  return (
    <>
      <TopNav {...args} />
      <Container maxW={maxW} mt={16}>
        <Center>
          <Heading headingType={headingEnum.page} fontSize="2.5rem">
            My Profile
          </Heading>
        </Center>
        <Center mt={6}>
          <StyledProfileWrapper>
            <Avatar size="2xl" boxShadow="5px 5px 5px rgba(0, 0, 0, 0.4)" />
            <RoundButton
              aria-label="Button to upload profile"
              buttonColor={RoundButtonColor.primary}
              color="white"
              iconType={IconType.camera}
              shadowType={ShadowType.xl}
              fontSize="xl"
            />
          </StyledProfileWrapper>
        </Center>
        <Form />
      </Container>
    </>
  );
};

export default MyProfile;

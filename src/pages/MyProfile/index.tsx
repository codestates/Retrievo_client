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

export const MyProfile: React.FC<Record<string, never>> = () => {
  const [isTablet] = useMediaQuery("(max-width: 80em)");

  const maxW = isTablet ? "560px" : "30%";

  return (
    <>
      <TopNav />
      <Container maxW={maxW} mt={16}>
        <Center mt={40}>
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

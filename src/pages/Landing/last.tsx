import React from "react";
import {
  Box,
  Button,
  Heading as ChakraHeading,
  Flex,
  Image,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import Heading, { headingEnum } from "../../components/Heading";
import {
  BackgroundShapePupple,
  BackgroundShapeTeal,
  // BackgroundShape,
} from "./background.styled";
import Text from "../../components/Text";

/* Image File */
import Shape1 from "../../asset/img/shape1.png";
import Shape2 from "../../asset/img/shapes2.png";
import Shape3 from "../../asset/img/shapes3.png";
import Shape4 from "../../asset/img/shapes4.png";
import Shape5 from "../../asset/img/shapes5.png";
import Shape6 from "../../asset/img/shapes6.png";
import Shape7 from "../../asset/img/shapes7.png";
import Shape8 from "../../asset/img/shapes8.png";
import Shape9 from "../../asset/img/shapes9.png";
import Shape10 from "../../asset/img/shapes10.png";
import Shape11 from "../../asset/img/shapes11.png";
import Shape12 from "../../asset/img/shapes12.png";
import TaskImage from "../../asset/img/TaskImage.png";
import TaskBoard from "../../asset/img/TaskBoard.png";
import LandingAstro from "../../asset/img/LandingAstro";
import RoundButton, { RoundButtonColor } from "../../components/RoundButton";

const Landing: React.FC<Record<string, never>> = () => {
  return (
    <>
      {/* boardList section */}
      <Box
        width="full"
        height={900}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        bg="#f7f7f7"
        position="relative"
        overflow="hidden"
      >
        <Flex flexDir="column" mt={180} position="relative">
          <Flex
            justifyContent="flex-end"
            alignItems="center"
            bgColor="#DCE0E0"
            width="50rem"
            py={2}
            px={3}
            borderTopRadius="xl"
          >
            <IconButton
              aria-label="decoration button"
              bgColor="yellow.300"
              size="xs"
              borderRadius="full"
              mr={2}
            />
            <IconButton
              aria-label="decoration button"
              bgColor="red.500"
              size="xs"
              borderRadius="full"
            />
          </Flex>
          <Image
            src={Shape10}
            alt="background_shape_image"
            size="45rem"
            position="absolute"
            left="-40rem"
            bottom="-20rem"
            // transform="rotate(-2deg)"
          />
          <Image
            src={TaskBoard}
            alt="Board_example_image"
            width="50rem"
            h="35rem"
            objectFit="contain"
            borderBottomRadius="xl"
            boxShadow="2xl"
            bgColor="white"
            zIndex={999}
          />
          <Image
            src={Shape5}
            alt="background_shape_image"
            size="45rem"
            position="absolute"
            right="-6rem"
            bottom="4rem"
            // transform="rotate(-2deg)"
          />
        </Flex>
        <Flex flexDir="column" ml={20} mt={300}>
          <Box position="relative">
            <Image
              src={Shape7}
              alt="background_shape_image"
              size="45rem"
              position="absolute"
              right="-6rem"
              bottom="4rem"
            />
            <Box position="relative" w={500}>
              <Box
                w={450}
                h={8}
                bg="primary.200"
                color="transparent"
                position="absolute"
                top={6}
              >
                dummy
              </Box>
              <ChakraHeading
                fontSize="4xl"
                fontWeight="bold"
                position="absolute"
                zIndex={999}
              >
                Intuitive Task Management
              </ChakraHeading>
              <Text mt={7} position="absolute" top="3rem">
                Manage your tasks however you want
              </Text>
              <Text position="absolute" top="6.5rem">
                with our flexible, intuitive boards.
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
      {/* last section */}
      <Box
        width="full"
        height={700}
        display="flex"
        bg="white"
        zIndex={999}
        position="relative"
      >
        <Image
          src={Shape6}
          alt="background_shape_image"
          size="45rem"
          position="absolute"
          top="-16rem"
          right="-5rem"
          // transform="rotate(-2deg)"
        />
        <Flex flexDir="column" mt="10rem" position="relative" ml="27rem">
          <ChakraHeading
            fontSize="5xl"
            color="achromatic.800"
            fontWeight="normal"
            zIndex={99}
          >
            Don’t EVER pay upfront.
          </ChakraHeading>
          <Text mt={3} mb={12} fontSize="3xl">
            Make informed decision with our product tour
          </Text>
          <Button
            border="2px solid #31D5BF"
            bgColor="white"
            color="#31D5BF"
            borderRadius={5}
            w={170}
            py={5}
          >
            Take tour
          </Button>
          <Box position="absolute" top="-2rem" left="30rem">
            <LandingAstro />
          </Box>
        </Flex>
      </Box>
      {/* footer section */}
      <Box
        width="full"
        height={150}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="achromatic.300"
        px="10rem"
      >
        <Text>RPQ Team</Text>
        <ChakraHeading
          fontFamily="title"
          fontSize="4xl"
          fontWeight="normal"
          color="achromatic.700"
        >
          Retrievo
        </ChakraHeading>
      </Box>
    </>
  );
};

export default Landing;

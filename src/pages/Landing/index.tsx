import React from "react";
import {
  Box,
  Button,
  Heading as ChakraHeading,
  Flex,
  Image,
  Avatar,
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

const Landing: React.FC<Record<string, never>> = () => {
  return (
    <Box width="100%">
      {/* top section */}
      <Box
        position="relative"
        width="100%"
        height="50rem"
        overflow="hidden"
        backgroundImage="linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, rgba(255, 255, 255, 0) 86.41%)"
      >
        <Box width="60rem" height="100%" position="absolute" top="0" right="0">
          <BackgroundShapePupple />
          <BackgroundShapeTeal>
            <Image
              src={Shape11}
              alt="background_shape_image"
              size="45rem"
              position="absolute"
              right="-25rem"
              bottom="0"
              transform="rotate(-2deg)"
            />
          </BackgroundShapeTeal>
          <Image
            src={Shape7}
            alt="background_shape_image"
            position="absolute"
            right="3rem"
            top="9rem"
            boxSize="4rem"
            objectFit="contain"
          />
          <Image
            src={Shape9}
            alt="background_shape_image"
            position="absolute"
            right="14rem"
            bottom="-4.5rem"
            boxSize="12rem"
            objectFit="contain"
          />
          <Image
            src={Shape9}
            alt="background_shape_image"
            position="absolute"
            right="9rem"
            bottom="-3rem"
            boxSize="12rem"
            objectFit="contain"
          />
        </Box>

        <Box
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          py={8}
          px={20}
        >
          <ChakraHeading
            fontFamily="title"
            fontSize="4xl"
            fontWeight="normal"
            color="achromatic.700"
          >
            Retrievo
          </ChakraHeading>
          <Button
            border="2px solid white"
            bgColor="white"
            color="#7499E"
            borderRadius={5}
            w={170}
            py={5}
            mr={3}
          >
            SignIn
          </Button>
        </Box>
        <Box mt={150} width="60%" marginX="auto" position="relative">
          <Image
            src={Shape6}
            alt="background_shape_image"
            boxSize="18rem"
            position="absolute"
            left="13rem"
            top="-13rem"
            objectFit="contain"
          />
          <Flex flexDir="row">
            <ChakraHeading
              fontSize="5xl"
              color="achromatic.800"
              fontWeigh="bold"
              mr={3}
              zIndex={99}
            >
              Powerhouse
            </ChakraHeading>

            <ChakraHeading
              fontSize="5xl"
              color="achromatic.800"
              fontWeight="normal"
              zIndex={99}
            >
              for
            </ChakraHeading>
          </Flex>
          <ChakraHeading
            fontSize="5xl"
            color="achromatic.800"
            fontWeight="normal"
            zIndex={99}
          >
            your work flow
          </ChakraHeading>
          <ChakraHeading
            fontSize="5xl"
            color="achromatic.800"
            fontWeight="normal"
            zIndex={99}
          >
            management
          </ChakraHeading>
          <Text mt={5} mb={7}>
            Let Retrievo handle legworks so you can focus on actual Project
          </Text>
          <Button
            border="2px solid #67499E"
            bgColor="white"
            color="#67499E"
            borderRadius={5}
            w={170}
            py={5}
            mr={3}
          >
            Take tour
          </Button>
          <Button
            border="2px solid #31D5BF"
            bgColor="primary.200"
            color="white"
            borderRadius={5}
            w={170}
            py={5}
          >
            Register
          </Button>
        </Box>
      </Box>
      {/* taskbar section */}
      <Box width="full" height={700} display="flex">
        <Box mt={30}>
          <Box bgColor="rgba(49, 213, 191, 0.5)" />
          <Image
            src={TaskImage}
            alt="Task_example_image"
            width="25rem"
            objectFit="contain"
            borderRadius="md"
            boxShadow="2xl"
          />
          <Box>
            <Avatar />
            <Text>Paul Kim</Text>
          </Box>
          <Box>
            <Avatar />
            <Text>Hailey Song</Text>
          </Box>
        </Box>

        <ChakraHeading fontSize="4xl" fontWeight="bold">
          Manage your tasks
        </ChakraHeading>
        <ChakraHeading fontSize="4xl" fontWeight="bold">
          with intuitive UI
        </ChakraHeading>
        <Box bgColor="primary.200" color="transparent" w={400} h={10}>
          Dummy
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;

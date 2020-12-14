import React from "react";
import {
  Box,
  Button,
  Heading as ChakraHeading,
  Flex,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
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
import Shape13 from "../../asset/img/shape13.png";
import TaskImage from "../../asset/img/TaskImage.png";
import { chartData, chartOptions } from "./chartData";

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
            src={Shape1}
            alt="background_shape_image"
            width="12rem"
            position="absolute"
            left="-16rem"
            bottom="-7rem"
            objectFit="contain"
            transform="rotate(13deg)"
          />
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
      <Box
        backgroundImage="linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, rgba(255, 255, 255, 0) 86.41%)"
        pt={150}
        position="relative"
      >
        <Image
          src={Shape7}
          alt="Task_example_image"
          width="4rem"
          position="absolute"
          top="4rem"
          right="30%"
          objectFit="contain"
        />
        <Box
          maxWidth={1200}
          width="80%"
          height={700}
          marginX="auto"
          display="flex"
          justifyContent="space-between"
        >
          <Box mr={50} position="relative">
            <Box position="absolute" top="rem" left="-10rem" zIndex="-1">
              <Image
                src={Shape4}
                alt="Task_example_image"
                width="12rem"
                transform="rotate(120deg)"
                objectFit="contain"
              />
              <Image
                src={Shape3}
                alt="Task_example_image"
                width="6rem"
                position="absolute"
                right="0"
                top="0"
                transform="rotate(120deg)"
                objectFit="contain"
              />
            </Box>
            <Image
              src={Shape2}
              alt="Task_example_image"
              width="10rem"
              position="absolute"
              bottom="4rem"
              right="-6rem"
              zIndex="-1"
              objectFit="contain"
            />
            <Image
              src={TaskImage}
              alt="Task_example_image"
              width="25rem"
              objectFit="contain"
              borderRadius="md"
              boxShadow="2xl"
            />
            <Box top="5rem" right="-3rem" position="absolute">
              <Avatar
                display="block"
                marginX="auto"
                size="xl"
                src="https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
              />
              <Text
                display="inline-block"
                px={6}
                py=".1rem"
                mt={2}
                color="achromatic.100"
                borderRadius="full"
                bgColor="primary.200"
              >
                Paul Kim
              </Text>
            </Box>
            <Box bottom="8rem" left="-6rem" position="absolute">
              <Avatar
                display="block"
                marginX="auto"
                size="xl"
                src="https://i.ibb.co/bKXpVR6/gnome-shell-screenshot-832-MV0.png"
              />
              <Text
                display="inline-block"
                px={6}
                py=".1rem"
                mt={2}
                color="achromatic.100"
                borderRadius="full"
                bgColor="#67499E"
              >
                Hailey Song
              </Text>
            </Box>
          </Box>
          <Box height={40} width={500} position="relative" mt="10rem">
            <Box
              bgColor="primary.200"
              w={450}
              h={6}
              position="absolute"
              bottom="-.5rem"
              left="5.3rem"
            />
            <Image
              src={Shape13}
              alt="Task_example_image"
              width="8rem"
              position="absolute"
              right="-2rem"
              bottom="-6rem"
              objectFit="contain"
            />
            <Box position="absolute" bottom="0" width="100%">
              <ChakraHeading fontSize="4xl" fontWeight="bold">
                Manage your tasks
              </ChakraHeading>
              <ChakraHeading fontSize="4xl" fontWeight="bold">
                with intuitive UI
              </ChakraHeading>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* chart section */}
      <Box
        backgroundImage="linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, rgba(255, 255, 255, 0) 86.41%)"
        h={800}
      >
        <Box
          maxW={1200}
          w="80%"
          mx="auto"
          pt={230}
          display="flex"
          justifyContent="space-between"
        >
          <Box height={30} width="100%" mt={100} mr={20}>
            <Box position="relative">
              <Box
                bgColor="primary.200"
                w={450}
                h={6}
                position="absolute"
                bottom="-.5rem"
                right="0"
              />
              <Box
                width="100%"
                textAlign="right"
                position="absolute"
                bottom="0"
              >
                <ChakraHeading fontSize="4xl" fontWeight="bold">
                  Manage your tasks
                </ChakraHeading>
                <ChakraHeading fontSize="4xl" fontWeight="bold">
                  with intuitive UI
                </ChakraHeading>
              </Box>
            </Box>
            <Text textAlign="right" mt={8}>
              Data is crucial to every business’s success. Reading data,
              however, could be a straneous task. Visualize your important data
              with our powerful, yet human-friendly data report system.
            </Text>
          </Box>
          <Box>
            <Bar
              data={chartData}
              options={chartOptions}
              width={500}
              height={400}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;

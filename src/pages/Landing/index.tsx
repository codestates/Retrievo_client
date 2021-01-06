import React from "react";
import { Slide } from "react-awesome-reveal";
import {
  Box,
  Heading as ChakraHeading,
  Flex,
  Image,
  Avatar,
  IconButton,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { useHistory, Link } from "react-router-dom";
import ReactPlayer from "react-player/lazy";

import { chartData, chartOptions } from "./chartData";
import { useCreateGuestMutation, useGetMeQuery } from "../../generated/graphql";
import Text from "../../components/Text";
import {
  BackgroundShapePupple,
  BackgroundShapeTeal,
} from "./background.styled";
import Button from "./components/Button/Button.styled";

/* Image File */
import Shape1 from "../../asset/img/shape1.png";
import Shape2 from "../../asset/img/shapes2.png";
import Shape3 from "../../asset/img/shapes3.png";
import Shape4 from "../../asset/img/shapes4.png";
import Shape5 from "../../asset/img/shapes5.png";
import Shape6 from "../../asset/img/shapes6.png";
import Shape7 from "../../asset/img/shapes7.png";
import Shape9 from "../../asset/img/shapes9.png";
import Shape10 from "../../asset/img/shapes10.png";
import Shape11 from "../../asset/img/shapes11.png";
import Shape12 from "../../asset/img/shapes12.png";
import Shape13 from "../../asset/img/shape13.png";
import TaskImage from "../../asset/img/TaskImage.png";
import LandingAstro from "../../asset/img/LandingAstro";
import TaskBoard from "../../asset/img/TaskBoard.png";
import useProjectRoute from "../Auth/useProjectRoute";

const Landing: React.FC<Record<string, never>> = () => {
  const [createGuest] = useCreateGuestMutation();
  const toast = useToast();
  const history = useHistory();
  const { routeToProject } = useProjectRoute();
  const { data, loading } = useGetMeQuery();

  // if (!loading && data?.getMe.user) {
  //   history.push("/project/dashboard");
  // }

  const onCreateGuest = async () => {
    const response = await createGuest();
    console.log("response", response);
    if (response.data?.createGuest.error) {
      toast({
        title: "Guest Creation Failed😂",
        description: `${response.data.createGuest.error.message}`,
        duration: 5000,
        status: "error",
      });
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      routeToProject();
    }
  };

  return (
    <Box width="100%">
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
          <Link to="/auth?type=sign-in">
            <Button borderColor="#fff" backgroundColor="#fff" color="#774499">
              SignIn
            </Button>
          </Link>
        </Box>

        <Box
          mt={150}
          width="80%"
          maxWidth={1200}
          display="flex"
          justifyContent="center"
          marginX="auto"
          position="relative"
        >
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

          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            alignItems="center"
            width="100%"
            maxW="80vw"
          >
            <Slide direction="down" duration={1000}>
              <Box mr="3rem">
                <Flex flexDir="row">
                  <ChakraHeading
                    fontSize="5xl"
                    color="achromatic.800"
                    fontWeight="bold"
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
                  Let Retrievo handle legworks so you can focus on actual
                  Project
                </Text>

                <Tooltip
                  hasArrow
                  label="You can experience the service without membership."
                  bg="#67499E"
                >
                  <Button
                    borderColor="#67499E"
                    backgroundColor="#fff"
                    color="#67499E"
                    onClick={onCreateGuest}
                  >
                    Take tour
                  </Button>
                </Tooltip>
                <Link to="/auth?type=register">
                  <Button
                    borderColor="#31D5BF"
                    backgroundColor="#31D5BF"
                    color="#fff"
                  >
                    Register
                  </Button>
                </Link>
              </Box>
            </Slide>

            <Box
              zIndex="999"
              borderRadius="1rem"
              overflow="hidden"
              mt="-3rem"
              boxShadow="xl"
            >
              <ReactPlayer
                url="https://retrievo-api-graphqi.s3.ap-northeast-2.amazonaws.com/board.mp4"
                playing
                loop
                width="100%"
                height="100%"
              />
            </Box>
          </Box>
        </Box>
      </Box>

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
              <Slide direction="down" duration={1000}>
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
              </Slide>
            </Box>

            <Box bottom="8rem" left="-6rem" position="absolute">
              <Slide direction="down" duration={1000}>
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
              </Slide>
            </Box>
          </Box>
          <Box height="6rem" width={500} position="relative" mt="10rem">
            <Box position="absolute" bottom="0" width="100%">
              <Box
                bgColor="primary.200"
                w={450}
                h={6}
                position="absolute"
                bottom="0"
                left="3rem"
              />
              <Image
                src={Shape13}
                alt="Task_example_image"
                width="8rem"
                objectFit="contain"
                right="0"
                position="absolute"
                top="-2rem"
              />
            </Box>
            <Slide direction="down" duration={1000}>
              <Box width="100%">
                <ChakraHeading fontSize="4xl" fontWeight="bold">
                  Manage your tasks
                </ChakraHeading>
                <ChakraHeading fontSize="4xl" fontWeight="bold">
                  with intuitive UI
                </ChakraHeading>
              </Box>
            </Slide>
          </Box>
        </Box>
      </Box>
      {/* chart section */}
      <Box
        backgroundImage="linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, rgba(255, 255, 255, 0) 86.41%)"
        h={800}
        overflow="hidden"
      >
        <Box
          maxW={1200}
          w="80%"
          mx="auto"
          pt={230}
          display="flex"
          justifyContent="space-between"
          position="relative"
        >
          <Image
            src={Shape13}
            alt="Task_example_image"
            width="12rem"
            position="absolute"
            top={120}
            left="-10rem"
            zIndex="-1"
            transform="rotate(35deg)"
            objectFit="contain"
          />
          <Image
            src={Shape12}
            alt="Task_example_image"
            width="10rem"
            position="absolute"
            right="50%"
            bottom="-6rem"
            objectFit="contain"
          />
          <Image
            src={Shape4}
            alt="Task_example_image"
            width="10rem"
            position="absolute"
            top="-2rem"
            right="-10rem"
            transform="rotate(20deg)"
            objectFit="contain"
          />
          <Box height={30} width="100%" mt={100} mr={20}>
            <Slide direction="down" duration={1000}>
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
                  <Slide direction="down" duration={1000}>
                    <ChakraHeading fontSize="4xl" fontWeight="bold">
                      Manage your tasks
                    </ChakraHeading>
                    <ChakraHeading fontSize="4xl" fontWeight="bold">
                      with intuitive UI
                    </ChakraHeading>
                  </Slide>
                </Box>
              </Box>
              <Text textAlign="right" mt={8}>
                Data is crucial to every business’s success. Reading data,
                however, could be a straneous task. Visualize your important
                data with our powerful, yet human-friendly data report system.
              </Text>
            </Slide>
          </Box>
          <Box zIndex={999}>
            <Bar
              data={chartData}
              options={chartOptions}
              width={500}
              height={400}
            />
          </Box>
        </Box>
      </Box>

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
        <Image
          src={Shape6}
          alt="background_shape_image"
          size="45rem"
          position="absolute"
          bottom="-5rem"
          right="0"
          transform="rotate(-10deg)"
        />
        <Flex flexDir="column" mt={180} position="relative">
          <Flex
            justifyContent="flex-end"
            alignItems="center"
            bgColor="#DCE0E0"
            maxW={1000}
            w="full"
            overflow="hidden"
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
          />
          <Image
            src={TaskBoard}
            alt="Board_example_image"
            maxW={800}
            w="full"
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
            <Box position="relative" w="full" maxW={800}>
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

              <Slide direction="down" duration={1000}>
                <ChakraHeading fontSize="4xl" fontWeight="bold">
                  Intuitive Task Management
                </ChakraHeading>
                <Text mt={10}>Manage your tasks however you want</Text>
                <Text>with our flexible, intuitive boards.</Text>
              </Slide>
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
        overflow="hidden"
      >
        <Flex
          flexDir="column"
          mt="10rem"
          position="relative"
          width="80%"
          maxW={1200}
          mx="auto"
        >
          <Slide direction="down" duration={1000}>
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
            <Tooltip
              hasArrow
              label="You can experience the service without membership."
              bg="#67499E"
            >
              <Button
                borderColor="#31D5BF"
                backgroundColor="#fff"
                color="#31D5BF"
                onClick={onCreateGuest}
              >
                Take tour
              </Button>
            </Tooltip>
          </Slide>
          <Box position="absolute" top="-2rem" left="30rem">
            <LandingAstro />
          </Box>
        </Flex>
      </Box>
      {/* footer section */}
      <Box
        width="full"
        height={100}
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
    </Box>
  );
};

export default Landing;

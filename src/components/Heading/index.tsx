import React from "react";
import { Heading as ChakraHeading } from "@chakra-ui/react";

export enum headingStyle {
  homepage = "for Retrievo hompage title",
  auth = "for register, login, new project title",
  page = "for project pages title",
  table = "for table header",
  sprint = "for sprint title in Board page",
  board = "for board title",
  taskCard = "for task card title in Board page",
  task = "for task title",
  modal = "for modal title",
  article = "for article title",
}

export type HeadingProps = {
  headingType: headingStyle;
  children: string;
};

const Heading: React.FC<HeadingProps> = ({
  headingType,
  children,
  ...props
}) => {
  const renderHeadings = () => {
    // let headingAs = "h2";
    let fontFamily = "heading";
    let fontSize = "6xl";
    let fontWeight = "normal";
    let color = "achromatic.700";

    if (headingType === headingStyle.homepage) {
      // headingAs = "h1";
      fontFamily = "title";
      fontSize = "5xl";
    }

    if (headingType === headingStyle.auth) {
      // headingAs = "h1";
      fontSize = "6xl";
      color = "achromatic.800";
    }

    if (headingType === headingStyle.page) {
      // headingAs = "h1";
      fontSize = "4xl";
      fontWeight = "bold";
    }

    if (headingType === headingStyle.table) {
      // headingAs = "h1";
      fontSize = "xl";
      fontWeight = "bold";
    }

    if (headingType === headingStyle.sprint) {
      // headingAs = "h1";
      fontSize = "3xl";
      fontWeight = "medium";
    }

    if (headingType === headingStyle.board) {
      // headingAs = "h1";
      fontSize = "md";
    }

    if (headingType === headingStyle.taskCard) {
      // headingAs = "h1";
      fontSize = "md";
      fontWeight = "medium";
    }

    if (headingType === headingStyle.task) {
      // headingAs = "h1";
      fontSize = "3xl";
      fontWeight = "medium";
    }

    if (headingType === headingStyle.modal) {
      // headingAs = "h1";
      fontSize = "xl";
      color = "achromatic.800";
    }

    if (headingType === headingStyle.article) {
      // headingAs = "h1";
      fontSize = "4xl";
      fontWeight = "bold";
    }

    return { fontFamily, fontSize, fontWeight, color };
  };
  const headingConfig = renderHeadings();

  return (
    <ChakraHeading {...headingConfig} {...props}>
      {children}
    </ChakraHeading>
  );
};

export default Heading;

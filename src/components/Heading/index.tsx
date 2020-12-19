/* eslint-disable no-unused-vars */
import React from "react";
import {
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingPropsType,
} from "@chakra-ui/react";

export enum headingEnum {
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

export type HeadingProps = ChakraHeadingPropsType & {
  headingType: headingEnum;
  children: string;
  headingFontWeight?: string;
};

const Heading: React.FC<HeadingProps> = ({
  headingType,
  headingFontWeight,
  children,
  ...props
}) => {
  const renderHeadings = () => {
    let fontFamily = "heading";
    let fontSize = "6xl";
    let fontWeight = "normal";
    let color = "achromatic.700";

    if (headingType === headingEnum.homepage) {
      fontFamily = "title";
      fontSize = "3xl";
    }

    if (headingType === headingEnum.auth) {
      fontSize = "5xl";
      color = "achromatic.800";
      fontWeight = headingFontWeight || "normal";
    }

    if (headingType === headingEnum.page) {
      fontSize = "3xl";
      fontWeight = "bold";
    }

    if (headingType === headingEnum.table) {
      fontSize = "xl";
      fontWeight = "bold";
    }

    if (headingType === headingEnum.sprint) {
      fontSize = "xl";
      fontWeight = "medium";
    }

    if (headingType === headingEnum.board) {
      fontSize = "md";
      fontWeight = "medium";
    }

    if (headingType === headingEnum.taskCard) {
      fontSize = "md";
      fontWeight = "medium";
    }

    if (headingType === headingEnum.task) {
      fontSize = "3xl";
      fontWeight = "medium";
    }

    if (headingType === headingEnum.modal) {
      fontSize = "xl";
      color = "achromatic.800";
    }

    if (headingType === headingEnum.article) {
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

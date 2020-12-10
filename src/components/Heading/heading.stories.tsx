import React from "react";
import Heading, { HeadingProps, headingStyle } from "./index";

export const HomepageHeading = ({
  children,
  ...args
}: HeadingProps): React.ReactElement => <Heading {...args}>{children}</Heading>;
HomepageHeading.args = {
  headingType: headingStyle.homepage,
  children: "Retrievo",
};

export const authHeading = ({
  children,
  ...args
}: HeadingProps): React.ReactElement => <Heading {...args}>{children}</Heading>;
authHeading.args = {
  headingType: headingStyle.auth,
  children: "Register",
};

export const pageHeading = ({
  children,
  ...args
}: HeadingProps): React.ReactElement => <Heading {...args}>{children}</Heading>;
pageHeading.args = {
  headingType: headingStyle.page,
  children: "Dashboard",
};

export const tableHeading = ({
  children,
  ...args
}: HeadingProps): React.ReactElement => <Heading {...args}>{children}</Heading>;
tableHeading.args = {
  headingType: headingStyle.table,
  children: "Activity Stream",
};

export const sprintHeading = ({
  children,
  ...args
}: HeadingProps): React.ReactElement => <Heading {...args}>{children}</Heading>;
sprintHeading.args = {
  headingType: headingStyle.sprint,
  children: "Sprint Name",
};

export const boardHeading = ({
  children,
  ...args
}: HeadingProps): React.ReactElement => <Heading {...args}>{children}</Heading>;
boardHeading.args = {
  headingType: headingStyle.board,
  children: "In Progress",
};

export const taskCardHeading = ({
  children,
  ...args
}: HeadingProps): React.ReactElement => <Heading {...args}>{children}</Heading>;
taskCardHeading.args = {
  headingType: headingStyle.taskCard,
  children: "Task Title",
};

export const taskHeading = ({
  children,
  ...args
}: HeadingProps): React.ReactElement => <Heading {...args}>{children}</Heading>;
taskHeading.args = {
  headingType: headingStyle.task,
  children: "Write Task Name",
};

export const modalHeading = ({
  children,
  ...args
}: HeadingProps): React.ReactElement => <Heading {...args}>{children}</Heading>;
modalHeading.args = {
  headingType: headingStyle.modal,
  children: "Invite New Members",
};

export const articleHeading = ({
  children,
  ...args
}: HeadingProps): React.ReactElement => <Heading {...args}>{children}</Heading>;
articleHeading.args = {
  headingType: headingStyle.article,
  children: "Make your data come to life",
};

const HeadingStories = {
  title: "components/Heading",
  component: Heading,
  argTypes: {
    headingType: {
      control: {
        type: "select",
        options: Object.keys(headingStyle),
      },
    },
  },
};

export default HeadingStories;

/* eslint-disable no-unused-vars */
import React from "react";

import PageHeading from "./index";

export const pageHeading = ({ ...args }): React.ReactElement => (
  <PageHeading {...args} />
);
pageHeading.args = {
  pageName: "Sprint",
};

const PageHeadingStories = {
  title: "layouts/PageHeading",
  component: PageHeading,
};

export default PageHeadingStories;

import React from "react";
import Calendar from "./index";

export const DateRangeCalendar = (): React.ReactElement => <Calendar />;

const ButtonStories = {
  title: "components/Calendar",
  component: Calendar,
  // argTypes: {
  //   buttonType: {
  //     control: {
  //       type: "select",
  //       options: Object.keys(buttonColor),
  //     },
  //   },
  // },
};

export default ButtonStories;

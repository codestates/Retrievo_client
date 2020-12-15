import React from "react";
import Calendar, { calendarProps, dateIFC } from "./index";

export const DateRangeCalendar = (arg: calendarProps): React.ReactElement => (
  <Calendar {...arg} />
);

DateRangeCalendar.arg = {
  onSubmit: (value: dateIFC) => console.log(value),
  defaultStartDate: 1602948368862,
  defaultEndDate: 1616167277590,
};

const ButtonStories = {
  title: "components/Calendar",
  component: Calendar,
  // argTypes: {
  //   buttontype: {
  //     control: {
  //       type: "select",
  //       options: Object.keys(buttonColor),
  //     },
  //   },
  // },
};

export default ButtonStories;

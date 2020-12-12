/* eslint-disable no-unused-vars */
import React, { HTMLAttributes, useState } from "react";
import "react-dates/initialize";
import * as moment from "moment";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { Box, Grid } from "@chakra-ui/react";
import { StyledCalendar, StyledTextContainer } from "./calendar.styled";
import Text from "../Text";

export type calendarProps = HTMLAttributes<HTMLElement>;

export type dateType = moment.Moment | null;

export interface dateIFC {
  startDate: dateType;
  endDate: dateType;
}

const Calendar: React.FC<calendarProps> = () => {
  const [startDate, setStartDate] = useState<dateType>(null);
  const [endDate, setEndDate] = useState<dateType>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const handleDatesChange = ({ startDate, endDate }: dateIFC) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  return (
    <StyledCalendar>
      <Grid templateColumns="1fr 1fr" gap="1rem" w="full">
        <Text fontSize="sm" color="achromatic.600" mb="1">
          Start Date
        </Text>
        <Text fontSize="sm" color="achromatic.600" mb="1">
          Due Date
        </Text>
      </Grid>
      <DateRangePicker
        startDate={startDate}
        startDateId="tata-start-date"
        endDate={endDate}
        endDateId="tata-end-date"
        numberOfMonths={1}
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      />
    </StyledCalendar>
  );
};

export default Calendar;

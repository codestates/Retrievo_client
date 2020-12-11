/* eslint-disable no-unused-vars */
import React, { HTMLAttributes, useState } from "react";
import "react-dates/initialize";
import * as moment from "moment";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./react_dates_override.css";

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
    <div className="calendar">
      <div className="calendar__dateTextContainer">
        <span className="calendar__dateText">Start date</span>
        <span className="calendar__dueDate">Due date</span>
      </div>
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
    </div>
  );
};

export default Calendar;

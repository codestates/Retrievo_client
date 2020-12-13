import styled from "@emotion/styled";

export const StyledCalendar = styled.div`
  .DateRangePicker {
    width: 100%;
  }

  .DateRangePickerInput {
    border: none;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1rem 1fr;
  }

  .DateInput {
    width: 100%;
  }

  input.DateInput_input {
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    padding: 0.4rem;
    width: 100%;
    border: 1px solid #d0d0d0;
    border-radius: 0.3rem;
    font-family: "Open Sans, sans-serif";
    font-weight: 400;
    color: #828282;
    font-size: 1rem;
  }

  input.DateInput_input::placeholder {
    font-family: "Open Sans, sans-serif";
    color: #828282;
    font-weight: 400;
  }

  input.DateInput_input:focus::placeholder {
    color: transparent;
  }

  p {
    display: inline;
  }

  .calendar__dateText {
    margin-left: 0.3rem;
    color: #c4c4c4;
  }

  .calendar__dueDate {
    color: #4f4f4f;
    margin-left: 6rem;
  }

  .DateRangePickerInput_arrow_svg {
    display: none;
  }
`;

export const StyledTextContainer = styled.div`
  width: 20rem;
  display: grid;
  grid-template-columns: 50% 2fr;
`;

export default StyledCalendar;

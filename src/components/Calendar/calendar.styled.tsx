import styled from "@emotion/styled";

export const StyledCalendar = styled.div`
  width: 20rem;
  .DateRangePickerInput {
    border: none;
    display: flex;
    width: 20rem;
  }

  .DateInput {
    width: 100%;
  }

  input.DateInput_input {
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    padding: 0 5px;
    padding-top: 2.5px;
    margin-right: 1.3rem;
    width: 9.5rem;
    border: 1.5px solid rgb(219, 219, 219);
    border-radius: 0.3rem;
    font-family: "Open Sans, sans-serif";
    font-weight: 400;
    color: #828282;
  }

  input.DateInput_input::placeholder {
    font-family: "Open Sans, sans-serif";
    color: #c4c4c4;
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
    color: #4f4f4f;
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

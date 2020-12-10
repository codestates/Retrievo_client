import React from "react";
import Spinner, {
  spinnerProps,
  spinnerSize,
  spinnerThickness,
  spinnerColor,
} from ".";

export const basicSpinner = (args: spinnerProps): React.ReactElement => {
  return <Spinner {...args} />;
};

basicSpinner.args = {
  size: "xl",
  thickness: "4px",
  color: "primary.200",
};

const spinnerStories = {
  title: "components/spinner",
  component: Spinner,
  argTypes: {
    size: {
      control: {
        type: "inline-radio",
        options: Object.keys(spinnerSize),
      },
    },
    thickness: {
      control: {
        type: "inline-radio",
        options: Object.keys(spinnerThickness),
      },
    },
    color: {
      control: {
        type: "color",
        options: Object.keys(spinnerColor),
      },
    },
  },
};

export default spinnerStories;

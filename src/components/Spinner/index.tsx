/* eslint-disable no-unused-vars */
import React from "react";
import { Spinner as ChakraSpinner, SpinnerProps } from "@chakra-ui/react";

export enum spinnerSize {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum spinnerThickness {
  xs = "2px",
  sm = "3px",
  md = "4px",
  lg = "6px",
  xl = "8px",
}

export enum spinnerColor {
  primary = "primary.200",
  achromatic = "achromatic.600",
  yellow = "labelYellow",
  orange = "labelOrange",
  warning = "warning",
}

export type spinnerProps = SpinnerProps & {
  thickness?: spinnerThickness;
  size?: spinnerSize;
  color?: spinnerColor;
};

const Spinner: React.FC<spinnerProps> = ({
  thickness,
  size,
  color,
  ...props
}) => {
  return (
    <ChakraSpinner
      thickness={thickness || "4px"}
      speed="0.75s"
      emptyColor="achromatic.200"
      color={color || "primary.200"}
      size={size || "xl"}
      {...props}
    />
  );
};

export default Spinner;

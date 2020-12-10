import React from "react";
import { Avatar, AvatarProps, Tooltip } from "@chakra-ui/react";

export type BetterAvatarProps = AvatarProps;

export enum AvatarSize {
  xxs = "2xs",
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
  xxl = "2xl",
}

export const CustomAvatar: React.FC<BetterAvatarProps> = ({
  name,
  ...props
}) => {
  return (
    <Tooltip label={name} hasArrow>
      <Avatar name={name} color="achromatic.100" {...props} />
    </Tooltip>
  );
};

export default CustomAvatar;

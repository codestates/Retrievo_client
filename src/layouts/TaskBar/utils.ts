import moment from "moment";
import { labelItem as labelItemType } from "../../components/LabelSearchInput";

import { label as BoardLabelType } from "../../components/Label";
import { labelSelectorItemType } from "../../components/LabelSelector";
import { userItem } from "../../components/UserSelector";

export const mappingUserOption = (
  userArr:
    | {
        id?: string;
        user?: {
          id: string;
          username: string;
          avatar?: string | undefined | null;
        };
      }[]
    | null
    | undefined
): userItem[] | undefined => {
  if (!userArr) return undefined;
  return userArr.map(({ user }) => {
    return { ...user, label: user?.username, value: user?.id };
  });
};

export const colorArr = [
  "labelTeal",
  "labelYellow",
  "labelOrange",
  "labelGreen",
  "labelViolet",
  "labelPurple",
  "labelPink",
  "labelCyan",
  "violet",
];

export const mappingLabelOptions = (
  taskLabel:
    | { label: { id: string; name: string; color: string } }[]
    | undefined
    | null
): labelItemType[] | undefined => {
  if (!taskLabel) return undefined;

  return taskLabel.map(({ label }) => ({
    id: label.id,
    value: label.name,
    label: label.name,
    color: label.color,
  }));
};

export const mappingProjectLabelOptions = (
  taskLabel: { id: string; name: string; color: string }[] | undefined | null
): labelItemType[] | undefined => {
  if (!taskLabel) return undefined;

  return taskLabel.map(({ id, name, color }) => ({
    id,
    value: name,
    label: name,
    color,
  }));
};

export const mappingBoardLabel = (
  board: { id: string; title: string }[] | null | undefined
): BoardLabelType[] | undefined => {
  if (!board) return undefined;
  return board.map((el) => {
    return { color: undefined, name: el.title, id: el.id };
  });
};

export const mappingLabelSelectorOptions = (
  values: { id: string; title: string }[]
): labelSelectorItemType[] => {
  return values.map(({ title, id }) => ({
    value: title,
    id,
    label: title,
  }));
};

export const converToUnix = (
  str: string | undefined | null
): moment.Moment | null => {
  if (!str) return null;
  return moment.unix(Number(str) / 1000);
};

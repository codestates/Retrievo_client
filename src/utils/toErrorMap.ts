import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ code, message }) => {
    errorMap[code] = message;
  });

  return errorMap;
};

export default toErrorMap;

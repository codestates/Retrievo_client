import React from "react";

import * as Yup from "yup";
import CustomForm from "../../../components/Form";
import { ProjectNameInput } from "./ProjectNameInput";

const initialValues = {};
const validationSchema = {};
const onSubmit = {};

export const BasicDetail: React.FC = () => {
  return (
    <CustomForm initialValues={} validationSchema={} onSubmit={}>
      <ProjectNameInput />;
    </CustomForm>
  );
};

export default BasicDetail;

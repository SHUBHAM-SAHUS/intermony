import React from "react";

import { FormGenerator } from "react-reactive-form";

const CommonForm = ({ handleSubmit, fieldConfig, setForm }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <FormGenerator onMount={setForm} fieldConfig={fieldConfig} />
    </form>
  );
};

export default CommonForm;

import React from "react";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { getValidationMessage } from "../../../../utils/Validation.js";

// Textinput component

export const TextInput = ({
  handler,
  touched,
  hasError,
  meta,
  status,
  errors
}) => {
  return (
    <div className="pb-3">
      <TextField
        className="d-block"
        type={meta.type}
        variant="outlined"
        label={meta.label}
        placeholder={`Enter ${meta.label}`}
        error={touched && status === "INVALID"}
        {...handler()}
      />
      <small className="input_error" style={{ color: "#f44336" }}>
        {touched && status === "INVALID" && getValidationMessage(meta, errors)}
      </small>
    </div>
  );
};

// Checkbox component
export const CheckBox = ({ handler, meta }) => (
  <div className="lo-W-All">
    <FormControlLabel
      control={<Checkbox color="primary" {...handler("checkbox")} />}
      label={meta.label}
    />
  </div>
);

import React from "react";

import TextField from "@material-ui/core/TextField";

export const FormInput = ({ className, ...props}) =>   (
    <TextField
        {...props}
        className={`${className} select__input`}
        />
);

import React from "react";

import Button from "@material-ui/core/Button";

export const FormButton = ({children, className, ...props}) =>   (
    <Button
        {...props}
        className={`${className} form__button`}
        >{children}</Button>
);

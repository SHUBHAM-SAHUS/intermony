import React from "react";

import {
    Select,
    MenuItem
} from "@material-ui/core";

export const SelectInput = ({options,className, ...props}) =>   (
      <Select
          {...props}
          className={`${className} select__input`}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            getContentAnchorEl: null
          }}
          >
        {
          options.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)
        }
      </Select>
  );
import React from "react";
import { Validators } from "react-reactive-form";

import { TextInput } from "../shared/ui-components/common-form/Field.js";

export const FieldConfig = {
  controls: {
    email: {
      options: {
        validators: [Validators.required, Validators.email]
      },
      render: TextInput,
      meta: { label: "Email", type: "email" }
    },
    password: {
      options: {
        validators: [Validators.required, Validators.minLength(6)]
      },
      render: TextInput,
      meta: { label: "Password", type: "password" }
    },
    $field_0: {
      isStatic: false,
      render: ({ invalid, meta: { handleReset } }) => (

            <div className="lds_login_checbox">
              <input type="checkbox" id="remember_me"  className="mr-2" name="remember_me" />
                <label htmlFor="remember_me">Remember me</label>
              </div>
      )
    },
    $field_1: {
      isStatic: false,
      render: ({ invalid, meta: { handleReset } }) => (
          <div className="pt-5">
            <button
                color="default"
                className="btn-slim text-uppercase btn btn-primary btn-block sign_in_btn pb-3 pt-3"
                type="submit"
                disabled={invalid}
                >
              Sign In
            </button>
          </div>
      )
    }
  }
};
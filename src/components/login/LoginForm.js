import React, { useState } from "react";
import {useDispatch} from "react-redux";
// user action
import * as userAuthAction from "redux/actions/AuthActions";
//import {Link} from "react-router-dom";
// service
import * as commonService from "utils/CommonService.js";
// ui components
import CommonForm from "components/shared/ui-components/common-form";
import { FieldConfig } from "./FieldConfig.js";
import { useCookies } from 'react-cookie';
// Field config to configure form
const LoginForm = ({ history }) => {
  const [localCookies, setCookie] = useCookies(['email', "password"]);
  const [loginForm, setLoginForm] = useState({});
  const dispatch= useDispatch();

  const setCookies =() => {
    let d = new Date();
    d.setTime(d.getTime() + (1000000000 * 15));
    setCookie("email", loginForm.value.email, {path: "/", expires: d});
    setCookie("password", loginForm.value.password, {path: "/", expires: d});
  };

  const handleSubmit = e => {
    e.preventDefault();
    let remember_check = document.getElementById("remember_me");
    dispatch(userAuthAction.login({ body: { user: {...loginForm.value, session_info: {app_version: "1.1", platform: "web"}} }})).then(res => {
      if (res.value.success) {
        if (remember_check.checked) setCookies();
        if (res.value.user.role !== "admin") {
          dispatch(userAuthAction.logout());
          commonService.forError(
              "Only superadmin can access this site!",
              "Error"
          );
        } else {
          commonService.forSuccess("Signed in successfully", "Success");
          history.push("/");
        }
      }})
  };
  const setForm = loginForm => {
    if (localCookies.email && localCookies.password) loginForm.setValue({email: localCookies.email, password: localCookies.password});
    setLoginForm(loginForm);
  };
  return (
    <div className="container-fluid" id="login-page">
      <div className="row full_height">
          <div className="col-md-12 col-sm-12">
            <div className="d-flex justify-content-center">
                <div className="row">
                  <div className="col-md-11 offset-md-1 col-sm-12">
                      <div id="login-card">
                        <h1 className=" text-center mb-3">Login</h1>
                        <div className="card card-default">
                            <div className="card-body p-5">
                              <CommonForm
                                  setForm={setForm}
                                  fieldConfig={FieldConfig}
                                  handleSubmit={handleSubmit}
                                  ></CommonForm>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};
export default LoginForm;
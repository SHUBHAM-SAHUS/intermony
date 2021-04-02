import React from "react";
import ReactDOM from "react-dom";
//import axios from "axios";
// import custom styles of app
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.scss";
// all routing configuration in main
import Main from "./router";

// default base url of api
//import axios, { BASE_URL } from "./config.js";
import * as serviceWorker from "./serviceWorker";
//import successHandler from "./utils/interceptors/successHandler";
//import errorHandler from "./utils/interceptors/errorHandler";
//import * as commonService from "./utils/CommonService.js";


ReactDOM.render(<Main />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

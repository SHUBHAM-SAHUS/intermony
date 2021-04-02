import React from "react";

import App from "../App.js";

export const PublicRouterLayout = ({ children }) => (
  <div>{children}</div>
);

export const PrivateRouterLayout = ({ children }) => <App>{children}</App>;

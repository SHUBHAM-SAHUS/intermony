import React from "react";
import store from 'redux/store/store';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
// private public routes for prevent internal page from unauthenticated user
import { PrivateRoute, PublicRoute } from "./routes";

import * as RouteConfig from "./routeConfig.js"; //configure all path in this file
import ErrorBoundary from "./ErrorBoundary";
import Loader from "components/shared/ui-components/loader/Loader.js";
import ConfirmDialog from "components/shared/ui-components/common-dialog";
// add font family for material component
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#EA3F3F"
    },
    secondary: {
      main: "#262933"
    }
  },
  typography: {
    fontSize: 12,
    fontFamily: ["Poppins", "sans-serif"].join(",")
  }
});

export default function Main() {
  const { privateRoutes, publicRoutes } = RouteConfig;
  // scroll top on routes change
  const history = createHistory();
  history.listen(_ => {
    window.scrollTo(0, 0);
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfirmDialog />
        <Loader />
        <Router history={history}>
          <ErrorBoundary>
            {/* A <Switch> looks through its children <Route>s and
             renders the first one that matches the current URL. */}
            <Switch>
              {privateRoutes.map(privateRouteProps => (
                <PrivateRoute {...privateRouteProps} />
              ))}
              {publicRoutes.map(publicRouteProps => (
                <PublicRoute {...publicRouteProps} />
              ))}
              <Route render={() => <Redirect to={{ pathname: "/" }} />} />
            </Switch>
          </ErrorBoundary>
        </Router>
      </ThemeProvider>
      </Provider>
  );
}

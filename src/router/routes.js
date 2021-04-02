import React from "react";
import {useSelector} from "react-redux";
import { Route, Redirect } from "react-router-dom";
// import page layout and container for private and public page;
import { PublicRouterLayout, PrivateRouterLayout } from "./routerLayout";

export const PrivateRoute = props => {
  const { token } = useSelector(state => state.authReducer);
  const { component: Component, ...restProps } = props;

  if (!Component) return null;
  return (
      <Route
          {...restProps}
          render={routeRenderProps =>
        token ? (
          <PrivateRouterLayout>
            <Component {...routeRenderProps} />
          </PrivateRouterLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeRenderProps.location }
            }}
          />
        )
      }
          />
  );
};

export const PublicRoute = props => {
  const { token } = useSelector(state => state.authReducer);

  const { component: Component, ...restProps } = props;

  if (!Component) return null;
  return (
      <Route
          {...restProps}
          render={routeRenderProps =>
        !token ? (
          <PublicRouterLayout>
            <Component {...routeRenderProps} />
          </PublicRouterLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: routeRenderProps.location }
            }}
          />
        )
      }
          />
  );
};

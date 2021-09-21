import React, { useCallback } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import { ROUTES } from "./routes.constants";
import PrivateRoute from "./private-route";
import ErrorBoundaryRoute from "../shared/Components/ErrorBoundary/error-boundary-route";

interface Props {
}

const Routes: React.FunctionComponent<Props> = ({
}: Props) => {
  const { pathname } = useLocation();


  return (
    <>
      <Switch>

        <Route path={ROUTES.map((route) => route.routeProps.path)}>
            <Switch>
              {ROUTES.map((route) =>
                route.restrictedRoute ? (
                  <PrivateRoute {...route.routeProps} />
                ) : (
                  <ErrorBoundaryRoute {...route.routeProps} />
                )
              )}
            </Switch>
        </Route>
        <Redirect to={"/page-not-found"} />
      </Switch>
    </>
  );
};

export default Routes;

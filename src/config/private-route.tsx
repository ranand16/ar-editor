import React from "react";
import { get } from "lodash";
import { connect } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { RootReducer } from "../reducer";

import ErrorBoundary from "../shared/Components/ErrorBoundary/error-boundary";
// import NotAuthorized from "../shared/Components/NotAuthorized";

interface OwnProps extends RouteProps {
  hasAnyAuthorities?: number[];
  component: any;
}

// export interface PrivateRouteProps extends OwnProps, StateProps { }
export type PrivateRouteProps = OwnProps;

export const PrivateRouteComponent = ({
  component: Component,
  // isAuthenticated,
  // isAuthorized,
  hasAnyAuthorities = [],
  ...rest
}: PrivateRouteProps) => {
  const checkAuthorities = (props: JSX.IntrinsicAttributes) =>
    // isAuthorized
    false ? (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    ) : (
      <></>
      // <NotAuthorized />
    );

  const renderRedirect = (props: any) => {
    return false ? (
      checkAuthorities(props)
    ) : (
      <Redirect
        to={{
          pathname: "/signin",
          search: props.location.search,
          state: { from: props.location },
        }}
      />
    );
    // isAuthenticated
    // false ? (
    //   checkAuthorities(props)
    // ) : (
    //   <Redirect
    //     to={{
    //       pathname: "/signin",
    //       search: props.location.search,
    //       state: { from: props.location },
    //     }}
    //   />
    // );
  };

  if (!Component) {
    throw new Error(
      `A component needs to be specified for private route for path ${
        (rest as any).path
      }`
    );
  }

  return <Route {...rest} render={renderRedirect} />;
};

export const hasAnyAuthority = (
  authorities: number | undefined,
  hasAnyAuthorities: number[] = []
) => {
  if (authorities) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some((auth) => auth === authorities);
  }
  return false;
};

// interface StateProps {
// isAuthenticated: boolean;
// isAuthorized: boolean;
// }

const mapStateToProps = (
  state: RootReducer,
  {}: OwnProps
): // { hasAnyAuthorities = [] }: OwnProps
any => {
  // return {};
  // const { authentication } = state || {};
  // const { userInfo, isLoggedIn } = authentication || {};
  // return {
  //   isAuthenticated: isLoggedIn,
  //   isAuthorized: hasAnyAuthority(get(userInfo, "type"), hasAnyAuthorities),
  // };
};

const PrivateRoute = connect(mapStateToProps, null, null, { pure: false })(
  PrivateRouteComponent
);

export default PrivateRoute;

import React from "react";
import { Route } from "react-router-dom";
import ErrorBoundary from "./error-boundary";

export const ErrorBoundaryRoute = ({ component, ...rest }: any) => {
  const Component = component;
  const encloseInErrorBoundary = (props: any) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );

  if (!Component) {
    throw new Error(
      `A component needs to be specified for path ${(rest as any).path}`
    );
  }

  return <Route {...rest}>{encloseInErrorBoundary}</Route>;
};

export default ErrorBoundaryRoute;

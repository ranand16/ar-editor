import React from "react";

interface ErrorBoundaryProps {
  readonly children: React.ReactNode;
}

interface ErrorBoundaryState {
  readonly error: any;
  readonly errorInfo: any;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  readonly state: ErrorBoundaryState = {
    error: undefined,
    errorInfo: undefined,
  };

  componentDidCatch(error: any, errorInfo: any): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  render(): React.ReactNode {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      const errorDetails =
        process.env.NODE_ENV === "development" ? (
          <details className="preserve-space">
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        ) : undefined;
      return (
        <div>
          <h2 className="error">An unexpected error has occurred.</h2>
          {errorDetails}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

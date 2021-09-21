import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import ErrorBoundary from "./shared/Components/ErrorBoundary/error-boundary";
import { useMedia } from "./hooks/useMedia";
import { RootReducer } from "./reducer";
import AppRoutes from "./config/routes";

const mapStateToProps = (state: RootReducer) => ({
});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

interface Props extends StateProps, DispatchProps { }

const App: React.FunctionComponent<Props> = ({
}: Props) => {
  const isSupportedMedia = useMedia("(min-width: 768px)");

  return (
    <Router>
      <ErrorBoundary>
        {isSupportedMedia ? (
          <AppRoutes />
        ) : (
          <></>
        )}
      </ErrorBoundary>
    </Router>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

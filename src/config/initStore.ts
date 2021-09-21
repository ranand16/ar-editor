import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer, { RootReducer } from "../reducer";
import sagas from "../saga";
import DevTools from "./devtools";

const sagaMiddleware = createSagaMiddleware();

const defaultMiddlewares = [sagaMiddleware];

const composedMiddlewares = (middlewares: any[]) =>
  process.env.NODE_ENV === "development"
    ? compose(
        applyMiddleware(...defaultMiddlewares, ...middlewares),
        DevTools.instrument()
      )
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: RootReducer, middlewares = []) => {
  const store = createStore(
    reducer,
    initialState,
    composedMiddlewares(middlewares)
  );
  sagaMiddleware.run(sagas);
  return store;
};

export default initialize;

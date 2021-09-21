import Lodable from "react-loadable";
import Loader from "../shared/Components/Loader";
// import { AUTHORITIES } from "./constants";

const LoadableConfig = {
  delay: 300,
  timeout: 10000,
};

export const ROUTES = [
  {
    key: "maintenance",
    restrictedRoute: false,
    routeProps: {
      path: "/maintenance",
      component: Lodable({
        loader: () =>
          import(
            /* webpackChunkName: "parent" */ "../shared/Components/MaintenancePage"
          ),
        loading: Loader,
        ...LoadableConfig,
      }),
    },
  },
  {
    key: "AREditorHomeModule",
    restrictedRoute: false,
    routeProps: {
      path: "/",
      component: Lodable({
        loader: () =>
          import(
            /* webpackChunkName: "browseprogram" */ "../modules/AREditorModule"
          ),
        loading: Loader,
        ...LoadableConfig,
      }),
      hasAnyAuthorities: [],
    },
  },
  {
    key: "AREditorModule",
    restrictedRoute: false,
    routeProps: {
      path: "/ar-editor",
      component: Lodable({
        loader: () =>
          import(
            /* webpackChunkName: "browseprogram" */ "../modules/AREditorModule"
          ),
        loading: Loader,
        ...LoadableConfig,
      }),
      hasAnyAuthorities: [],
    },
  },
];

import _ from "lodash";
import { RootReducer } from "src/reducer";

export const createLoadingSelector = (actions) => (state: RootReducer) => {
  // returns true only when all actions is not loading
  return _(actions).some((action) => _.get(state, `loading.${action}`));
};

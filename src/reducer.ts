import { combineReducers } from "redux";
import { errorReducer } from "./modules/Error/reducer";
import { loadingReducer } from "./modules/Loading/reducer";
import ArEditor, { ArEditorState } from "./modules/AREditorModule/reducer";

export interface RootReducer {
  readonly ArEditor: ArEditorState;
  readonly error: any;
  readonly loading: any;
}

const appReducer = combineReducers<RootReducer>({
  error: errorReducer,
  loading: loadingReducer,
  ArEditor: ArEditor,
});

const rootReducer = (state, action) => {
  // if (action?.type === USER_LOGOUT) {
  //   removeKeyFromStorage(LOCAL_STORAGE_KEYS.LAST_VIEW_PROGRAM_KEY);
  //   removeKeyFromStorage(LOCAL_STORAGE_KEYS.USER_INFO);
  //   removeKeyFromStorage(LOCAL_STORAGE_KEYS.TOKEN_KEY);
  //   state = undefined;
  // }

  return appReducer(state, action);
};

export default rootReducer;

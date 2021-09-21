import { all } from "redux-saga/effects";
import AREditorSagaManager from "./modules/AREditorModule/saga";

export default function* rootSaga() {
  yield all([
    AREditorSagaManager(),
  ]);
}

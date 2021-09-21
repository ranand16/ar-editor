import { createAction } from "redux-actions";
import { REQUEST, SUCCESS, FAILURE } from "../../shared/utils/actions";
import { SET_AREDITOR_GRID } from "./constant";
// import { GET_PROGRAMS, RESET, SET_FILTER } from "./constant";

// export const getProgramsRequest = createAction(REQUEST(GET_PROGRAMS));
// export const getProgramsSuccess = createAction(SUCCESS(GET_PROGRAMS));
// export const getProgramsFailure = createAction(FAILURE(GET_PROGRAMS));
// export const setBrowseProgramsFilter = createAction(SET_FILTER);
// export const resetPrograms = createAction(RESET);

export const toggleAREditorGrid = createAction(SUCCESS(SET_AREDITOR_GRID));
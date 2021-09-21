import { SUCCESS } from "src/shared/utils/actions";
import {
  RESET,
  SET_AREDITOR_GRID,
  // PROGRAM_TYPE,
  // FILTER_OPTIONS,
} from "./constant";
import { Actions } from "../../interfaces/actions";
// import { FilterData } from "src/interfaces";

export interface ArEditorState {
  helperGridStatus: boolean
  // programs?: {
  //   [filter: string]: {
  //     [PROGRAM_TYPE.ACTIVE]: any;
  //     [PROGRAM_TYPE.AVAILABLE]: any;
  //     [PROGRAM_TYPE.UPCOMING]: any;
  //     [PROGRAM_TYPE.COMPLETED]: any;
  //   };
  // };
  /**This will hold the value of selected filter in programs page */
  /**It will be used in program detail page */
  // filter: FilterData;
  // programType: PROGRAM_TYPE;
}

const initialState: ArEditorState = {
  helperGridStatus: true,
  // programs: undefined,
  // filter: {
  //   filterBy: undefined,
  //   filterData: undefined,
  // },
  // programType: PROGRAM_TYPE.AVAILABLE,
};

export default (
  state: ArEditorState = initialState,
  { type, payload }: Actions
): ArEditorState => {
  switch (type) {
    // case SUCCESS(GET_PROGRAMS):
    //   const { filterData, filterBy, data } = payload;
    //   const { key, value } = getKeyAndvalue(filterData, filterBy, data);
    //   return {
    //     ...state,
    //     programs: {
    //       ...state?.programs,
    //       [key]: { ...value },
    //     },
    //   };

    case SUCCESS(SET_AREDITOR_GRID):
      return {
        ...state,
        helperGridStatus: !state.helperGridStatus
      }

    case RESET: {
      return initialState;
    }
    default:
      return state;
  }
};

import { call, put, takeLatest, all } from "redux-saga/effects";

import { REQUEST } from "src/shared/utils/actions";
import { Actions } from "../../interfaces";
// import { GET_PROGRAMS, PROGRAM_TYPE } from "./constant";
// import { getProgramsFailure, getProgramsSuccess } from "./actions";

// import { getPrograms } from "./api";

// function* getProgramsRequest({ type, payload }: Actions) {
//   try {
//     /*eslint-disable */
//     const [available, upcoming, active, completed] = yield all([
//       payload.programType.includes(PROGRAM_TYPE.AVAILABLE)
//         ? call(getPrograms, {
//           ...payload,
//           data: { ...payload.data, program_type: PROGRAM_TYPE.AVAILABLE },
//         })
//         : null,
//       payload.programType.includes(PROGRAM_TYPE.UPCOMING)
//         ? call(getPrograms, {
//           ...payload,
//           data: { ...payload.data, program_type: PROGRAM_TYPE.UPCOMING },
//         })
//         : null,
//       payload.programType.includes(PROGRAM_TYPE.ACTIVE)
//         ? call(getPrograms, {
//           ...payload,
//           data: { ...payload.data, program_type: PROGRAM_TYPE.ACTIVE },
//         })
//         : null,
//       payload.programType.includes(PROGRAM_TYPE.COMPLETED)
//         ? call(getPrograms, {
//           ...payload,
//           data: { ...payload.data, program_type: PROGRAM_TYPE.COMPLETED },
//         })
//         : null,
//     ]);
//     /* eslint-enable */
//     yield put(
//       getProgramsSuccess({
//         ...payload,
//         data: {
//           [PROGRAM_TYPE.AVAILABLE]: available ? available.data.data : null,
//           [PROGRAM_TYPE.UPCOMING]: upcoming ? upcoming.data.data : null,
//           [PROGRAM_TYPE.ACTIVE]: active ? active.data.data : null,
//           [PROGRAM_TYPE.COMPLETED]: completed ? completed.data.data : null,
//         },
//       })
//     );
//   } catch (e) {
//     yield put(getProgramsFailure(e));
//   }
// }

function* AREditorSagaManager() {
  // yield all([takeLatest(REQUEST(GET_PROGRAMS), getProgramsRequest)]);
}

export default AREditorSagaManager;

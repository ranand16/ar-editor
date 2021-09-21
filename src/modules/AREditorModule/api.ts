import axios from "../../shared/utils/axios";
import { ApiResponse } from "../../interfaces";
// import { GetProgramsFilter } from "../../interfaces";
import { constructParams } from "src/shared/utils/queryParams";

const URL_HELPER = {
  GET_PROGRAMS: (param) =>
    `/v1/programs?${constructParams(param)}&include_skill=1`,
};

// export const getPrograms = (param: GetProgramsFilter): Promise<any> =>
//   axios
//     .get(`${URL_HELPER.GET_PROGRAMS(param?.data)}`)
//     .then((res: any): ApiResponse => res)
//     .catch((err) => {
//       throw err;
//     });

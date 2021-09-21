export const constructParams = (params) => {
  return Object.keys(params)
    .map((key) => {
      if (params[key]) {
        return `${key}=${params[key]}`;
      }
      return undefined;
    })
    .filter((queryParam) => queryParam !== undefined)
    .join("&");
};

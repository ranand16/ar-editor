export const getUrlParameter = ({
  param,
  existCheckOnly = false,
}: {
  param: string;
  existCheckOnly?: boolean;
}): string | boolean => {
  const url = decodeURIComponent(window.location.search.substring(1));
  if (!url) {
    return false;
  }
  const params = url.split("&");
  let queryParam;
  for (let i = 0; i < params.length; i++) {
    queryParam = params[i].split("=");
    if (queryParam[0] === param) {
      return queryParam[1] === undefined ? existCheckOnly : queryParam[1];
    }
  }
  return false;
};

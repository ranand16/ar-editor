export const errorReducer = (state = {}, action) => {
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE|RESET)/.exec(type);

  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store errorMessage
    [requestName]: requestState === "FAILURE" ? payload.message : "",
  };
};

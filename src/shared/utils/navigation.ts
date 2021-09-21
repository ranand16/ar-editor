export const navigateToClassPage = (
  programName: string,
  learnerId: number | undefined,
  name: string | undefined,
  batchId: number,
  history,
  setContext
) => {
  const className = programName.split(" ").join("-");
  setContext({ learnerId, name, batchId });
  history.push(
    `/class/${className}?name=${name}&lid=${learnerId}&bid=${batchId}`
  );
};

export const navigateToSummaryPage = (
  learnerId: number | undefined,
  batchId: number | undefined,
  sessionNumber: number | string,
  history
) => {
  history.push(`/session-summary/${learnerId}/${batchId}/${sessionNumber}`);
};

export const timeToSeconds = (hms: string) => {
  const _splitedTime = hms.split(":");
  const seconds = +_splitedTime[0] * 60 * 60 + +_splitedTime[1] * 60 + +_splitedTime[2];

  return seconds;
};

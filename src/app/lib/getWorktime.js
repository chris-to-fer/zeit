import StringToDate from "./stringToDate";

export default function getWorktime(end, start, breaks) {
  const workTime =
    StringToDate(end) > StringToDate(start)
      ? new Date(1970, 0, 1, 0, 0, 0, StringToDate(end) - StringToDate(start)) -
        StringToDate(breaks)
      : new Date(
          1970,
          0,
          1,
          0,
          0,
          0,

          24 * 60 * 60 * 1000 - (StringToDate(start) - StringToDate(end))
        ) - StringToDate(breaks);
  return workTime;
}

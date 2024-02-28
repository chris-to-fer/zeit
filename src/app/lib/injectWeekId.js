import getWeekOfYear from "./getWeekOfYear";
export default function injectWeekId(times) {
  return times.map((e) => {
    const yearOnly = new Date(
      new Date(e.date).getFullYear(),
      0,
      1
    ).getFullYear();
    const weekId = `${getWeekOfYear(new Date(e.date))}-${yearOnly}`;

    return (e = { ...e, weekId: weekId });
  });
}

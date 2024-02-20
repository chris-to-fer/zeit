export default function makeWeeks(dates) {
  //logic from theBAyOr seen on https://stackoverflow.com/questions/48083728/group-dates-by-week-javascript
  //______________________________________start make weeks from days
  class PersianDate extends Date {
    constructor(...args) {
      super(...args);
    }

    toLocaleDateString = () => super.toLocaleDateString("fa-IR-u-nu-latn");
    getParts = () => this.toLocaleDateString().split("/");
    getDay = () => (super.getDay() === 6 ? 0 : super.getDay() + 1);
    getDate = () => this.getParts()[2];
    getMonth = () => this.getParts()[1] - 1;
    getYear = () => this.getParts()[0];
    getMonthName = () => this.toLocaleDateString("fa-IR", { month: "long" });
    getDayName = () => this.toLocaleDateString("fa-IR", { weekday: "long" });
  }

  // const dates = [
  //   "1396-10-11 09:07:21",
  //   "1396-10-10 10:03:51",
  //   "1396-10-07 02:07:02",
  //   "1396-11-27 08:02:45",
  //   "1396-11-19 01:02:32",
  //   "1396-12-01 22:13:21",
  //   "1396-02-12 09:07:21",
  //   "1396-05-18 04:02:29",
  //   "1396-05-21 14:01:42",
  //   "1396-07-11 01:16:29"
  // ];

  const groups = dates.reduce((acc, curr) => {
    const date = new PersianDate(curr);
    const startOfYearDate = new PersianDate(date.getFullYear(), 0, 1);
    const weekOfYear = Math.ceil(
      Math.floor(
        (date.getTime() - startOfYearDate.getTime()) / (24 * 60 * 60 * 1000)
      ) / 7
    );

    // create a composed key: 'year-week'
    const yearWeek = `${date.getFullYear()}-${weekOfYear}`;

    // add this key as a property to the result object
    if (!acc[yearWeek]) {
      acc[yearWeek] = [];
    }

    // push the current date that belongs to the year-week calculated befor
    acc[yearWeek].push(curr);

    return acc;
  }, {});
  return groups;

  //______________________________________end make weeks from days
}

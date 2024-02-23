import React from "react";
import { revalidatePath } from "next/cache";
import Sidebar from "../../../components/Sidebar";
import styles from "../../../page.module.css";
import Link from "next/link";
import makeWeeks from "@/app/lib/makeWeeks";
import fillWeeks from "@/app/lib/fillWeeks";
import { headers } from "next/headers";
import { objectShallowCompare } from "@mui/x-data-grid/hooks/utils/useGridSelector";

export default async function Page({ params, children }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId } = params;
  revalidatePath(
    `${HOSTNAME}/api/${userId}/projects/${proId}/employees/${empId}`
  );

  const res = await fetch(
    `${HOSTNAME}/api/${userId}/projects/${proId}/employees/${empId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "no-store",
    }
  );

  const data = await res.json();
  if (!data) return null;

  const {
    employee: { times },
  } = data;

  console.log("times", times);

  const injectedTimes = times.map((e) => {
    const startYear = new Date(new Date(e.date).getFullYear(), 0, 1);
    const days = Math.floor(
      (new Date(e.date) - startYear) / (24 * 60 * 60 * 1000)
    );
    const weekId = Math.ceil(days / 7);

    return (e = { ...e, weekId: weekId });
  });

  let weekObject = {};
  injectedTimes.forEach((e) => {
    const { weekId, date } = e;
    if (!weekObject[weekId]) {
      weekObject[weekId] = [date];
    } else {
      weekObject[weekId].push(date);
    }
  });
  console.log("iTi", injectedTimes);
  console.log("WO", weekObject);
  // console.log("after inject", injectedTimes);
  // const helperArray = injectedTimes.map((e) => e.week);
  // const uniques = new Set(helperArray);
  // const array = Array.from(uniques);
  // const weekFolder = new Set(times.week);
  // console.log("week folder", array);

  //////////////works
  // const dates = times.map((e) => e.date.slice(0, 19).replace(/T/g, " "));
  // const weeks = makeWeeks(dates);
  // console.log("weeks", weeks);
  // const weeksFilled = [];
  // fillWeeks(weeksFilled, weeks, proId, userId, empId, HOSTNAME);
  // weeksFilled.sort(
  //   (a, b) =>
  //     b.key.slice(5, weeksFilled[weeksFilled.indexOf(b)].length) -
  //     a.key.slice(5, weeksFilled[weeksFilled.indexOf(a)].length)
  // );
  // console.log("WF ", weeksFilled);

  ///////////////////works
  // function germanDateSwap(weeksFilled) {
  //   console.log(
  //     "test ",
  //     weeksFilled.map((e) =>
  //       e.date
  //         .split()
  //         .splice(1, 0, e.date[e.date.length - 1])
  //         .splice(e.date.length - 1, 1, e.date[0])
  //         .join()
  //     )
  //   );
  // }
  // germanDateSwap(weeksFilled);
  const dateDisplayFormat = (mongo) => {
    let day = mongo.slice(8, 10);
    let month = mongo.slice(5, 7);
    let year = mongo.slice(2, 4);
    return day + "." + month + "." + year;
  };

  return (
    <>
      <Sidebar params={params} employee={data.employee} />
      <div className={styles.card_project}>
        <h3>
          Arbeitszeiten von {data.employee.name} {data.employee.lastName} im
          Projekt {data.employee.project.name} nach Kalenderwochen:
        </h3>
        <ul>
          {/* {injectedTimes.map((e) => (
            <li key={e._id}>Woche {e.week}</li>
          ))} */}
          {Object.keys(weekObject).map((e, index) => (
            <li key={index}>
              <Link
                href={`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}/week/${e}`}
              >
                <h4> Woche {e}: </h4>
                {injectedTimes.map((obj) =>
                  obj.weekId == e ? (
                    <p key={obj.date}>{dateDisplayFormat(obj.date)}</p>
                  ) : (
                    ""
                  )
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </>
  );
}

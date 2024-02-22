import React from "react";
import { revalidatePath } from "next/cache";
import Sidebar from "../../../components/Sidebar";
import styles from "../../../page.module.css";
import makeWeeks from "@/app/lib/makeWeeks";
import fillWeeks from "@/app/lib/fillWeeks";

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
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  if (!data) return null;

  const {
    employee: { times },
  } = data;

  // console.log("times", times);

  const dates = times.map((e) => e.date.slice(0, 19).replace(/T/g, " "));
  const weeks = makeWeeks(dates);
  console.log("weeks", weeks);
  const weeksFilled = [];
  fillWeeks(weeksFilled, weeks, proId, userId, empId, HOSTNAME);
  weeksFilled.sort(
    (a, b) =>
      b.key.slice(5, weeksFilled[weeksFilled.indexOf(b)].length) -
      a.key.slice(5, weeksFilled[weeksFilled.indexOf(a)].length)
  );
  console.log("WF ", weeksFilled);
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

  return (
    <>
      <Sidebar params={params} employee={data.employee} />
      <div className={styles.card_project}>
        <h3>
          {data.employee.name} {data.employee.lastName}, Arbeitszeiten nach
          Kalenderwochen:
        </h3>
        <ul>{weeksFilled}</ul>
      </div>
      {children}
    </>
  );
}

import React from "react";
import { revalidatePath } from "next/cache";
import Sidebar from "../../../components/Sidebar";
import styles from "../../../page.module.css";
import Link from "next/link";

export default async function Page({ params, children }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId } = params;

  revalidatePath(`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`);

  const res = await fetch(
    `${HOSTNAME}/api/${userId}/projects/${proId}/employees/${empId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (!data) return null;

  const {
    employee: { times },
  } = data;

  const injectedTimes = times.map((e) => {
    // const startYear = new Date(new Date(e.date).getFullYear(), 0, 1);
    // const yearOnly = startYear.getFullYear();
    // console.log("startyear", startYear);
    // const days = Math.floor(
    //   (new Date(e.date) - startYear) / (24 * 60 * 60 * 1000)
    // );
    // let weekId = "";

    // if ((0 == yearOnly % 4 && 0 != yearOnly % 100) || 0 == yearOnly % 400) {
    //   weekId = `${Math.floor(days / 7) + 1} - ${yearOnly}`;
    // } else {
    //   weekId = `${Math.ceil(days / 7)} - ${yearOnly}`;
    //   console.log("WID", weekId);
    // }
    const yearOnly = new Date(
      new Date(e.date).getFullYear(),
      0,
      1
    ).getFullYear();
    const weekId = `${getWeekOfYear(new Date(e.date))}-${yearOnly}`;

    return (e = { ...e, weekId: weekId });
  });

  function getWeekOfYear(date) {
    const target = new Date(date);
    const dayNr = (date.getDay() + 6) % 7; // ISO day of week with Monday as 0
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 is 7 days in milliseconds
  }

  injectedTimes.sort((a, b) => new Date(a.date) - new Date(b.date));

  let weekObject = {};
  injectedTimes.forEach((e) => {
    const { weekId, date } = e;
    if (!weekObject[weekId]) {
      weekObject[weekId] = [date];
    } else {
      weekObject[weekId].push(date);
    }
  });

  const dateDisplayFormat = (mongo) => {
    let day = mongo.slice(8, 10);
    let month = mongo.slice(5, 7);
    let year = mongo.slice(2, 4);
    return day + "." + month + "." + year;
  };

  // const encodedArray = encodeURIComponent(JSON.stringify(injectedTimes));
  return (
    <>
      <Sidebar params={params} employee={data.employee} />
      <div className={styles.card_project}>
        <h3>
          Arbeitszeiten von {data.employee.name} {data.employee.lastName} im
          Projekt {data.employee.project.name} nach Kalenderwochen:
        </h3>{" "}
        <ul className={styles.ul}>
          {Object.keys(weekObject).map((e, index) => (
            <li key={index}>
              <Link
                href={{
                  pathname: `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}/week/${e}`,
                  // query: { objects: encodedArray },
                }}
              >
                <h4>
                  {" "}
                  <button className={styles.button_week}>
                    {" "}
                    Kalenderwoche {e}
                  </button>
                </h4>
              </Link>

              <span className={styles.weeks}>
                {injectedTimes.map((obj) =>
                  obj.weekId == e ? (
                    <Link
                      href={{
                        pathname: `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}/${obj._id}/edit`,
                        query: obj,
                      }}
                      key={obj.date}
                    >
                      {" "}
                      <p>{dateDisplayFormat(obj.date)}</p>
                    </Link>
                  ) : (
                    ""
                  )
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </>
  );
}

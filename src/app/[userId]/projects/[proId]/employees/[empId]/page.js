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

  const dateDisplayFormat = (mongo) => {
    let day = mongo.slice(8, 10);
    let month = mongo.slice(5, 7);
    let year = mongo.slice(2, 4);
    return day + "." + month + "." + year;
  };

  const encodedArray = encodeURIComponent(JSON.stringify(injectedTimes));
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
                  query: { objects: encodedArray },
                }}
              >
                <h4> Kalenderwoche {e}: </h4>
              </Link>

              <section className={styles.weeks}>
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
              </section>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </>
  );
}

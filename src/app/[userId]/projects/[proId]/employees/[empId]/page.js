import React from "react";
import { revalidatePath } from "next/cache";
import Sidebar from "../../../components/Sidebar";
import styles from "../../../page.module.css";
import Link from "next/link";
import getWeekOfYear from "@/app/lib/getWeekOfYear";
import { redirect } from "next/navigation";
import connectDB from "@/app/db/connectDB";
import Employee from "@/app/db/model/Employee";
import Project from "@/app/db/model/Project";
import Time from "@/app/db/model/Time";

export default async function Page({ params, children }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId } = params;
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  revalidatePath(`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`);

  // const res = await fetch(
  //   `${HOSTNAME}/api/${userId}/projects/${proId}/employees/${empId}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // const data = await res.json();
  // if (!data) return null;
  let data = null;
  try {
    await connectDB();
    const res = await Employee.findById(empId)
      .populate("project")
      .populate("times");

    if (!res) {
      throw new Error("Employee not found");
    }
    data = JSON.parse(JSON.stringify(res));
  } catch (error) {
    throw new Error(error);
  } finally {
  }

  const newData = { employee: { ...data } };
  data = newData;
  const {
    employee: { times },
  } = data;
  if (!times) {
    redirect(`${HOSTNAME}/api/${userId}/projects/${proId}`);
  }
  const injectedTimes = times?.map((e) => {
    const yearOnly = new Date(
      new Date(e.date).getFullYear(),
      0,
      1
    ).getFullYear();
    const weekId = `${getWeekOfYear(new Date(e.date))}-${yearOnly}`;

    return (e = { ...e, weekId: weekId });
  });

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

  // const dateDisplayFormat = (mongo) => {
  //   let day = mongo.slice(8, 10);
  //   let month = mongo.slice(5, 7);
  //   let year = mongo.slice(2, 4);
  //   return day + "." + month + "." + year;
  // };

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
                href={`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}/week/${e}`}
              >
                <h4>
                  {" "}
                  <button className={styles.button_week}>
                    {" "}
                    Kalenderwoche {e}
                  </button>
                </h4>
              </Link>

              <article className={styles.weeks}>
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
                      <article>
                        {" "}
                        {new Date(obj.date).toLocaleDateString(
                          "de-DE",
                          options
                        )}
                      </article>
                    </Link>
                  ) : (
                    ""
                  )
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </>
  );
}

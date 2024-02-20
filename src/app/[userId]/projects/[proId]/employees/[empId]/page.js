import React from "react";
import { revalidatePath } from "next/cache";
import Sidebar from "../../../components/Sidebar";
import styles from "../../../page.module.css";
import makeWeeks from "@/app/lib/MakeWeeks";
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

  console.log("times", times);

  const dates = times.map((e) => e.date.slice(0, 19).replace(/T/g, " "));
  const weeks = makeWeeks(dates);
  console.log("weeks", weeks);
  const weeksFilled = [];
  fillWeeks(weeksFilled, weeks, proId, userId, empId, HOSTNAME);

  return (
    <>
      <Sidebar proId={proId} />
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

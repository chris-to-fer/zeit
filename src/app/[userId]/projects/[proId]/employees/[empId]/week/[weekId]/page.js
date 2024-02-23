import React from "react";
import { revalidatePath } from "next/cache";
import Sidebar from "@/app/[userId]/projects/components/Sidebar";
import styles from "../../../../../page.module.css";
import WeekTable from "./components/WeekTable";
import Link from "next/link";

export default async function PageWeek({ params, children }) {
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
    }
  );
  const data = await res.json();
  if (!data) return null;
  console.log("data:", data);
  const timesheets = data.employee.times;

  return (
    <>
      {/* <Sidebar params={params} employee={data} /> */}
      <div className={styles.card_project}>
        <h3>
          Wochenzeiten von {data.employee.name} {data.employee.lastname} im
          Projekt {data.employee.project.name}
        </h3>
        <WeekTable timesheets={timesheets} />
        <Link
          href={`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`}
        >
          zurück
        </Link>
      </div>
      {children}
    </>
  );
}

import React from "react";
import { revalidatePath } from "next/cache";
import Sidebar from "@/app/[userId]/projects/components/Sidebar";
import styles from "../../../../../page.module.css";
import WeekTable from "./components/weekTable";
import Link from "next/link";

export default async function PageWeek({ params, children, searchParams }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId } = params;
  console.log("SP", searchParams);

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

  // const timesheets = data.employee.times;
  const timesheets = JSON.parse(decodeURIComponent(searchParams.objects));
  // console.log("receive timesheets", timesheets);
  return (
    <>
      {/* <Sidebar params={params} employee={data} /> */}

      <div className={styles.card_project}>
        <Link
          href={`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`}
        >
          zurück
        </Link>
        <br></br>
        <h3>
          Wochenzeiten von {data.employee.name} {data.employee.lastname} im
          Projekt {data.employee.project.name}
        </h3>

        <WeekTable timesheets={timesheets} />
      </div>
      {children}
    </>
  );
}

import React from "react";
import { revalidatePath } from "next/cache";
import Sidebar from "@/app/[userId]/projects/components/Sidebar";
import styles from "../../../../../page.module.css";
import WeekTable from "./components/weekTable";
import Link from "next/link";
// import handleApprove from "@/app/lib/handleApprove";

export default async function PageWeek({ params, children, searchParams }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId, weekId } = params;

  revalidatePath(
    `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}/week/${weekId}`
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
  console.log("data", data.employee.times);

  const injectedTimes = data.employee.times.map((e) => {
    const startYear = new Date(new Date(e.date).getFullYear(), 0, 1);
    const days = Math.floor(
      (new Date(e.date) - startYear) / (24 * 60 * 60 * 1000)
    );
    const weekId = Math.ceil(days / 7);
    return (e = { ...e, weekId: weekId });
  });

  const timesheets = injectedTimes;

  // const timesheets = JSON.parse(decodeURIComponent(searchParams.objects));

  // async function handleApprove(approvedTimes) {
  //   "use server";

  //   if (!approvedTimes[0]) {
  //     return;
  //   }
  //   revalidatePath(
  //     `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`
  //   );
  //   // revalidatePath(
  //   //   `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}/week/${weekId}`
  //   // );
  //   router.refresh();

  //   const data = { approvedTimes, method: "APPROVETIMESHEETS" };
  //   const response = await fetch(
  //     `${HOSTNAME}/api/${userId}/projects/${proId}/employees/${empId}/week`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   );

  //   if (response.ok) {
  //     // alert("Das Projekt wurde erstellt.");
  //     console.log("Approval sent", data);
  //     //   revalidatePath(`${HOSTNAME}/${userId}/projects`);
  //     //   redirect(`${HOSTNAME}/${userId}/projects`);
  //   }
  // }

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

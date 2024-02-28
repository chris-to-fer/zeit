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
  console.log("psms", params);

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
  console.log("DAAAAAA", data);
  const injectedTimes = data.employee?.times.map((e) => {
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
  //   const startYear = new Date(new Date(e.date).getFullYear(), 0, 1);
  //   const days = Math.floor(
  //     (new Date(e.date) - startYear) / (24 * 60 * 60 * 1000)
  //   );
  //   const weekId = Math.ceil(days / 7);
  //   return (e = { ...e, weekId: weekId });
  // });

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
      <Sidebar params={params} employee={data} />
      <div className={styles.card_project_table}>
        <Link
          href={`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`}
        >
          zurück
        </Link>
        <br></br>
        <h3>
          Wochenzeiten der Woche {weekId} von {data.employee.name}{" "}
          {data.employee.lastName}
        </h3>
        <p>Projekt:{data.employee.project.name}</p>
        <p>Produktion: {data.employee.project.companyName}</p>
        <span>
          {data.employee?.department} / {data.employee?.position}{" "}
        </span>

        <WeekTable timesheets={timesheets} />
      </div>
      {children}
    </>
  );
}

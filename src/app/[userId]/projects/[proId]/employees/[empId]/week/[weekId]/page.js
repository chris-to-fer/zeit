import React from "react";
import { revalidatePath } from "next/cache";
import Sidebar from "@/app/[userId]/projects/components/Sidebar";
import styles from "../../../../../page.module.css";
import WeekTable from "./components/weekTable";
import Link from "next/link";
import Project from "@/app/db/model/Project";
import Time from "@/app/db/model/Time";
import Employee from "@/app/db/model/Employee";
import connectDB from "@/app/db/connectDB";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// import handleApprove from "@/app/lib/handleApprove";

export default async function PageWeek({ params, children }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId, weekId } = params;

  // revalidatePath(
  //   `${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}/week/${weekId}`
  // );

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
  let data = null;
  try {
    await connectDB();
    const res = await Employee.findById(empId)
      .populate("project")
      .populate("times");
    if (!res) {
      throw new Error("Error fetching Employees Times");
    }
    data = JSON.parse(JSON.stringify(res));
    data = { employee: { ...data } };
  } catch (error) {
    throw new Error(error);
  }

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

  const timesheets = injectedTimes;
  // if (!injectedTimes) return <h3>...loading</h3>;

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
        {data && (
          <section className={styles.card_project_table_section}>
            <Link
              href={`${HOSTNAME}/${userId}/projects/${proId}/employees/${empId}`}
            >
              <ArrowBackIosIcon />
            </Link>
            <br></br>

            <h3>
              Woche {weekId}: {data.employee.name} {data.employee.lastName}
            </h3>

            <p>Projekt:{data.employee.project.name}</p>
            <p>Produktion: {data.employee.project.companyName}</p>
            <span>
              {data.employee?.department} / {data.employee?.position}{" "}
            </span>
          </section>
        )}

        <WeekTable timesheets={timesheets} />
      </div>

      {children}
    </>
  );
}

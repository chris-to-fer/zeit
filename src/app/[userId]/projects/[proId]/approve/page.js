import React from "react";
import Sidebar from "../../components/Sidebar";
import styles from "../../page.module.css";
import { revalidatePath } from "next/cache";
import getWeekOfYear from "@/app/lib/getWeekOfYear";
import injectWeekId from "@/app/lib/injectWeekId";
import WeekOverview from "../employees/[empId]/week/[weekId]/components/WeekOverview";
import Time from "@/app/db/model/Time";
import connectDB from "@/app/db/connectDB";

export default async function page({ params }) {
  const { proId, userId } = params;
  const HOSTNAME = process.env.HOSTNAME_URL;

  revalidatePath(`${HOSTNAME}/${userId}/projects/${proId}/approve`);

  // const res = await fetch(
  //   `${HOSTNAME}/api/${userId}/projects/${proId}/approve`
  // );
  // if (!res) {
  //   console.log("error fetching not approved");
  // }
  // const data = await res.json();
  // if (!data) return null;
  // const trigger = true;
  // if (res.status > 299) {
  //   throw new Error("fetch approve error");
  // }
  let trigger = null;
  let data = null;
  try {
    await connectDB();
    const res = await Time.find({
      approved: false,
      projectId: proId,
    })
      .populate("employeeId")
      .populate("projectId");
    data = JSON.parse(JSON.stringify(res));
    trigger = true;
    if (!data) {
      throw new Error("Error finding approved");
    }
  } catch (error) {
    throw new Error(error);
  }

  data = { notApproved: [...data] };

  const injectedTimes = injectWeekId(data.notApproved);
  const displayNumber = injectedTimes.length;
  // console.log("intti", injectedTimes);
  injectedTimes?.sort((a, b) => new Date(a.date) - new Date(b.date));
  // let weekObject = {};
  // injectedTimes.forEach((e) => {
  //   const { weekId, date } = e;
  //   const eId = e.employeeId._id;
  //   if (!weekObject[weekId]) {
  //     weekObject[weekId] = [[date, eId]];
  //   } else {
  //     weekObject[weekId].push([date, eId]);
  //   }
  // });
  // console.log("WO", weekObject);

  return (
    <>
      <Sidebar
        displayNumber={displayNumber}
        trigger={trigger}
        params={params}
        project={data.project}
      />
      <WeekOverview
        injectedTimes={injectedTimes}
        HOSTNAME={HOSTNAME}
        params={params}
      />

      {/* <div className={styles.card_project}>
        <ul className={styles.ul}>
          {data.notApproved.map((e) => (
            <li key={e._id}>
              {e.date} {e.employeeId.name} {e.employeeId.lastName}
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
}

import React from "react";
import styles from "../../../../../../page.module.css";

import Link from "next/link";

export default function WeekOverview({ HOSTNAME, params, injectedTimes }) {
  const { userId, proId } = params;

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  // let empObject = {};
  // injectedTimes.forEach((e) => {
  //   const { date, weekId } = e;
  //   const { _id, name, lastName } = e.employeeId;
  //   if (!empObject[empId]) {
  //     empObject[_id] = [
  //       {
  //         date: date,
  //         _id: _id,
  //         name: name,
  //         lastName: lastName,
  //         wekkId: weekId,
  //       },
  //     ];
  //   } else {
  //     empObject[empId].push([
  //       { date: date, _id: _id, name: name, lastName: lastName },
  //     ]);
  //   }
  // });
  // console.log("empo", injectedTimes);

  return (
    <div className={styles.card_project}>
      <ul className={styles.ul}>
        {injectedTimes.length < 1 ? "Alles erledigt!" : ""}
        {injectedTimes.map((e) => (
          <li key={e._id}>
            <p>
              {" "}
              <Link
                href={`${HOSTNAME}/${userId}/projects/${proId}/employees/${e.employeeId._id}/week/${e.weekId}`}
              >
                {new Date(e.date).toLocaleDateString("de-DE", options)}
              </Link>
            </p>
            <italics>
              {e.employeeId.name} {e.employeeId.lastName}
            </italics>
            {}
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from "react";
import Sidebar from "../../components/Sidebar";
import styles from "../../page.module.css";
import { revalidatePath } from "next/cache";

export default async function page({ params }) {
  const { proId, userId } = params;
  const HOSTNAME = process.env.HOSTNAME_URL;

  revalidatePath(`${HOSTNAME}/${userId}/projects/${proId}/approve`);
  const res = await fetch(
    `${HOSTNAME}/api/${userId}/projects/${proId}/approve`
  );
  if (!res) {
    console.log("error fetching not approved");
  }
  const data = await res.json();

  if (res.status > 299) {
    throw new Error("fetch approve error");
  }

  console.log("not Approved", data.notApproved);

  return (
    <>
      <Sidebar params={params} project={data.projects} />
      <div className={styles.card_project}>
        <ul className={styles.ul}>
          {data.notApproved.map((e) => (
            <li key={e._id}>
              {e.date} {e.employeeId.name} {e.employeeId.lastName}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

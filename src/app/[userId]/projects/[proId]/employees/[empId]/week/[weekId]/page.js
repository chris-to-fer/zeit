import React from "react";
import { revalidatePath } from "next/cache";
import Sidebar from "@/app/[userId]/projects/components/Sidebar";
import styles from "../../../../../page.module.css";
import DataTable from "./components/weekTable";

export default async function PageWeek({ params, children }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId } = params;

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
  return (
    <>
      {/* <Sidebar params={params} employee={data} /> */}
      <div className={styles.card_project}>
        <h3>Woche</h3>
        <DataTable />
      </div>
      {children}
    </>
  );
}

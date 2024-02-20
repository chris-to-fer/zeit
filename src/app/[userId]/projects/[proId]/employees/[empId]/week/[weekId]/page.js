import React from "react";
import { revalidatePath } from "next/cache";
import Sidebar from "@/app/[userId]/projects/components/Sidebar";
import styles from "../../../../../page.module.css";
import DataTable from "./components/weekTable";

export default function PageWeek({ params, children }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { userId, proId, empId } = params;
  return (
    <>
      <Sidebar proId={proId} />
      <div className={styles.card_project}>
        <h3>Woche</h3>
        <DataTable />
      </div>
      {children}
    </>
  );
}

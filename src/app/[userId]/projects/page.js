import styles from "./page.module.css";
import Sidebar from "./components/Sidebar";
import React from "react";

export default function Page() {
  return (
    <main className={styles.main}>
      page
      <Sidebar />
    </main>
  );
}

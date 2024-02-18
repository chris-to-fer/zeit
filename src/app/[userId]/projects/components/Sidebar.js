import React from "react";
import styles from ".././page.module.css";
import SidebarQuery from "./SidebarQuery";
import Link from "next/link";
import Login from "@/app/components/Login";

export default function Sidebar({ user, userId, proId, projects }) {
  const projectsDisplay = proId ? projects : user.projects;
  return (
    <aside className={styles.aside}>
      <ul className={styles.ul}>
        <h2>Projects:</h2>
        <SidebarQuery projects={projectsDisplay} />
        <br></br>
        <Link href={`/${userId}/projects/create`}>
          <button>Erstellen</button>
        </Link>
      </ul>
    </aside>
  );
}

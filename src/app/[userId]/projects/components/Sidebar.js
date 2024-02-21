import React from "react";
import styles from ".././page.module.css";
import SidebarQuery from "./SidebarQuery";
import Link from "next/link";

export default function Sidebar({ user, userId, proId, projects }) {
  const display = proId ? projects : user.projects;
  console.log("display", display);
  return (
    <aside className={styles.aside}>
      <ul className={styles.ul}>
        {proId ? (
          <h4>
            Mitarbeiter von <br></br>
            {display[0].name}:
          </h4>
        ) : (
          <h4>Projects:</h4>
        )}
        <SidebarQuery projects={display} />
        <br></br>
        {!proId && (
          <Link href={`/${userId}/projects/create`}>
            <button>Erstellen</button>
          </Link>
        )}
        {proId && (
          <Link href={`/${userId}/projects/${proId}/create`}>
            <button>Hinzufügen</button>
          </Link>
        )}
      </ul>
    </aside>
  );
}

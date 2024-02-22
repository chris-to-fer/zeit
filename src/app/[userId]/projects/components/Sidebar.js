import React from "react";
import styles from ".././page.module.css";
import SidebarQuery from "./SidebarQuery";
import Link from "next/link";

export default function Sidebar({ userId, proId, projects, project }) {
  return (
    <aside className={styles.aside}>
      <ul className={styles.ul}>
        {proId ? (
          <h4>
            Mitarbeiter zu {project?.name} hinzufügen<br></br>
          </h4>
        ) : (
          <h4>Projekte:</h4>
        )}
        <SidebarQuery projects={projects} />
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

import React from "react";
import styles from "../page.module.css";
import SidebarQuery from "./SidebarQuery";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Sidebar({ params, projects, project, employee }) {
  const { userId, proId, empId } = params;
  const HOSTNAME = process.env.HOSTNAME_URL;
  return (
    <aside className={styles.aside}>
      {proId && !empId ? (
        <h4>
          <>
            Mitarbeiter zu {project?.name} hinzufügen<br></br>
            <Link href={`/${userId}/projects/${proId}/create`}>
              <button>Hinzufügen</button>
            </Link>
            <br></br>
            <Link href={`${HOSTNAME}/${userId}/projects`}>zurück</Link>
          </>
        </h4>
      ) : empId && proId && empId ? (
        <>
          {employee.name} {employee.lastName}
          <br></br>
          <Link
            href={{
              pathname: `/${userId}/projects/${proId}/employees/${empId}/edit`,
              query: employee,
            }}
          >
            <button>Mitarbeiter bearbeiten</button>
          </Link>
          <br></br>
          <Link href={`${HOSTNAME}/${userId}/projects/${proId}`}>zurück</Link>
        </>
      ) : userId && !proId ? (
        <>
          <h4>Projekte:</h4>
          <Link href={`/${userId}/projects/create`}>
            <button>Erstellen</button>
            <br></br>
          </Link>
        </>
      ) : (
        ""
      )}
      <ul className={styles.ul}>
        <SidebarQuery projects={projects} />
      </ul>
    </aside>
  );
}

import React from "react";
import styles from ".././page.module.css";
import SidebarQuery from "./SidebarQuery";
import Link from "next/link";

export default function Sidebar({ params, projects, project, employee }) {
  const { userId, proId, empId } = params;
  return (
    <aside className={styles.aside}>
      <ul className={styles.ul}>
        {proId && !empId ? (
          <h4>
            <>
              Mitarbeiter zu {project?.name} hinzufügen<br></br>
              <Link href={`/${userId}/projects/${proId}/create`}>
                <button>Hinzufügen</button>
              </Link>
            </>
          </h4>
        ) : empId && proId ? (
          <>
            {employee.name} {employee.lastName}
            <br></br>
            <Link
              href={{
                pathname: `/${userId}/projects/${proId}/create`,
                query: employee,
              }}
            >
              <button>Mitarbeiter bearbeiten</button>
            </Link>{" "}
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
        <SidebarQuery projects={projects} />
        <br></br>
      </ul>
    </aside>
  );
}

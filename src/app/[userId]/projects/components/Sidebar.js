"use client";
import React from "react";
import styles from "../page.module.css";
import SidebarQuery from "./SidebarQuery";
import Link from "next/link";
import { useContext } from "react";
import { selectBurgerContext } from "@/app/openBurger-Provider";

export default function Sidebar({ params, projects, project, employee }) {
  const { userId, proId, empId } = params;
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { open } = useContext(selectBurgerContext);
  console.log("opensidebar", open);

  return (
    <>
      <aside
        className={`${styles.aside} ${
          open ? styles.aside_open : styles.aside_closed
        }`}
      >
        {proId && !empId ? (
          <>
            <h4>
              Mitarbeiter zu {project?.name} hinzufügen<br></br>
              <br></br>
              <Link href={`/${userId}/projects/${proId}/create`}>
                <button className={styles.funcbutton}>HINZUFÜGEN</button>
              </Link>
              <br></br>
            </h4>
            <Link href={`/${userId}/projects`}>zurück</Link>
          </>
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
              <button className={styles.funcbutton}>BEARBEITEN</button>
            </Link>
            <br></br>
            <Link href={`/${userId}/projects/${proId}`}>zurück</Link>
          </>
        ) : userId && !proId ? (
          <>
            <h4>Projekte:</h4>
            <Link href={`/${userId}/projects/create`}>
              <button className={styles.funcbutton}> ERSTELLEN</button>
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
    </>
  );
}

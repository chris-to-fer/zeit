"use client";
import React from "react";
import styles from "../page.module.css";
import SidebarQuery from "./SidebarQuery";
import Link from "next/link";
import { useContext } from "react";
import { selectBurgerContext } from "@/app/openBurger-Provider";
import { useEffect } from "react";

export default function Sidebar({ params, projects, project, employee }) {
  const { userId, proId, empId, weekId } = params;
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { open, setOpen } = useContext(selectBurgerContext);
  console.log("opensidebar", open);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 735) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <aside className={`${open ? styles.aside_open : styles.aside_closed}`}>
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
        ) : empId && proId && empId && !weekId ? (
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
            Stundenzettel:
            <Link
              href={`/${userId}/projects/${proId}/employees/${empId}/create`}
            >
              <button className={styles.funcbutton}> ERSTELLEN</button>
              <br></br>
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
        ) : userId && proId && empId && weekId ? (
          <>
            <h4>Nothing yet:</h4>
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

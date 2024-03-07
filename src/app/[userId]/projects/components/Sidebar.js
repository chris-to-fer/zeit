"use client";
import React from "react";
import styles from "../page.module.css";
import SidebarQuery from "./SidebarQuery";
import Link from "next/link";
import { useContext } from "react";
import { selectBurgerContext } from "@/app/openBurger-Provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { displayNumberContext } from "@/app/displayNumber-Provider";

export default function Sidebar({
  trigger,
  params,
  projects,
  project,
  employee,
}) {
  const { userId, proId, empId, weekId } = params;
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { open, setOpen } = useContext(selectBurgerContext);
  const { number, setNumber } = useContext(displayNumberContext);
  // setNumber(displayNumber);
  const router = useRouter();

  //burger closed on mobile initially though on desktop open
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
  }, [setOpen]);
  // off click burger close
  useEffect(() => {
    const closeSidebarOnAnyClickClick = () => {
      const sidebarOpen = document.getElementsByClassName(
        `${styles.aside_open}`
      );
      if (window.innerWidth < 735 && sidebarOpen) {
        setOpen(false);
      }
    };
    document.addEventListener("click", closeSidebarOnAnyClickClick);
    return () =>
      document.removeEventListener("click", closeSidebarOnAnyClickClick);
  }, [open, setOpen]);

  return (
    <>
      <aside className={`${open ? styles.aside_open : styles.aside_closed}`}>
        {trigger ? (
          <>
            <h4>
              Diese Tage müssen noch genehmigt werden:<br></br>
              <br></br>
              <br></br>
            </h4>
            <button className={styles.button} onClick={() => router.back()}>
              zurück
            </button>
          </>
        ) : proId && !empId ? (
          <>
            <h4>
              Mitarbeiter zu {project?.name} hinzufügen<br></br>
              <br></br>
              <Link href={`/${userId}/projects/${proId}/create`}>
                <button className={styles.funcbutton}>HINZUFÜGEN</button>
              </Link>
              <br></br>
            </h4>
            <Link className={styles.button} href={`/${userId}/projects`}>
              zurück
            </Link>
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
            <Link
              className={styles.button}
              href={`/${userId}/projects/${proId}`}
            >
              zurück
            </Link>
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
            <h4>Features:</h4>
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

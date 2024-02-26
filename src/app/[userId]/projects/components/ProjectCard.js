"use client";
// import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { selectStateContext } from "@/app/selectState-provider";
import styles from "../page.module.css";
import Image from "next/image";

export default function ProjectCard({ user, userId }) {
  const { selectedProject } = useContext(selectStateContext);

  const project = user.projects?.find((e) => e._id === selectedProject);
  const proId = project?._id;

  if (!project)
    return <h4>Bitte links ein Projekt wählen oder ein neues erstellen.</h4>;
  return (
    <>
      <h2>{project?.name}</h2>
      <span>
        <p>Projektnummer: </p>
        <p>{project?.projectCode}</p>
      </span>
      <span>
        <p>Firma: </p>
        <p>{project?.companyName}</p>
      </span>
      <span>
        <p>Anschrift: </p>
        <p>{project?.companyAddress}</p>
      </span>
      <span>
        <p>Telefon: </p>
        <p>{project?.companyPhone}</p>
      </span>
      <span>
        <p>Email: </p>
        <p>{project?.companyEmail}</p>
      </span>
      <span>
        <p>Rechnungsanschrift: </p>
        <p>{project?.invoiceAddress}</p>
      </span>
      <span>
        <p>Kontaktperson: </p>
        <p>{project?.contact}</p>
      </span>
      <span>
        <p>Email Kontakt: </p>
        <p>{project?.email}</p>
      </span>
      <span>
        <p>Aktiv: </p>
        <p>{project?.active ? "Ja" : "Nein"}</p>
      </span>
      <Link href={`/${userId}/projects/${proId}`}>
        <button className={styles.button}>
          MITARBEITER
          <Image
            src="/right.svg"
            alt=" right arrow"
            className={styles.right}
            width={20}
            height={20}
            // priority
          />
        </button>
      </Link>
      <br></br>
      {selectedProject && (
        <Link
          href={{
            pathname: `/${userId}/projects/${proId}/edit`,
            query: project,
          }}
        >
          <button className={styles.funcbutton}>Bearbeiten</button>
        </Link>
      )}
    </>
  );
}

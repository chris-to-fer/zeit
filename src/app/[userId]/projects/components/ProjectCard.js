"use client";
import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { selectStateContext } from "@/app/selectState-provider";

export default function ProjectCard({ user, userId }) {
  const { selectedProject } = useContext(selectStateContext);

  const project = user.projects?.find((e) => e._id === selectedProject);
  const proId = project?._id;

  if (!project)
    return <h4>Bitte links ein Projekt wählen oder ein neues erstellen.</h4>;
  return (
    <>
      <h2>{project?.name}</h2>
      <p>Projektnummer: {project?.projectCode}</p>
      <p>Firma: {project?.companyName}</p>
      <p>Anschrift: {project?.companyAddress}</p>
      <p>Telefon: {project?.companyPhone}</p>
      <p>Email: {project?.companyEmail}</p>
      <p>Rechnungsanschrift: {project?.invoiceAddress}</p>
      <p>Kontaktperson: {project?.contact}</p>
      <p>Email Kontakt: {project?.email}</p>
      <p>Aktiv: {project?.active ? "Ja" : "Nein"}</p>
      <Link href={`/${userId}/projects/${proId}`}>
        <h4>Mitarbeiter ➡️</h4>
      </Link>
      <br></br>
      {selectedProject && (
        <Link
          href={{
            pathname: `/${userId}/projects/${proId}/edit`,
            query: project,
          }}
        >
          <button>Bearbeiten</button>
        </Link>
      )}
    </>
  );
}

import React from "react";
import Link from "next/link";

export default function ProjectCard({ projects }) {
  return (
    <>
      <h2>{projects[0].name}</h2>
      <p>Projektnummer: {projects[0].projectCode}</p>
      <p>Firma: {projects[0].companyName}</p>
      <p>Anschrift: {projects[0].companyAddress}</p>
      <p>Telefon: {projects[0].companyPhone}</p>
      <p>Email: {projects[0].companyEmail}</p>
      <p>Rechnungsanschrift: {projects[0].invoiceAddress}</p>
      <p>Kontaktperson: {projects[0].contact}</p>
      <p>Email Kontakt: {projects[0].email}</p>
      <p>Aktiv: {projects[0].active && `Ja`}</p>
      <Link href="/">
        <h2>Beschäftigte</h2>
      </Link>
    </>
  );
}

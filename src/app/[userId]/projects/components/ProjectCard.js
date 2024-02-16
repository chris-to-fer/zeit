import React from "react";
import Link from "next/link";

export default function ProjectCard({ data }) {
  return (
    <>
      <h2>{data.name}</h2>
      <p>Projektnummer:{data.projectCode}</p>
      <p>Firma:{data.companyName}</p>
      <p>Anschrift:{data.companyAddress}</p>
      <p>Telefon:{data.companyPhone}</p>
      <p>Email:{data.companyEmail}</p>
      <p>Rechnungsanschrift:{data.invoiceAddress}</p>
      <p>Kontaktperson:{data.contact}</p>
      <p>Email Kontakt:{data.email}</p>
      <p>Aktiv:{data.active && `Ja`}</p>
      <Link href="/">
        <h2>Beschäftigte</h2>
      </Link>
    </>
  );
}

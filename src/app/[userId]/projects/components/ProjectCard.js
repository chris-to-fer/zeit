"use client";
import React from "react";
import Link from "next/link";
import useSWR from "swr";

export default function ProjectCard({ params, userId, selectedProject }) {
  const {
    data: { user } = {},

    isLoading,
    mutate,
    error,
  } = useSWR(`/api/${userId}/user`);

  if (isLoading) {
    return <h2>...is Loading</h2>;
  }

  console.log("SPAAA", user);
  const project = user.projects.find((e) => (e._id = selectedProject));

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
      <p>Aktiv: {project?.active && `Ja`}</p>
      <Link href="/">{project && <h2>Beschäftigte</h2>}</Link>
    </>
  );
}

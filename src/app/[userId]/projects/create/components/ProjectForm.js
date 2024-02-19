"use client";
import React from "react";
import styles from "../../page.module.css";
import Link from "next/link";

export default function ProjectForm({
  proId,
  handleSubmit,
  params,
  searchParams,
  revalidateDelete,
}) {
  const userId = params.userId;
  const defaultValue = searchParams;

  async function handleDelete() {
    console.log("click delete");
    const data = { message: "DELETE" };

    const response = await fetch(`/api/${userId}/projects/${proId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.log("ERROR DELETING");
    }
    if (response.ok) {
      revalidateDelete();
    }
  }

  return (
    <>
      <form className={styles.form} action={handleSubmit}>
        <label htmlFor="name">Projekt Titel: </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={defaultValue.name}
        />

        <label htmlFor="projectCode">Projekt Nummer: </label>
        <input
          type="string"
          id="projectCode"
          name="projectCode"
          defaultValue={defaultValue.projectCode}
        />

        <label htmlFor="companyName">Firma: </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          defaultValue={defaultValue.companyName}
        />

        <label htmlFor="companyAddress">Anschrift: </label>
        <input
          placeholder="Strasse 123, PLZ Ort"
          type="text"
          id="companyAddress"
          name="companyAddress"
          defaultValue={defaultValue.companyAddress}
        />

        <label htmlFor="companyPhone">Telefon: </label>
        <input
          type="number"
          id="companyPhone"
          name="companyPhone"
          defaultValue={defaultValue.companyPhone}
        />

        <label htmlFor="companyEmail">Email: </label>
        <input
          type="email"
          id="companyEmail"
          name="companyEmail"
          defaultValue={defaultValue.companyEmail}
        />

        <label htmlFor="contact">Kontaktperson: </label>
        <input
          type="text"
          id="contact"
          name="contact"
          defaultValue={defaultValue.contact}
        />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={defaultValue.email}
        />

        <label htmlFor="invoiceAddress">Rechnungsaddresse: </label>
        <input
          type="text"
          id="invoiceAddress"
          name="invoiceAddress"
          defaultValue={defaultValue.invoiceAddress}
        />

        <label htmlFor="active">Aktiv: </label>
        <input
          type="checkbox"
          id="active"
          name="active"
          defaultValue={defaultValue.active}
          value="true"
        />
        {/* <input type="hidden" name="_method" value="PUT" /> */}
        <p>
          <button type="submit">Änderungen Speichern</button>
          <Link href={`/${userId}/projects`}>
            <button>Abbrechen</button>
          </Link>
        </p>
        <button onClick={handleDelete}>Löschen</button>
      </form>
    </>
  );
}

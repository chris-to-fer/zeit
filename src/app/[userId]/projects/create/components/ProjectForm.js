"use client";
import React from "react";
import styles from "../../page.module.css";
import Link from "next/link";
import { useState } from "react";

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
    confirm("Löschen?");

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
  const [active, setActive] = useState(true);
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

        {/* <input
          type="text"
          id="createdBy"
          name="createdBy"
          value={userId}
          hidden
        /> */}

        <label htmlFor="active">Aktiv: </label>
        <input
          type="radio"
          id="active"
          name="active"
          value={true}
          defaultChecked={defaultValue.active === "true" ? true : false}
          required
        />

        <label htmlFor="inactive">Inaktiv: </label>
        <input
          type="radio"
          id="inactive"
          name="active"
          value={false}
          defaultChecked={defaultValue.active === "false" ? true : false}
          required
        />
        <p>{defaultValue.active}</p>

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

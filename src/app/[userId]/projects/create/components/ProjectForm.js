"use client";
import React from "react";
import styles from "../../page.module.css";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectForm({
  proId,
  handleSubmit,
  searchParams,
  revalidateDelete,
}) {
  const userId = useParams().userId;
  const defaultValue = searchParams;

  async function handleDelete() {
    const data = { method: "DELETEPROJECT" };
    if (confirm("Löschen?") === false) {
      return;
    }

    const response = await fetch(`/api/${userId}/projects/${proId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
    }
    if (response.ok) {
      revalidateDelete(userId);
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
          required
        />

        <label htmlFor="projectCode">Projekt Nummer: </label>
        <input
          type="string"
          id="projectCode"
          name="projectCode"
          defaultValue={defaultValue.projectCode}
          required
        />

        <label htmlFor="companyName">Firma: </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          defaultValue={defaultValue.companyName}
          required
        />

        <label htmlFor="companyAddress">Anschrift: </label>
        <input
          placeholder="Strasse 123, PLZ Ort"
          type="text"
          id="companyAddress"
          name="companyAddress"
          defaultValue={defaultValue.companyAddress}
          required
        />

        <label htmlFor="companyPhone">Telefon: </label>
        <input
          type="tel"
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
          required
        />

        <label htmlFor="contact">Kontaktperson: </label>
        <input
          type="text"
          id="contact"
          name="contact"
          defaultValue={defaultValue.contact}
          required
        />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={defaultValue.email}
          required
        />

        <label htmlFor="invoiceAddress">Rechnungsaddresse: </label>
        <input
          type="text"
          id="invoiceAddress"
          name="invoiceAddress"
          defaultValue={defaultValue.invoiceAddress}
          required
        />

        {/* <input
          type="text"
          id="createdBy"
          name="createdBy"
          value={userId}
          hidden
        /> */}
        <section className={styles.radio}>
          <label htmlFor="active">Aktiv: </label>

          <input
            type="radio"
            id="active"
            name="active"
            value={true}
            defaultChecked={defaultValue.active === "true" ? true : false}
            required
          />
        </section>
        <section className={styles.radio}>
          <label htmlFor="inactive">Inaktiv: </label>
          <input
            type="radio"
            id="inactive"
            name="active"
            value={false}
            defaultChecked={defaultValue.active === "false" ? true : false}
            required
          />
        </section>

        {/* <p>{defaultValue.active}</p> */}

        <p>
          <button className={styles.funcbutton} type="submit">
            SPEICHERN
          </button>
        </p>
        <p>
          <Link href={`/${userId}/projects`}>
            <button className={styles.funcbutton}>ABBRECHEN</button>
          </Link>
        </p>
        <p>
          {!searchParams._id ? (
            ""
          ) : (
            <button className={styles.button} onClick={handleDelete}>
              Löschen
            </button>
          )}
        </p>
      </form>
    </>
  );
}

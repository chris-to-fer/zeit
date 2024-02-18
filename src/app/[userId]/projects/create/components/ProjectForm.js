"use client";
import React from "react";
import styles from "../../page.module.css";

export default function ProjectForm({ revalidate, params, searchParams }) {
  const userId = params.userId;
  const defaultValue = searchParams;
  console.log("dfevalue", defaultValue);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submi clickt");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch(`/api/${userId}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("create sent", data);
      revalidate();
    }
  }

  return (
    <form className={styles.form} method="POST" onSubmit={handleSubmit}>
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
      />
      <p>
        <button type="submit">Änderungen Speichern</button>
        {/* <button type="submit" onClick={onSubmit}>
          Abbrechen
        </button>
        <button type="submit" onSubmit={onSubmit}>
          Löschen
        </button> */}
      </p>
    </form>
  );
}

"use client";
import React from "react";
import styles from "../../page.module.css";

export default function ProjectForm({ defaultValue }) {
  // const defaultValue = "";
  const onSubmit = () => {};
  return (
    <form className={styles.form} action="">
      <label htmlFor="name">Projekt Titel: </label>
      <input type="text" id="name" name="name" value={defaultValue} />

      <label htmlFor="projectCode">Projekt Nummer: </label>
      <input
        type="text"
        id="projectCode"
        name="projectCode"
        value={defaultValue}
      />

      <label htmlFor="companyName">Firma: </label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        value={defaultValue}
      />

      <label htmlFor="companyAddress">Anschrift: </label>
      <input
        placeholder="Strasse 123, PLZ Ort"
        type="text"
        id="companyAddress"
        name="companyAddress"
        value={defaultValue}
      />

      <label htmlFor="companyPhone">Telefon: </label>
      <input
        type="text"
        id="companyPhone"
        name="companyPhone"
        value={defaultValue}
      />

      <label htmlFor="companyEmail">Email: </label>
      <input
        type="text"
        id="companyEmail"
        name="companyEmail"
        value={defaultValue}
      />

      <label htmlFor="contact">Kontaktperson: </label>
      <input type="text" id="contact" name="contact" value={defaultValue} />

      <label htmlFor="email">Email: </label>
      <input type="text" id="email" name="email" value={defaultValue} />

      <label htmlFor="invoiceAddress">Email: </label>
      <input
        type="text"
        id="invoiceAddress"
        name="invoiceAddress"
        value={defaultValue}
      />

      <label htmlFor="active">Aktiv: </label>
      <input type="checkbox" id="active" name="active" value={defaultValue} />
      <p>
        <button type="submit" onSubmit={onSubmit}>
          Änderungen Speichern
        </button>
        <button type="submit" onSubmit={onSubmit}>
          Löschen
        </button>
      </p>
    </form>
  );
}

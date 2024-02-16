import React from "react";
import styles from "../../page.module.css";

export default function ProjectForm({ defaultValue }) {
  //   const defaultValue = "";
  return (
    <form className={styles.form} action="">
      <label for="name">Projekt Titel: </label>
      <input type="text" id="name" name="name" value="defaultValue" />

      <label for="projectCode">Projekt Nummer: </label>
      <input
        type="text"
        id="projectCode"
        name="projectCode"
        value="defaultValue"
      />

      <label for="companyName">Firma: </label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        value="defaultValue"
      />

      <label for="companyAddress">Anschrift: </label>
      <input
        type="text"
        id="companyAddress"
        name="companyAddress"
        value="defaultValue"
      />

      <label for="companyPhone">Telefon: </label>
      <input
        type="text"
        id="companyPhone"
        name="companyPhone"
        value="defaultValue"
      />

      <label for="companyEmail">Email: </label>
      <input
        type="text"
        id="companyEmail"
        name="companyEmail"
        value="defaultValue"
      />

      <label for="contact">Kontaktperson: </label>
      <input type="text" id="contact" name="contact" value="defaultValue" />

      <label for="email">Email: </label>
      <input type="text" id="email" name="email" value="defaultValue" />

      <label for="invoiceAddress">Email: </label>
      <input
        type="text"
        id="invoiceAddress"
        name="invoiceAddress"
        value="defaultValue"
      />

      <label for="active">Status: </label>
      <input type="radio" id="active" name="active" value="defaultValue" />

      <input type="submit" value="Submit" />
    </form>
  );
}

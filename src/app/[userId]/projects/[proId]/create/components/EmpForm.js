"use client";
import React from "react";
import styles from "../../../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EmpForm({
  params,
  defaultValue,
  revalidateDelete,
  handleSubmit,
}) {
  const router = useRouter();
  const { proId, userId, empId } = params;

  async function handleDelete() {
    const data = { method: "DELETEEMPLOYEE" };
    confirm("Löschen?");
    const response = await fetch(
      `/api/${userId}/projects/${proId}/employees/${empId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      console.log("ERROR DELETING");
    }
    if (response.ok) {
      // router.push(`/${userId}/projects/${proId}`);
      revalidateDelete();
    }
  }

  return (
    <>
      <form className={styles.form} action={handleSubmit}>
        <label htmlFor="name">Vorname: </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={defaultValue?.name}
        />

        <label htmlFor="lastName">Nachname: </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          defaultValue={defaultValue?.lastName}
        />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={defaultValue?.email}
        />

        <label htmlFor="address">Anschrift: </label>
        <input
          placeholder="Strasse 123, PLZ Ort"
          type="text"
          id="address"
          name="address"
          defaultValue={defaultValue?.address}
        />

        <label htmlFor="department">Abteilung: </label>
        <input
          type="text"
          id="department"
          name="department"
          defaultValue={defaultValue?.department}
        />

        <label htmlFor="position">Stellenbezeichnung:</label>
        <input
          type="text"
          id="position"
          name="position"
          defaultValue={defaultValue?.position}
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
          defaultChecked={defaultValue?.active === "true" ? true : false}
          required
        />

        <label htmlFor="inactive">Inaktiv: </label>
        <input
          type="radio"
          id="inactive"
          name="active"
          value={false}
          defaultChecked={defaultValue?.active === "false" ? true : false}
          required
        />
        {/* <p>{defaultValue.active}</p> */}

        <p>
          <button type="submit">Änderungen Speichern</button>
          <Link href={`/${userId}/projects/${proId}/`}>
            <button>Abbrechen</button>
          </Link>
        </p>
        <button onClick={handleDelete}>Löschen</button>
      </form>
    </>
  );
}

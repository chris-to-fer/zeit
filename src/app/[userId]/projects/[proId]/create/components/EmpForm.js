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

  async function handleDelete(e) {
    e.preventDefault();
    const data = { method: "DELETEEMPLOYEE" };
    if (confirm("Löschen?") === false) {
      return;
    }
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
      throw new Error("Error deleting employee", response);
    }
    revalidateDelete();
    // router.push(`/${userId}/projects/${proId}`);
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
        <section className={styles.radio}>
          <label htmlFor="active">Aktiv: </label>
          <input
            type="radio"
            id="active"
            name="active"
            value={true}
            defaultChecked={defaultValue?.active === "true" ? true : false}
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
            defaultChecked={defaultValue?.active === "false" ? true : false}
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
          <Link
            href={
              empId
                ? `/${userId}/projects/${proId}/employees/${empId}`
                : `/${userId}/projects/${proId}`
            }
          >
            <button className={styles.funcbutton}>ABBRECHEN</button>
          </Link>
        </p>
        <p>
          {!defaultValue._id ? (
            ""
          ) : (
            <button className={styles.button} onClick={handleDelete}>
              LÖSCHEN
            </button>
          )}
        </p>
      </form>
    </>
  );
}

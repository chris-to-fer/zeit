"use client";
import React from "react";
import styles from "../../../../../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function TimeForm({
  defaultValue,

  handleSubmit,
}) {
  const router = useRouter();
  const { proId, userId, empId, timeId } = useParams();
  const HOSTNAME = process.env.HOSTNAME_URL;

  async function handleDelete() {
    const data = { method: "DELETETIMESHEET", timeId: timeId };
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
      router.push(`/${userId}/projects/${proId}/employees/${empId}`);
      //   revalidateDelete();
    }
  }

  return (
    <>
      <form className={styles.form} action={handleSubmit}>
        <label htmlFor="date">Datum: </label>
        <input
          type="date"
          id="date"
          name="date"
          defaultValue={defaultValue?.date.slice(0, 10)}
          required
        />

        <label htmlFor="lastName">Start: </label>
        <input
          type="time"
          id="start"
          name="start"
          defaultValue={defaultValue?.start}
          required
        />

        <label htmlFor="end">Ende: </label>
        <input
          type="time"
          id="end"
          name="end"
          defaultValue={defaultValue?.end}
          required
        />

        <label htmlFor="break">Pause: </label>
        <input
          //   placeholder="Strasse 123, PLZ Ort"
          type="time"
          id="break"
          name="break"
          defaultValue={defaultValue?.break}
          required
        />

        <label htmlFor="catering">Catering Teilnahme: </label>

        <section className={styles.radio}>
          <label htmlFor="catering">Ja: </label>
          <input
            type="radio"
            id="catering"
            name="catering"
            value={true}
            defaultChecked={defaultValue?.catering === "true" ? true : false}
            required
          />
        </section>
        <section className={styles.radio}>
          <label htmlFor="cateringNo">Nein: </label>
          <input
            type="radio"
            id="cateringNo"
            name="catering"
            value={false}
            defaultChecked={defaultValue?.catering === "false" ? true : false}
            required
          />
        </section>
        <hr></hr>

        <label htmlFor="travelTo">Hinreise:</label>
        <input
          type="time"
          id="travelTo"
          name="travelTo"
          defaultValue={defaultValue?.travelTo}
        />
        <label htmlFor="travelBack">Rückreise:</label>
        <input
          type="time"
          id="travelBack"
          name="travelBack"
          defaultValue={defaultValue?.travelBack}
        />
        <label htmlFor="type">Arbeits-/Krankheits-/Reisetag:</label>
        <select
          type="option"
          id="type"
          name="type"
          defaultValue={defaultValue?.type}
        >
          <option value="work">Arbeit</option>
          <option value="travel">Reise</option>
          <option value="ill">Krankheit</option>
          <option value="holiday">Urlaub</option>
          <option value="pubHoliday">Feiertag</option>
          <option value="off">Frei</option>
          <option value="sub">Ausgleichstag</option>
          <option value="pubHoliday">Feiertag</option>
          <option value="aux">Laden/Testen</option>
        </select>
        <label htmlFor="comment">Bemerkung:</label>
        <textarea
          rows="2"
          cols="30"
          type="text"
          id="comment"
          name="comment"
          defaultValue={defaultValue?.travelTo}
        />
        <label htmlFor="place">Arbeitsort:</label>
        <textarea
          rows="2"
          cols="30"
          type="text"
          id="place"
          name="place"
          defaultValue={defaultValue?.place}
        />

        <label htmlFor="isHome">Arbeitsort ist:</label>
        <section className={styles.radio}>
          <label htmlFor="isHome">Heimat: </label>
          <input
            type="radio"
            id="isHome"
            name="isHome"
            value={true}
            defaultChecked={defaultValue?.isHome === "true" ? true : false}
            required
          />
        </section>
        <section className={styles.radio}>
          <label htmlFor="isNotHome">Auswärts: </label>
          <input
            type="radio"
            id="isNotHome"
            name="isHome"
            value={false}
            defaultChecked={defaultValue?.isHome === "false" ? true : false}
            required
          />
        </section>

        <input
          id="timeId"
          name="timeId"
          defaultValue={timeId ? timeId : ""}
          hidden
        />

        {/* <p>{defaultValue.active}</p> */}

        <p>
          <button className={styles.funcbutton} type="submit">
            SPEICHERN
          </button>
        </p>
        <p>
          <Link href={`/${userId}/projects/${proId}/employees/${empId}`}>
            <button className={styles.funcbutton}>ABBRECHEN</button>
          </Link>
        </p>
        <p>
          {!defaultValue?._id ? (
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

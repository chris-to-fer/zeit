"use client";
import React from "react";
import styles from "../../page.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Alle Felder müssen ausgefüllt werden.");
      return;
    }
    try {
      const resUserExists = await fetch("/api/existingUserEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const { userId } = await resUserExists.json();
      if (userId) {
        setError("Die Email ist bereits vergeben.");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        alert(
          "Registrierung agbeschlossen! Bitte auf der Startseite mit Email einloggen."
        );
        router.push("/");
      } else {
        console.log("user registration failed");
      }
    } catch (error) {
      console.log("Error during registration", error);
      throw new Error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Name: </label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          id="name"
        ></input>
        <label htmlFor="email">Email: </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
        ></input>
        <label htmlFor="password">Passwort: </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
        ></input>
        <button className={styles.button}>Registrieren</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <Link href="/">
        <button className={styles.buttonAbbort}>Abbrechen</button>
      </Link>
      <p>
        Bereits registriert?
        <Link className={styles.toLoggin} href="/">
          {" "}
          Einloggen
        </Link>
      </p>
    </>
  );
}

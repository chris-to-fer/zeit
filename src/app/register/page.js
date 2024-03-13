import React from "react";
import RegisterForm from "./components/registerForm";
import styles from "../page.module.css";

export default function RegisterPage() {
  return (
    <>
      <h2 className={styles.backgroundHeadline}>zeit</h2>
      <div className={styles.card_register}>
        <h3>Registrierung:</h3>
        <RegisterForm />
      </div>
    </>
  );
}

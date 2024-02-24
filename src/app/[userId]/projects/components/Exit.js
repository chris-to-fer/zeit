"use client";
import React from "react";
import styles from ".././page.module.css";
import { useSession, signOut, signIn } from "next-auth/react";

export default function Exit({ goHome, session }) {
  const signOutandToHome = () => {
    signOut();
    goHome();
  };
  return (
    <button
      className={session ? styles.button_logout : styles.button}
      onClick={signOutandToHome}
    >
      LOGOUT
    </button>
  );
}

"use client";
import React from "react";
import styles from ".././page.module.css";
import { useSession, signOut, signIn } from "next-auth/react";
import { useContext } from "react";
import { selectBurgerContext } from "@/app/openBurger-Provider";
import Image from "next/image";

export default function Exit({ goHome, session }) {
  const { open, setOpen } = useContext(selectBurgerContext);
  console.log("open", open);

  const signOutandToHome = () => {
    signOut();
    goHome();
  };
  return (
    <>
      <button className={styles.burger} onClick={() => setOpen(!open)}>
        <Image
          src="/burger.svg"
          alt=" menu symbol"
          className={styles.burgerSymbol}
          width={30}
          height={30}
          // priority
        />
      </button>

      <button
        className={session ? styles.button_logout : styles.button}
        onClick={signOutandToHome}
      >
        LOGOUT
      </button>
    </>
  );
}

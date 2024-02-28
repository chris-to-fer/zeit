"use client";
import React from "react";
import styles from ".././page.module.css";
import { useSession, signOut, signIn } from "next-auth/react";
import { useContext } from "react";
import { selectStateContext } from "@/app/selectState-provider";
import { selectBurgerContext } from "@/app/openBurger-Provider";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Exit({ goHome, session, userId }) {
  const { open, setOpen } = useContext(selectBurgerContext);
  // const { proId } = useParams();
  const { selectedProject } = useContext(selectStateContext);
  const proId = selectedProject;

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
      <Link href={`/${userId}/projects`}>HOME</Link>
      <Link href={`/${userId}/projects/${proId}/approve`}>Genehmigen</Link>
      <button
        className={session ? styles.button_logout : styles.button}
        onClick={signOutandToHome}
      >
        LOGOUT
      </button>
    </>
  );
}

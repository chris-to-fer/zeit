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
import { displayNumberContext } from "@/app/displayNumber-Provider";
import { useEffect } from "react";

export default function Exit({ userId, session }) {
  const { open, setOpen } = useContext(selectBurgerContext);
  const { number, setNumber } = useContext(displayNumberContext);
  const { selectedProject } = useContext(selectStateContext);
  const proId = selectedProject;
  // const checkEmpty = useParams().proId;

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
      {proId && (
        <Link href={`/${userId}/projects/${proId}/approve`}>
          Genehmigen {number}
        </Link>
      )}
      <div className={styles.logout_container}>
        <h6>{session?.user.name}</h6>
        <button
          className={session ? styles.button_logout : styles.button}
          onClick={signOut}
        >
          LOGOUT
        </button>
      </div>
    </>
  );
}

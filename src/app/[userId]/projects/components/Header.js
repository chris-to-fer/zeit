import React from "react";
import Link from "next/link";
import Exit from "./Exit";
import styles from ".././page.module.css";
import { redirect } from "next/navigation";

export default function Header({ params, session }) {
  const userId = params.userId;
  const HOSTNAME = process.env.HOSTNAME_URL;

  const goHome = async () => {
    "use server";
    redirect(`${HOSTNAME}`);
  };

  return (
    <nav className={styles.navigation}>
      <Exit goHome={goHome} session={session} userId={userId} />

      {/* {session ? (
        <span>angemeldet als {session.user.name}</span>
      ) : (
        <span>
          nicht angemeldet, bitte{" "}
          <strong>
            <Link href="/">hier</Link>{" "}
          </strong>
          anmelden
        </span>
      )} */}
    </nav>
  );
}

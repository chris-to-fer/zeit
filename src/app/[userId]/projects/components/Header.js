import React from "react";
import Link from "next/link";

import styles from ".././page.module.css";

export default function Header({ params }) {
  const userId = params.userId;
  return (
    <nav className={styles.navigation}>
      <Link href="/">Home</Link>
      <Link href={`/${userId}/projects`}>Projects</Link>
    </nav>
  );
}

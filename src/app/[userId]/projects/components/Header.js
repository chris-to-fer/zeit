import React from "react";
import Link from "next/link";

import styles from ".././page.module.css";
const userId = 1;
export default function Header() {
  return (
    <navigation className={styles.navigation}>
      <Link href="/">Home</Link>
      <Link href={`/${userId}/projects`}>Projects</Link>
    </navigation>
  );
}

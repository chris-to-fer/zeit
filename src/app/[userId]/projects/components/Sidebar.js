"use client";
import React from "react";
import styles from ".././page.module.css";
import SidebarQuery from "./SidebarQuery";

import Link from "next/link";

export default function Sidebar({ user, handleClick, userId }) {
  user && console.log("user", user);

  return (
    <aside className={styles.aside}>
      <ul className={styles.ul}>
        <h2>Projects:</h2>
        <SidebarQuery projects={user.projects} handleClick={handleClick} />
        <br></br>
        <Link href={`/${userId}/projects/create`}>
          <button>create</button>
        </Link>
        <br></br>
        <button>edit</button>
      </ul>
    </aside>
  );
}

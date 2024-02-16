import React from "react";
import styles from ".././page.module.css";
import Link from "next/link";
import SidebarQuery from "./SidebarQuery";

export default function Sidebar({ projects, handleClick }) {
  return (
    <aside className={styles.aside}>
      <ul className={styles.ul}>
        <h2>Projects:</h2>
        <SidebarQuery projects={projects} handleClick={handleClick} />
        <br></br>
        <button>create</button>
        <br></br>
        <button>edit</button>
      </ul>
    </aside>
  );
}

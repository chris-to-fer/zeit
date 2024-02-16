import React from "react";
import styles from ".././page.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.aside}>
      <p>Projects:</p>
      <button>create</button>
      <button>delete</button>
    </aside>
  );
}

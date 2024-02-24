"use client";
import React from "react";
import { useContext } from "react";
import { selectStateContext } from "@/app/selectState-provider";
import Link from "next/link";
import styles from "../page.module.css";
import styled from "../page.module.css";

export default function SidebarQuery({ projects }) {
  const { selectedProject, setSelectedProject } =
    useContext(selectStateContext);

  function handleClick(id) {
    setSelectedProject(id);
  }

  return (
    <>
      {projects?.map((e, index) => (
        <li key={e._id} className={styles.card}>
          <button onClick={() => handleClick(e._id)} className={styles.button}>
            <span>
              <h4>{e.name}</h4>
            </span>
          </button>
        </li>
      ))}
      <hr />
    </>
  );
}

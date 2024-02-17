"use client";
import styles from "./page.module.css";
import React from "react";
import ProjectCard from "./components/ProjectCard";
import { useState } from "react";

import Sidebar from "./components/Sidebar";



export default function Page({ children, params }) {
  const userId = params.userId;
  const [selectedProject, setSelectedProject] = useState("");


  function handleClick(id) {
    setSelectedProject(id);
    console.log("click SP", id);
  }
  console.log("sp", selectedProject);

  return (
    <>
      <Sidebar userId={userId} handleClick={handleClick} />
      <div className={styles.card_project}>
        <ProjectCard userId={userId} selectedProject={selectedProject} />
      </div>
    </>
  );
}

"use client";
import styles from "./page.module.css";
import React from "react";
import ProjectCard from "./components/ProjectCard";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import useSWR from "swr";

export default function Page({ children, params }) {
  const userId = params.userId;
  const [selectedProject, setSelectedProject] = useState("");

  const {
    data: { user } = {},
    isLoading,
    mutate,
  } = useSWR(`/api/${userId}/user`, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  function handleClick(id) {
    setSelectedProject(id);
    console.log("click SP", id);
  }
  console.log("sp", selectedProject);

  if (isLoading) {
    return null;
  }
  console.log("ussr", user);
  return (
    <>
      <Sidebar user={user} userId={userId} handleClick={handleClick} />
      <div className={styles.card_project}>
        <ProjectCard
          user={user}
          userId={userId}
          selectedProject={selectedProject}
        />
      </div>
    </>
  );
}

"use client";
import styles from "./page.module.css";
import React from "react";
import ProjectCard from "./components/ProjectCard";
import { useState } from "react";

import Sidebar from "./components/Sidebar";

// const fetcher = async (url) => {
//   const res = await fetch(url);
//   // If the status code is not in the range 200-299,
//   // we still try to parse and throw it.
//   if (!res.ok) {
//     const error = new Error("An error occurred while fetching the data.");
//     // Attach extra info to the error object.
//     error.info = await res.json();
//     error.status = res.status;
//     throw error;
//   }
//   return await res.json();
// };

export default function Page({ children, params }) {
  const userId = params.userId;
  const [selectedProject, setSelectedProject] = useState("");

  // const {
  //   data: { user } = {},

  //   isLoading,
  //   mutate,
  //   error,
  // } = useSWR(`/api/${userId}/user`);
  // if (isLoading) {
  //   return <h2>...is Loading</h2>;
  // }
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

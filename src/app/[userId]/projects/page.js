"use client";
import styles from "./page.module.css";
import useSWR from "swr";
import React from "react";
import ProjectCard from "./components/ProjectCard";

const fetcher = async (url) => {
  const res = await fetch(url);
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return await res.json();
};

export default function Page({ params }) {
  const userId = params.userId;
  const {
    data: { projects } = {},
    isLoading,
    mutate,
    error,
  } = useSWR(`/api/${userId}/projects`, fetcher);
  if (isLoading) {
    return <h2>...is Loading</h2>;
  }
  if (!projects) {
    return null;
  }

  console.log("log", userId);

  console.log("projects", projects);

  return (
    <>
      <div className={styles.card_project}>
        <ProjectCard data={projects} />
      </div>
    </>
  );
}

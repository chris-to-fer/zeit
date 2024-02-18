"use client";
import React from "react";
import { useContext } from "react";
import { selectStateContext } from "@/app/selectState-provider";

export default function SidebarQuery({ projects }) {
  const { selectedProject, setSelectedProject } =
    useContext(selectStateContext);

  function handleClick(id) {
    setSelectedProject(id);
  }

  return (
    <>
      {projects.map((e) => (
        <button key={e._id} onClick={() => handleClick(e._id)}>
          <li>{e.name}</li>
        </button>
      ))}
    </>
  );
}

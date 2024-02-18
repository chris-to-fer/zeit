"use client";
import React, { createContext } from "react";

export const selectStateContext = createContext();

export default function SelectStateProvider({ children }) {
  const [selectedProject, setSelectedProject] = React.useState("");

  return (
    <>
      <selectStateContext.Provider
        value={{ selectedProject, setSelectedProject }}
      >
        {children}
      </selectStateContext.Provider>
    </>
  );
}

"use client";
import React, { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const selectStateContext = createContext();

export default function SelectStateProvider({ children }) {
  const [selectedProject, setSelectedProject] = useLocalStorageState(
    "selectedProject",
    { defaultvalue: "" }
  );

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

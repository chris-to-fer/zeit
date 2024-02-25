"use client";
import { createContext } from "react";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export const selectStateContext = createContext();

export default function SelectStateProvider({ children }) {
  const [selectedProject, setSelectedProject] = useLocalStorageState(
    "selectedProject",
    { defaultvalue: "" }
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      <selectStateContext.Provider
        value={{ selectedProject, setSelectedProject, open, setOpen }}
      >
        {children}
      </selectStateContext.Provider>
    </>
  );
}

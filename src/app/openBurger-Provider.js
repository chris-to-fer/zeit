"use client";
import { createContext } from "react";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export const selectBurgerContext = createContext();

export default function SelectBurgerProvider({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <selectBurgerContext.Provider value={{ open, setOpen }}>
        {children}
      </selectBurgerContext.Provider>
    </>
  );
}

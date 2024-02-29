"use client";
import { createContext } from "react";
import { useState } from "react";

export const displayNumberContext = createContext();

export default function DisplayNumberProvider({ children }) {
  const [number, setNumber] = useState();

  return (
    <>
      <displayNumberContext.Provider value={{ number, setNumber }}>
        {children}
      </displayNumberContext.Provider>
    </>
  );
}

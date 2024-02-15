"use client";

import React from "react";
import styles from "./page.module.css";
import Login from "../components/Login";
import { useState } from "react";

export default function Page() {
  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
  }
  return (
    <main>
      <button onClick={togglePop}>Login</button>
      {seen ? <Login toggle={togglePop} /> : null}
    </main>
  );
}

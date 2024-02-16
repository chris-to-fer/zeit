import styles from "./page.module.css";

import React from "react";

export default async function Page({ params }) {
  console.log("params", params);

  const userId = params.userId;
  console.log("log", userId);
  const res = await fetch(`/api/${userId}/projects`, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY,
    },
  });
  const data = await res.json();

  return Response.json({ data });
  return (
    <>
      <div className={styles.card_project}></div>
    </>
  );
}

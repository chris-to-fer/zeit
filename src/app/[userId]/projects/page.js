import styles from "./page.module.css";
import React from "react";
import ProjectCard from "./components/ProjectCard";
import Sidebar from "./components/Sidebar";
import SelectStateProvider from "@/app/selectState-provider";
import { revalidatePath } from "next/cache";

export default async function Page({ children, params }) {
  const HOSTNAME = process.env.HOSTNAME_URL;

  const userId = params.userId;
  revalidatePath(`${HOSTNAME}/`);
  console.log(`${HOSTNAME}/${userId}/user`);

  const res = await fetch(`${HOSTNAME}/api/${userId}/user`);
  const data = await res.json();
  if (!data) return <h3>Data is loading..</h3>;
  console.log("data_____", data);
  const user = data.user;

  return (
    <>
      <SelectStateProvider>
        {children}
        <Sidebar user={user} userId={userId} />
        <div className={styles.card_project}>
          <ProjectCard user={user} userId={userId} />
        </div>
      </SelectStateProvider>
    </>
  );
}

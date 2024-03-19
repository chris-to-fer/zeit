import React from "react";
import ProjectForm from "./components/ProjectForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import connectDB from "@/app/db/connectDB";
import Project from "@/app/db/model/Project";
import User from "@/app/db/model/User";
import styles from "../page.module.css";

export default function Create({ params, searchParams }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { proId, userId } = params;

  async function handleSubmit(formData) {
    "use server";
    let data = Object.fromEntries(formData);
    data = { ...data, createdBy: userId, method: "CREATEPROJECT" };
    // const response = await fetch(`${HOSTNAME}/api/${userId}/user`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },

    //   body: JSON.stringify(data),
    // });
    try {
      await connectDB();
      const newProject = await Project.create(data);
      await User.findByIdAndUpdate(
        userId,
        { $push: { projects: newProject._id } },
        { new: true }
      );
      if (!newProject) {
        throw new Error("Project create failed");
      }
    } catch (error) {
      alert(error);
      throw new Error(error);
    } finally {
      revalidatePath(`/${HOSTNAME}/${userId}/projects`);
      redirect(`/${userId}/projects`);
    }
  }
  async function revalidate() {
    "use server";
    revalidatePath(`/${HOSTNAME}/${userId}/projects`);
    redirect(`/${userId}/projects`);
  }

  return (
    <div className={styles.form_container}>
      <h2>Projekt erstellen:</h2>
      <div className={styles.card_forms}>
        <ProjectForm
          searchParams={searchParams}
          params={params}
          handleSubmit={handleSubmit}
          revalidateDelete={revalidate}
        />
      </div>
    </div>
  );
}

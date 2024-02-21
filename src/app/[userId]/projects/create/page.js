import React from "react";
import ProjectForm from "./components/ProjectForm";
import mongoose from "mongoose";

import { headers } from "next/headers";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function Create({ params, searchParams }) {
  console.log("pamsssss", searchParams);
  const HOSTNAME = process.env.HOSTNAME_URL;
  const userId = params.userId;
  const proId = params.proId;

  async function handleSubmit(formData) {
    "use server";
    // e.preventDefault();
    // console.log("submi clickt");
    // const formData = new FormData(e.target);

    let data = Object.fromEntries(formData);

    data = { ...data, createdBy: userId };

    //const data = formData;
    const response = await fetch(`${HOSTNAME}/api/${userId}/projects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("create sent", data);
      revalidatePath(`${HOSTNAME}/${userId}/projects`);
      redirect(`${HOSTNAME}/${userId}/projects`);
    }
  }

  return (
    <ProjectForm
      searchParams={searchParams}
      params={params}
      handleSubmit={handleSubmit}
    />
  );
}

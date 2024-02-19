import React from "react";
import ProjectForm from "./components/ProjectForm";

import { headers } from "next/headers";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function Create({ params, searchParams }) {
  console.log("pamsssss", searchParams);
  const HOSTNAME = process.env.HOSTNAME_URL;
  const userId = params.userId;

  async function revalidate() {
    "use server";
    revalidatePath(`${HOSTNAME}/${userId}/projects`);
    redirect(`${HOSTNAME}/${userId}/projects`);
  }
  async function handleSubmit(e) {
    "use server";
    e.preventDefault();
    console.log("submi clickt");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch(`/api/${userId}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("create sent", data);
      revalidate();
    }
  }

  return (
    <ProjectForm
      searchParams={searchParams}
      params={params}
      revalidate={revalidate}
      handleSubmit={handleSubmit}
    />
  );
}

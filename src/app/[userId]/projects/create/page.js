import React from "react";
import ProjectForm from "./components/ProjectForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function Create({ params, searchParams }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const { proId, userId } = params;

  async function handleSubmit(formData) {
    "use server";
    let data = Object.fromEntries(formData);
    data = { ...data, createdBy: userId, method: "CREATEPROJECT" };
    const response = await fetch(`${HOSTNAME}/api/${userId}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // revalidate();

      revalidatePath(`/${HOSTNAME}/${userId}/projects`);
      redirect(`/${userId}/projects`);
    }
  }
  async function revalidate() {
    "use server";
    // revalidatePath(`/${HOSTNAME}/${userId}/projects`);
    // redirect(`/${userId}/projects`);
  }

  return (
    <ProjectForm
      searchParams={searchParams}
      params={params}
      handleSubmit={handleSubmit}
      revalidateDelete={revalidate}
    />
  );
}

import React from "react";
import ProjectForm from "../create/components/ProjectForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default function PageEdit({ params, searchParams }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const userId = params.userId;
  const proID = params.proId;
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

    const response = await fetch(`/api/${userId}/projects/${proId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        key: "Access-Control-Allow-Origin",
        value: process.env.NEXT_PUBLIC_APP_URL,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("edit sent", data);
      revalidate();
    }
  }
  return (
    <>
      <ProjectForm
        searchParams={searchParams}
        params={params}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

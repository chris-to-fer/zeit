import React from "react";
import ProjectForm from "../../create/components/ProjectForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default function PageEdit({ params, searchParams }) {
  const HOSTNAME = process.env.HOSTNAME_URL;
  const userId = params.userId;
  const proId = params.proId;

  async function handleSubmit(formData) {
    "use server";
    // e.preventDefault();
    // console.log("submi clickt");
    //const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch(
      `${HOSTNAME}/api/${userId}/projects/${proId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          //   key: "Access-Control-Allow-Origin",
          //   value: process.env.NEXT_PUBLIC_APP_URL,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      alert("Das Projekt wurde erstellt.");
      console.log("edit sent", data);
      revalidatePath(`${HOSTNAME}/${userId}/projects`);
      redirect(`${HOSTNAME}/${userId}/projects`);
    }
  }
  async function revalidateDelete() {
    "use server";
    console.log("delete sent");
    revalidatePath(`${HOSTNAME}/${userId}/projects`);
    redirect(`${HOSTNAME}/${userId}/projects`);
  }

  return (
    <>
      <ProjectForm
        searchParams={searchParams}
        params={params}
        handleSubmit={handleSubmit}
        proId={proId}
        revalidateDelete={revalidateDelete}
      />
    </>
  );
}

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
    // console.log(headers());
    // const authorization = headers().get("authorization");

    const formedData = Object.fromEntries(formData);
    const data = { ...formedData, method: "EDITPROJECT" };

    const response = await fetch(
      `${HOSTNAME}/api/${userId}/projects/${proId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      // alert("Das Projekt wurde erstellt.");

      revalidatePath(`${HOSTNAME}/${userId}/projects`);
      redirect(`${HOSTNAME}/${userId}/projects`);
    }
  }
  async function revalidateDelete() {
    "use server";

    revalidatePath(`${HOSTNAME}/${userId}/projects`);
    // redirect(`${HOSTNAME}/${userId}/projects`);
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
